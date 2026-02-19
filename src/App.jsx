import './App.css'
import Hero from './components/Hero'
import MetricsBar from './components/MetricsBar'
import Values from './components/Values'
import GrowthSimulator from './components/GrowthSimulator'
import SystemsArchitecture from './components/SystemsArchitecture'
import RetentionEngine from './components/RetentionEngine'
import CaseStudies from './components/CaseStudies'
import Roadmap from './components/Roadmap'
import Close from './components/Close'
import ScrollProgress from './components/ScrollProgress'
import useInView from './hooks/useInView'

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

function App() {
  return (
    <div>
      <ScrollProgress />
      <Hero />

      <MetricsBar />

      <div className="section-divider" />

      <AnimatedSection>
        <Values />
      </AnimatedSection>

      <div className="section-divider" />

      <AnimatedSection>
        <GrowthSimulator />
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
        <Roadmap />
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

export default App
