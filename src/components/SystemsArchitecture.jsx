import { useState, useEffect, useRef, useMemo } from 'react'

const stages = [
  {
    name: 'Marketing',
    leak: 'Attribution gaps',
    leakDetail: 'Platform-reported ROAS inflated 40%. Real channel value invisible.',
    fix: 'Server-side GTM + multi-touch attribution in BigQuery',
    fixDetail: 'Built custom Looker dashboards connecting ad platforms, GA4, and CRM. Recovered 40% of hidden pipeline value.',
    healthyMetric: { val: '94%', label: 'Attribution' },
    brokenMetric: { val: '42%', label: 'Attribution' },
    revenueImpact: 18,
  },
  {
    name: 'Sales',
    leak: 'Qualification failure',
    leakDetail: 'Reps spending 60%+ of time on unqualified prospects.',
    fix: 'Lead scoring: 12 behavioral signals, automated routing',
    fixDetail: 'Hot leads get immediate assignment, warm leads enter nurture. Sales cycle shortened from 6.3 to 4.8 months.',
    healthyMetric: { val: '28%', label: 'Lead-to-Opp' },
    brokenMetric: { val: '8%', label: 'Lead-to-Opp' },
    revenueImpact: 25,
  },
  {
    name: 'Onboarding',
    leak: 'Expectation mismatch',
    leakDetail: 'Marketing promises don\'t match product delivery. Time-to-value: 14 days.',
    fix: 'Aligned creative with delivery + in-app activation flows',
    fixDetail: 'Built tooltips, modals, and 6-part email nurture. Users completing onboarding were 3x more likely to become weekly active.',
    healthyMetric: { val: '3.2d', label: 'Time-to-Value' },
    brokenMetric: { val: '14d', label: 'Time-to-Value' },
    revenueImpact: 15,
  },
  {
    name: 'Retention',
    leak: 'Silent churn',
    leakDetail: 'No lifecycle automation. Repeat purchase rate: 12%. LTV stagnant.',
    fix: '7-campaign lifecycle automation engine',
    fixDetail: 'Welcome, education, cross-sell, post-purchase, review, loyalty, win-back. Increased LTV by 34%. Repeat purchase doubled to 23%.',
    healthyMetric: { val: '+34%', label: 'LTV Lift' },
    brokenMetric: { val: '0%', label: 'LTV Lift' },
    revenueImpact: 28,
  },
  {
    name: 'Expansion',
    leak: 'Revenue ceiling',
    leakDetail: 'No ABM. No playbook for new verticals. Growth capped.',
    fix: 'ABM targeting 50 dream accounts + vertical playbooks',
    fixDetail: 'Personalized landing pages, direct mail, coordinated outreach. 46% engagement rate. 3 closed deals worth $10.6M.',
    healthyMetric: { val: '$10.6M', label: 'ABM Revenue' },
    brokenMetric: { val: '$0', label: 'ABM Revenue' },
    revenueImpact: 14,
  },
]

function FlowingParticles({ broken }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    function spawnParticle() {
      particles.push({
        x: 0,
        y: canvas.height / 2 + (Math.random() - 0.5) * 20,
        speed: 1.5 + Math.random() * 2,
        size: 2 + Math.random() * 2,
        opacity: 0.4 + Math.random() * 0.6,
        leaked: false,
        leakSpeed: 0,
        leakX: 0,
      })
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const segmentWidth = canvas.width / 5

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (p.leaked) {
          p.y += p.leakSpeed
          p.leakSpeed += 0.15
          p.opacity -= 0.012
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(255, 68, 68, ${Math.max(0, p.opacity)})`
          ctx.fill()
        } else {
          p.x += p.speed

          if (broken.length > 0) {
            for (const bi of broken) {
              const leakZone = segmentWidth * bi + segmentWidth * 0.5
              if (Math.abs(p.x - leakZone) < 10 && Math.random() < 0.04) {
                p.leaked = true
                p.leakSpeed = 1 + Math.random()
                p.leakX = p.x
                break
              }
            }
          }

          if (!p.leaked) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(105, 205, 43, ${p.opacity})`
            ctx.fill()
          }
        }
      }

      particles = particles.filter(p => p.x < canvas.width + 10 && p.opacity > 0 && p.y < canvas.height + 10)

      if (Math.random() < 0.15) spawnParticle()
      animId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [broken])

  return <canvas ref={canvasRef} className="sys-particles-canvas" />
}

export default function SystemsArchitecture() {
  const [brokenStages, setBrokenStages] = useState([])
  const [activeStage, setActiveStage] = useState(null)

  const systemHealth = useMemo(() => {
    if (brokenStages.length === 0) return 100
    const totalLoss = brokenStages.reduce((sum, i) => sum + stages[i].revenueImpact, 0)
    return Math.max(0, 100 - totalLoss)
  }, [brokenStages])

  const revenueMultiplier = useMemo(() => {
    return (systemHealth / 100 * 2.4).toFixed(1)
  }, [systemHealth])

  function toggleStage(index) {
    setBrokenStages(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
    setActiveStage(index)
  }

  function breakAll() {
    setBrokenStages([0, 1, 2, 3, 4])
    setActiveStage(null)
  }

  function repairAll() {
    setBrokenStages([])
    setActiveStage(null)
  }

  const healthColor = systemHealth > 70 ? 'var(--green)' : systemHealth > 40 ? '#FFB400' : '#ff4444'

  return (
    <section className="section" id="systems">
      <div className="section-inner">
        <span className="section-tag">Systems Thinking</span>
        <h2 className="section-title">Build Once. Scale Many.</h2>
        <p className="section-subtitle">
          Growth isn't a sequence of campaigns — it's an interconnected system.
          Click any stage to break it. Watch the revenue impact in real time.
        </p>

        <div className="sys-dashboard">
          {/* Health gauges */}
          <div className="sys-gauges">
            <div className="sys-gauge">
              <div className="gauge-ring" style={{
                background: `conic-gradient(${healthColor} ${systemHealth * 3.6}deg, var(--border) 0deg)`
              }}>
                <div className="gauge-inner">
                  <span className="gauge-value" style={{ color: healthColor }}>{systemHealth}</span>
                  <span className="gauge-unit">%</span>
                </div>
              </div>
              <span className="gauge-label">System Health</span>
            </div>
            <div className="sys-gauge">
              <div className="gauge-ring" style={{
                background: `conic-gradient(${healthColor} ${(parseFloat(revenueMultiplier) / 2.4) * 360}deg, var(--border) 0deg)`
              }}>
                <div className="gauge-inner">
                  <span className="gauge-value" style={{ color: healthColor }}>{revenueMultiplier}</span>
                  <span className="gauge-unit">M</span>
                </div>
              </div>
              <span className="gauge-label">Pipeline Potential</span>
            </div>
            <div className="sys-gauge">
              <div className="gauge-ring" style={{
                background: `conic-gradient(${healthColor} ${((5 - brokenStages.length) / 5) * 360}deg, var(--border) 0deg)`
              }}>
                <div className="gauge-inner">
                  <span className="gauge-value" style={{ color: healthColor }}>{5 - brokenStages.length}</span>
                  <span className="gauge-unit">/5</span>
                </div>
              </div>
              <span className="gauge-label">Stages Online</span>
            </div>
          </div>

          {/* Pipeline visualization */}
          <div className="sys-pipeline-wrapper">
            <FlowingParticles broken={brokenStages} />
            <div className="sys-pipeline">
              {stages.map((s, i) => {
                const isBroken = brokenStages.includes(i)
                const isActive = activeStage === i
                return (
                  <div key={i} className="sys-stage-col">
                    <button
                      className={`sys-stage ${isBroken ? 'broken' : 'healthy'} ${isActive ? 'active' : ''}`}
                      onClick={() => toggleStage(i)}
                    >
                      <div className="stage-status-dot">
                        <span className={`s-dot ${isBroken ? 'red' : 'green'}`} />
                      </div>
                      <h4>{s.name}</h4>
                      <div className="stage-metric">
                        <span className="stage-metric-val">{isBroken ? s.brokenMetric.val : s.healthyMetric.val}</span>
                        <span className="stage-metric-label">{isBroken ? s.brokenMetric.label : s.healthyMetric.label}</span>
                      </div>
                      {isBroken && (
                        <div className="stage-leak-indicator">
                          <span className="leak-drip" />
                          <span className="leak-drip d2" />
                          <span className="leak-drip d3" />
                        </div>
                      )}
                    </button>
                    {i < stages.length - 1 && (
                      <div className={`sys-connector ${isBroken ? 'broken' : ''}`}>
                        <span className="connector-dot" />
                        <span className="connector-dot cd2" />
                        <span className="connector-dot cd3" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="sys-controls-row">
            <button className="sys-btn break" onClick={breakAll} disabled={brokenStages.length === 5}>
              Break Everything
            </button>
            <button className="sys-btn repair" onClick={repairAll} disabled={brokenStages.length === 0}>
              Repair All Systems
            </button>
          </div>

          <p className="sys-hint">Click individual stages to toggle them on/off</p>

          {/* Detail panel for active stage */}
          {activeStage !== null && (
            <div className="sys-detail-panel" key={activeStage}>
              <div className="sys-detail-header">
                <span className={`s-dot ${brokenStages.includes(activeStage) ? 'red' : 'green'}`} />
                <h3>{stages[activeStage].name}</h3>
                <span className="sys-detail-status" style={{
                  color: brokenStages.includes(activeStage) ? '#ff4444' : 'var(--green)'
                }}>
                  {brokenStages.includes(activeStage) ? 'OFFLINE' : 'ONLINE'}
                </span>
              </div>

              {brokenStages.includes(activeStage) ? (
                <div className="sys-detail-body broken-detail">
                  <div className="sys-detail-section">
                    <h5>Failure Mode</h5>
                    <p>{stages[activeStage].leak}</p>
                  </div>
                  <div className="sys-detail-section">
                    <h5>Impact</h5>
                    <p>{stages[activeStage].leakDetail}</p>
                  </div>
                  <div className="sys-detail-section">
                    <h5>Revenue Drag</h5>
                    <div className="revenue-drag-bar">
                      <div className="revenue-drag-fill" style={{ width: `${stages[activeStage].revenueImpact * 3}%` }} />
                      <span>-{stages[activeStage].revenueImpact}% pipeline impact</span>
                    </div>
                  </div>
                  <button className="sys-btn repair inline" onClick={() => toggleStage(activeStage)}>
                    Repair {stages[activeStage].name}
                  </button>
                </div>
              ) : (
                <div className="sys-detail-body repaired-detail">
                  <div className="sys-detail-section">
                    <h5>System</h5>
                    <p>{stages[activeStage].fix}</p>
                  </div>
                  <div className="sys-detail-section">
                    <h5>How It Works</h5>
                    <p>{stages[activeStage].fixDetail}</p>
                  </div>
                  <div className="sys-detail-section">
                    <h5>Performance</h5>
                    <div className="perf-bar-track">
                      <div className="perf-bar-fill" />
                      <span>{stages[activeStage].healthyMetric.val} {stages[activeStage].healthyMetric.label}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
