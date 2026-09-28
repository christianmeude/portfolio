import About from '../components/About'
import Chatbot from '../components/Chatbot'
import Contact from '../components/Contact'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import Motion from '../components/Motion'
import Preloader from '../components/Preloader'
import Projects from '../components/Projects'
import SiteNav from '../components/SiteNav'
import Skills from '../components/Skills'

export default function Page() {
  return (
    <>
      <Preloader />
      <Motion />
      <SiteNav />
      <Hero />
      <main id="main">
        <About />
        <Skills />
        <Marquee items={['Expo', 'React Native', 'Supabase', 'Flutter', 'Laravel', 'TypeScript']} />
        <Projects />
      </main>
      <Contact />
      <Chatbot />
    </>
  )
}
