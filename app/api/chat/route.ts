import { NextResponse } from 'next/server'
import { ANSWERS, REFUSAL } from '../../../lib/answers'

const MODEL = process.env.GEMINI_MODEL ?? 'gemini-3.5-flash-lite'

function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)
}

/** Keyword retrieval over the curated answers file. Returns top matches or []. */
function retrieve(question: string) {
  const q = new Set(words(question))
  return ANSWERS.map((a) => {
    const hay = new Set(a.match.flatMap(words))
    let score = 0
    for (const w of q) if (hay.has(w)) score += 1
    return { a, score }
  })
    .filter((r) => r.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, 3)
}

export async function GET() {
  return NextResponse.json({ enabled: Boolean(process.env.GEMINI_API_KEY) })
}

export async function POST(req: Request) {
  const key = process.env.GEMINI_API_KEY
  if (!key) return NextResponse.json({ error: 'Chat is not configured.' }, { status: 503 })

  let question = ''
  try {
    const body = (await req.json()) as { question?: string }
    question = (body.question ?? '').toString().slice(0, 500)
  } catch {
    return NextResponse.json({ error: 'Bad request.' }, { status: 400 })
  }
  if (!question.trim()) return NextResponse.json({ error: 'Empty question.' }, { status: 400 })

  const hits = retrieve(question)
  if (hits.length === 0) return NextResponse.json({ answer: REFUSAL })

  const context = hits.map((h) => `- ${h.a.text}`).join('\n')
  const system = `You are Christian Meude's portfolio assistant. Answer ONLY from the approved facts below, in at most 3 short sentences. If the question cannot be answered from them, reply exactly: "${REFUSAL}"\n\nApproved facts:\n${context}`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ parts: [{ text: question }] }],
          generationConfig: { maxOutputTokens: 256, temperature: 0.2 },
        }),
      },
    )
    if (res.status === 429) {
      return NextResponse.json(
        { answer: 'Too many questions at once — email Christian at christianmeude17@gmail.com instead.' },
        { status: 429 },
      )
    }
    if (!res.ok) return NextResponse.json({ answer: REFUSAL }, { status: 502 })
    const data = (await res.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    }
    const text = data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('').trim()
    return NextResponse.json({ answer: text || REFUSAL })
  } catch {
    return NextResponse.json({ answer: REFUSAL }, { status: 502 })
  }
}
