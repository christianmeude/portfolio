import Header from './components/Header'
import Hero from './components/Hero'
import Work from './components/Work'
import Stack from './components/Stack'
import About from './components/About'
import Contact from './components/Contact'
import ChromeBackdrop from './components/ChromeBackdrop'
import { useTheme } from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  const { theme, toggle } = useTheme()
  useReveal()
  useSmoothScroll()

  return (
    <div className="relative min-h-svh text-(--color-foreground)">
      <ChromeBackdrop />
      <div className="relative z-[1]">
        <Header theme={theme} onToggle={toggle} />
        <main id="main">
          <Hero />
          <Work />
          <Stack />
          <About />
        </main>
        <Contact />
      </div>
    </div>
  )
}
