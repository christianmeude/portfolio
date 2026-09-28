// Three hero variants, switchable via `?variant=` on `/`.
// PROTOTYPE scaffolding — the winner gets folded into the real page, the rest leave main.
import { Suspense } from 'react'
import About from '../components/About'
import Chatbot from '../components/Chatbot'
import Contact from '../components/Contact'
import Marquee from '../components/Marquee'
import Motion from '../components/Motion'
import Preloader from '../components/Preloader'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import PrototypeSwitcher from '../components/proto/PrototypeSwitcher'
import VariantA from '../components/proto/VariantA'
import VariantB from '../components/proto/VariantB'
import VariantC from '../components/proto/VariantC'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ variant?: string }>
}) {
  const variant = ((await searchParams)?.variant ?? 'A').toUpperCase()

  return (
    <>
      <Preloader />
      <Motion />
      {variant === 'B' ? (
        <VariantB />
      ) : variant === 'C' ? (
        <VariantC />
      ) : (
        <VariantA />
      )}
      <main id="main">
        <About />
        <Skills />
        <Marquee items={['Expo', 'React Native', 'Supabase', 'Flutter', 'Laravel', 'TypeScript']} />
        <Projects />
      </main>
      <Contact />
      <Chatbot />
      <Suspense fallback={null}>
        <PrototypeSwitcher />
      </Suspense>
    </>
  )
}
