import './App.css'
import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import MetricsBar from './components/MetricsBar'
import NavBar from './components/NavBar'
import WhyHomeServices from './components/WhyHomeServices'
import Values from './components/Values'
import Roadmap from './components/Roadmap'
import Governance from './components/Governance'
import GrowthSimulator from './components/GrowthSimulator'
import SystemsArchitecture from './components/SystemsArchitecture'
import RetentionEngine from './components/RetentionEngine'
import CaseStudies from './components/CaseStudies'
import Close from './components/Close'
import ScrollProgress from './components/ScrollProgress'
import useInView from './hooks/useInView'
import AttorneyAssistantPage from './AttorneyAssistant'

function AnimatedSection({ children, delay = 0 }) {
  const [ref, inView] = useInView(0.08)
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function SMBPage() {
  return (
    <div>
      <ScrollProgress />
      <NavBar />
      <Hero />

      <MetricsBar />

      <div className="section-divider" />

      <AnimatedSection>
        <WhyHomeServices />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <Values />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <Roadmap />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <Governance />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <SystemsArchitecture />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <RetentionEngine />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <CaseStudies />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <GrowthSimulator />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <Close />
      </AnimatedSection>

      <footer style={{
        textAlign: 'center',
        padding: '40px',
        fontSize: '12px',
        color: 'var(--white-60)',
        letterSpacing: '1px',
      }}>
        NICOLE HALL — MARKETING ENGINEER — {new Date().getFullYear()}
      </footer>
    </div>
  )
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  if (path === '/aa' || path === '/aa/') return <AttorneyAssistantPage />
  return <SMBPage />
}

export default App
