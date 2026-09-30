import dynamic from 'next/dynamic'
import About from '../components/About'
import Certifications from '../components/Certifications'

const Chatbot = dynamic(() => import('../components/Chatbot'))
import Contact from '../components/Contact'
import Hero from '../components/Hero'
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
        <Projects />
        <Certifications />
      </main>
      <Contact />
      <Chatbot />
    </>
  )
}
