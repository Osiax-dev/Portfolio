import { LazyMotion, MotionConfig, domAnimation } from 'motion/react'
import { Footer, WhatsAppButton } from './components/layout/Footer'
import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Method } from './components/sections/Method'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Upcoming } from './components/sections/Upcoming'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Header />
        <main id="contenu" tabIndex={-1} className="outline-none">
          <Hero />
          <Projects />
          <About />
          <Skills />
          <Method />
          <Upcoming />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </MotionConfig>
    </LazyMotion>
  )
}
