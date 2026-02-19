import { useState, useEffect, useRef, useCallback } from 'react'

const diagnosticResponses = {
  pmf: {
    title: "Poor Product-Market Fit",
    insight: "Product-market fit isn't a feeling — it's a measurement. Before scaling any vertical, I run a structured validation sprint: 28 customer interviews, willingness-to-pay analysis, and competitive positioning mapping. At one B2B SaaS company, this research led to 5 of 7 product recommendations being implemented before launch — resulting in 840 activations in 30 days and 76% weekly active user retention.",
    metrics: ["840 activations / 30 days", "76% WAU retention", "89% adoption intent", "3.2-day time-to-value"]
  },
  cac: {
    title: "High Customer Acquisition Cost",
    insight: "CAC isn't just an ad spend problem — it's an architecture problem. I build attribution systems that expose true channel value, then optimize the full conversion stack. For one e-commerce brand, I rebuilt their attribution from 42% to 94% accuracy, implemented a structured creative testing framework (42 variations, weekly kill/scale cadence), and scaled ad spend from $12K to $85K/month while maintaining 4.2x blended ROAS. CAC dropped 31% — from $67 to $46.",
    metrics: ["$12K → $85K/mo at 4.2x ROAS", "CAC reduced 31%", "Attribution: 42% → 94%", "CPC down 28% YoY"]
  },
  sales: {
    title: "Weak Sales Alignment",
    insight: "Marketing and sales misalignment is a systems failure, not a people failure. I build feedback loops: CRM lifecycle automation, lead scoring models with 12 behavioral signals, and coordinated ABM sequences. For one B2B company with zero inbound, I built a full demand engine that shortened the sales cycle from 6.3 to 4.8 months, created 72 inbound opportunities, and moved inbound pipeline from 0% to 35% of total.",
    metrics: ["Sales cycle: 6.3 → 4.8mo", "72 inbound opportunities", "0% → 35% inbound pipeline", "28% lead-to-opp conversion"]
  },
  retention: {
    title: "Retention Leakage",
    insight: "Retention starts before the sale. I build qualification filters into ad creative, set expectations during the funnel, and align onboarding with the promises made in marketing. For one brand, this approach lifted close rates from 14% to 24% while cutting CPL by 37%. For another, lifecycle automation increased LTV by 34% and doubled repeat purchase rates from 12% to 23%.",
    metrics: ["Close rate: 14% → 24%", "LTV +34%", "Repeat purchase: 12% → 23%", "CPL down 37%"]
  }
}

const scanLines = [
  'Initializing expansion diagnostic...',
  'Loading vertical performance data...',
  'Mapping funnel architecture...',
  'Analyzing unit economics...',
  'System ready.'
]

function AnimatedGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let dots = []
    let mouse = { x: -1000, y: -1000 }

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initDots()
    }

    function initDots() {
      dots = []
      const spacing = 80
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            x: c * spacing,
            y: r * spacing,
            baseX: c * spacing,
            baseY: r * spacing,
            size: 1.2,
          })
        }
      }
    }

    function onMouseMove(e) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const dot of dots) {
        const dx = mouse.x - dot.baseX
        const dy = mouse.y - dot.baseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const maxDist = 200
        const influence = Math.max(0, 1 - dist / maxDist)

        dot.x = dot.baseX + dx * influence * 0.15
        dot.y = dot.baseY + dy * influence * 0.15
        const size = dot.size + influence * 3
        const alpha = 0.06 + influence * 0.5

        ctx.beginPath()
        ctx.arc(dot.x, dot.y, size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(105, 205, 43, ${alpha})`
        ctx.fill()

        if (influence > 0.1) {
          for (const other of dots) {
            const odx = dot.x - other.x
            const ody = dot.y - other.y
            const oDist = Math.sqrt(odx * odx + ody * ody)
            if (oDist < 100 && oDist > 0) {
              const oInf = Math.max(0, 1 - Math.sqrt((mouse.x - other.baseX) ** 2 + (mouse.y - other.baseY) ** 2) / maxDist)
              if (oInf > 0.1) {
                ctx.beginPath()
                ctx.moveTo(dot.x, dot.y)
                ctx.lineTo(other.x, other.y)
                ctx.strokeStyle = `rgba(105, 205, 43, ${influence * oInf * 0.15})`
                ctx.lineWidth = 0.5
                ctx.stroke()
              }
            }
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMouseMove)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-grid-canvas" />
}

function TypeWriter({ text, speed = 40, delay = 0, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      onDone?.()
      return
    }
    const t = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(t)
  }, [displayed, started, text, speed, onDone])

  return (
    <span>
      {displayed}
      {started && displayed.length < text.length && <span className="cursor-blink">|</span>}
    </span>
  )
}

function DiagnosticScan({ onComplete }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (lineIndex >= scanLines.length) {
      const t = setTimeout(onComplete, 400)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setLineIndex(i => i + 1), 300)
    return () => clearTimeout(t)
  }, [lineIndex, onComplete])

  return (
    <div className="diagnostic-scan">
      <div className="scan-header">
        <span className="scan-dot live" />
        EXPANSION ENGINE v2.4
      </div>
      <div className="scan-lines">
        {scanLines.slice(0, lineIndex).map((line, i) => (
          <div key={i} className="scan-line" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="scan-prefix">{i < lineIndex - 1 || lineIndex >= scanLines.length ? '✓' : '>'}</span>
            {line}
          </div>
        ))}
      </div>
      <div className="scan-progress-track">
        <div className="scan-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  )
}

export default function Hero() {
  const [showDiagnostic, setShowDiagnostic] = useState(false)
  const [scanDone, setScanDone] = useState(false)
  const [selectedRisk, setSelectedRisk] = useState(null)
  const [showResponse, setShowResponse] = useState(false)
  const [headlineDone, setHeadlineDone] = useState(false)

  const handleScanComplete = useCallback(() => setScanDone(true), [])

  function handleRiskClick(risk) {
    setSelectedRisk(risk)
    setShowResponse(false)
    setTimeout(() => setShowResponse(true), 600)
  }

  function resetDiagnostic() {
    setSelectedRisk(null)
    setShowResponse(false)
  }

  function closeDiagnostic() {
    setShowDiagnostic(false)
    setScanDone(false)
    setSelectedRisk(null)
    setShowResponse(false)
  }

  return (
    <>
      <section className="hero">
        <AnimatedGrid />
        <div className="hero-content">
          <div className="hero-tag-line">
            <span className="scan-dot live" />
            <p className="hero-tag">Nicole Hall — Marketing Engineer</p>
          </div>
          <h1>
            <TypeWriter
              text="MARKETING ISN'T ABOUT CAMPAIGNS."
              speed={35}
              delay={300}
              onDone={() => {}}
            />
            <br />
            <span className="accent">
              <TypeWriter
                text="IT'S ABOUT ENGINEERING GROWTH."
                speed={35}
                delay={1800}
                onDone={() => setHeadlineDone(true)}
              />
            </span>
          </h1>
          <p className="hero-sub" style={{
            opacity: headlineDone ? 1 : 0,
            transform: headlineDone ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 0.6s ease'
          }}>
            SMB Team is building the world's #1 business growth company.<br />
            I build growth engines.
          </p>
          <button
            className="hero-cta"
            onClick={() => setShowDiagnostic(true)}
            style={{
              opacity: headlineDone ? 1 : 0,
              transform: headlineDone ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.6s ease 0.2s'
            }}
          >
            <span className="cta-pulse" />
            Test the Expansion Engine
          </button>
        </div>

        <div className="hero-scroll-hint" style={{
          opacity: headlineDone ? 1 : 0,
          transition: 'opacity 1s ease 1s'
        }}>
          <div className="scroll-line" />
        </div>
      </section>

      {showDiagnostic && (
        <div className="diagnostic-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) closeDiagnostic()
        }}>
          <div className="diagnostic-panel">
            {!scanDone ? (
              <DiagnosticScan onComplete={handleScanComplete} />
            ) : !selectedRisk ? (
              <div className="diagnostic-select" style={{ animation: 'fadeInUp 0.4s ease' }}>
                <div className="diag-header-row">
                  <span className="scan-dot live" />
                  <h3>Expansion Diagnostic</h3>
                </div>
                <h2>Choose the biggest risk in expansion:</h2>
                <div className="diagnostic-options">
                  {[
                    { key: 'pmf', label: 'Poor Product-Market Fit', icon: '◎' },
                    { key: 'cac', label: 'High Customer Acquisition Cost', icon: '◈' },
                    { key: 'sales', label: 'Weak Sales Alignment', icon: '◇' },
                    { key: 'retention', label: 'Retention Leakage', icon: '◉' },
                  ].map((opt, i) => (
                    <button
                      className="diagnostic-option"
                      key={opt.key}
                      onClick={() => handleRiskClick(opt.key)}
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <span className="diag-opt-icon">{opt.icon}</span>
                      <span>{opt.label}</span>
                      <span className="diag-opt-arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="diagnostic-response">
                {!showResponse ? (
                  <div className="diag-analyzing">
                    <div className="analyzing-spinner" />
                    <p>Analyzing {diagnosticResponses[selectedRisk].title.toLowerCase()}...</p>
                  </div>
                ) : (
                  <div style={{ animation: 'fadeInUp 0.5s ease' }}>
                    <div className="diag-header-row">
                      <span className="scan-dot live" />
                      <h3>Diagnostic Result</h3>
                    </div>
                    <h4>{diagnosticResponses[selectedRisk].title}</h4>
                    <p>{diagnosticResponses[selectedRisk].insight}</p>
                    <div className="diag-metrics-row">
                      {diagnosticResponses[selectedRisk].metrics.map((m, i) => (
                        <span className="metric-badge" key={i} style={{ animationDelay: `${i * 0.1}s` }}>{m}</span>
                      ))}
                    </div>
                    <div className="diag-actions">
                      <button className="diagnostic-close primary" onClick={resetDiagnostic}>
                        Run Another Diagnostic
                      </button>
                      <button className="diagnostic-close next" onClick={() => {
                        closeDiagnostic()
                        document.getElementById('values')?.scrollIntoView({ behavior: 'smooth' })
                      }}>
                        Next: See the Proof →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
