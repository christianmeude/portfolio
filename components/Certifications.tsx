interface Cert {
  title: string
  issuer: string
  date: string
  url: string
}

const CERTS: Cert[] = [
  {
    title: 'IT Specialist — HTML and CSS',
    issuer: 'Certiport, a Pearson VUE business',
    date: 'Jun 2026',
    url: 'https://www.credly.com/badges/e4bfdee1-c531-45cf-b2c4-d31b2f5dc3f2/public_url',
  },
  {
    title: 'Introduction to Packet Tracer',
    issuer: 'Cisco',
    date: 'Jun 2025',
    url: 'https://www.credly.com/badges/0d80eec2-300b-41af-be17-1f2582786c6c/public_url',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="border-b-[3px] border-[#0a0a0a] bg-[#f5f2ee]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <p className="type-mono-label">04 — Certifications</p>
        <h2 data-reveal className="font-display mt-3 text-5xl font-extrabold uppercase md:text-7xl">
          Certified
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {CERTS.map((c) => (
            <div
              key={c.url}
              data-reveal
              className="border-[3px] border-[#0a0a0a] bg-white p-6 shadow-brutal"
            >
              <h3 className="font-display text-2xl font-extrabold uppercase leading-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm font-semibold text-[#555]">
                {c.issuer} · {c.date}
              </p>
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-brutal btn-ghost-brutal mt-4 text-sm"
                aria-label={`Verify ${c.title} (opens in new tab)`}
              >
                Verify ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
