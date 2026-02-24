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

function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('site_authed') === '1')
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (user === 'review' && pass === 'letmein') {
      sessionStorage.setItem('site_authed', '1')
      setAuthed(true)
    } else {
      setError(true)
    }
  }

  if (authed) return children

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B1930',
      fontFamily: 'Poppins, system-ui, sans-serif',
    }}>
      <form onSubmit={handleSubmit} style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '16px',
        padding: '48px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        width: '100%',
        maxWidth: '380px',
      }}>
        <h2 style={{ color: '#fff', fontSize: '24px', fontWeight: 700, textAlign: 'center', margin: 0 }}>
          Enter Credentials
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', textAlign: 'center', margin: 0 }}>
          This site is password protected.
        </p>
        <input
          type="text"
          placeholder="Username"
          value={user}
          onChange={e => { setUser(e.target.value); setError(false) }}
          autoComplete="username"
          style={{
            padding: '14px 16px',
            borderRadius: '8px',
            border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={e => { setPass(e.target.value); setError(false) }}
          autoComplete="current-password"
          style={{
            padding: '14px 16px',
            borderRadius: '8px',
            border: error ? '1px solid #ef4444' : '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontSize: '14px',
            outline: 'none',
          }}
        />
        {error && (
          <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'center', margin: 0 }}>
            Invalid credentials.
          </p>
        )}
        <button type="submit" style={{
          padding: '14px',
          borderRadius: '8px',
          border: 'none',
          background: '#4EA7DD',
          color: '#fff',
          fontSize: '14px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          cursor: 'pointer',
          marginTop: '8px',
        }}>
          Enter
        </button>
      </form>
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

  const page = (path === '/aa' || path === '/aa/') ? <AttorneyAssistantPage /> : <SMBPage />

  return <PasswordGate>{page}</PasswordGate>
}

export default App
