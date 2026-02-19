import { useState, useEffect, useRef } from 'react'

const retentionData = [
  { year: 'Y1', base: 100, compounded: 100 },
  { year: 'Y2', base: 112, compounded: 134 },
  { year: 'Y3', base: 125, compounded: 189 },
  { year: 'Y4', base: 140, compounded: 268 },
  { year: 'Y5', base: 157, compounded: 381 },
  { year: 'Y7', base: 197, compounded: 620 },
  { year: 'Y10', base: 277, compounded: 1100 },
  { year: 'Y15', base: 437, compounded: 2800 },
]

const pillars = [
  {
    num: '01',
    title: 'Qualification Filters',
    desc: 'Retention starts in the ad. I build creative that qualifies prospects before they click — matching messaging to real use cases, not aspirational promises. This is why one funnel rebuild lifted close rates from 14% to 24%: better leads in means better customers out.'
  },
  {
    num: '02',
    title: 'Expectation Setting',
    desc: 'Every ad, landing page, and nurture email sets a specific expectation that onboarding can deliver. When a product launch achieved 3.2-day time-to-value against a 7-day target, it was because marketing promised exactly what the product delivered — no inflation.'
  },
  {
    num: '03',
    title: 'Sales Alignment Loops',
    desc: 'Marketing feeds sales qualified, scored leads with full behavioral context. Sales feeds marketing close/loss reasons that refine targeting. This loop shortened one client\'s sales cycle from 6.3 to 4.8 months and made inbound 35% of total pipeline.'
  },
  {
    num: '04',
    title: 'Onboarding Reinforcement',
    desc: 'I build lifecycle automation that continues the marketing promise through the customer journey: 7-campaign sequences covering welcome, education, cross-sell, reviews, and loyalty. This approach increased LTV by 34% and doubled repeat purchase rates from 12% to 23%.'
  }
]

function RetentionChart({ animated }) {
  const canvasRef = useRef(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    let animId

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      ctx.scale(dpr, dpr)
    }

    resize()

    const maxVal = 2800
    const padLeft = 50
    const padRight = 30
    const padTop = 50
    const padBottom = 50

    function draw() {
      const w = canvas.width / dpr
      const h = canvas.height / dpr
      ctx.clearRect(0, 0, w, h)

      if (animated && progressRef.current < 1) {
        progressRef.current = Math.min(1, progressRef.current + 0.02)
      }
      const p = progressRef.current

      const chartW = w - padLeft - padRight
      const chartH = h - padTop - padBottom
      const barGroupWidth = chartW / retentionData.length
      const barWidth = Math.min(barGroupWidth * 0.28, 30)
      const gap = 4

      // Grid lines
      ctx.strokeStyle = 'rgba(255,255,255,0.04)'
      ctx.lineWidth = 1
      for (let i = 0; i <= 4; i++) {
        const y = padTop + (chartH / 4) * i
        ctx.beginPath()
        ctx.moveTo(padLeft, y)
        ctx.lineTo(w - padRight, y)
        ctx.stroke()
      }

      // Compounded line (draw behind bars)
      if (p > 0) {
        ctx.beginPath()
        ctx.strokeStyle = 'rgba(105, 205, 43, 0.5)'
        ctx.lineWidth = 2
        ctx.setLineDash([])
        const points = []
        for (let i = 0; i < retentionData.length; i++) {
          const d = retentionData[i]
          const x = padLeft + barGroupWidth * i + barGroupWidth / 2
          const barH = (d.compounded / maxVal) * chartH * p
          const y = padTop + chartH - barH
          points.push({ x, y })
          if (i === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()

        // Line dots
        for (const pt of points) {
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2)
          ctx.fillStyle = '#69CD2B'
          ctx.fill()
        }

        // Area fill under compounded line
        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y)
        }
        ctx.lineTo(points[points.length - 1].x, padTop + chartH)
        ctx.lineTo(points[0].x, padTop + chartH)
        ctx.closePath()
        const grad = ctx.createLinearGradient(0, padTop, 0, padTop + chartH)
        grad.addColorStop(0, 'rgba(105, 205, 43, 0.12)')
        grad.addColorStop(1, 'rgba(105, 205, 43, 0)')
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Bars
      for (let i = 0; i < retentionData.length; i++) {
        const d = retentionData[i]
        const groupX = padLeft + barGroupWidth * i + barGroupWidth / 2

        // Baseline bar
        const baseH = (d.base / maxVal) * chartH * p
        const baseX = groupX - barWidth - gap / 2
        const baseY = padTop + chartH - baseH

        ctx.fillStyle = 'rgba(255,255,255,0.08)'
        ctx.beginPath()
        ctx.roundRect(baseX, baseY, barWidth, baseH, [3, 3, 0, 0])
        ctx.fill()

        // Compounded bar
        const compH = (d.compounded / maxVal) * chartH * p
        const compX = groupX + gap / 2
        const compY = padTop + chartH - compH

        const barGrad = ctx.createLinearGradient(0, compY, 0, compY + compH)
        barGrad.addColorStop(0, '#69CD2B')
        barGrad.addColorStop(1, 'rgba(105, 205, 43, 0.3)')
        ctx.fillStyle = barGrad
        ctx.beginPath()
        ctx.roundRect(compX, compY, barWidth, compH, [3, 3, 0, 0])
        ctx.fill()

        // Value label above compounded bar
        if (p > 0.5) {
          const label = d.compounded > 999 ? `${(d.compounded / 1000).toFixed(1)}x` : `${d.compounded}%`
          ctx.fillStyle = '#69CD2B'
          ctx.font = `700 ${Math.min(13, barGroupWidth * 0.15)}px Poppins, sans-serif`
          ctx.textAlign = 'center'
          ctx.globalAlpha = Math.min(1, (p - 0.5) * 2)
          ctx.fillText(label, groupX, compY - 10)
          ctx.globalAlpha = 1
        }

        // Year label
        ctx.fillStyle = 'rgba(255,255,255,0.4)'
        ctx.font = `600 11px Poppins, sans-serif`
        ctx.textAlign = 'center'
        ctx.fillText(d.year, groupX, padTop + chartH + 24)
      }

      // Legend
      ctx.font = '600 11px Poppins, sans-serif'
      ctx.textAlign = 'left'

      ctx.fillStyle = '#69CD2B'
      ctx.beginPath()
      ctx.arc(padLeft, 20, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillText('COMPOUNDING RETENTION', padLeft + 12, 24)

      ctx.fillStyle = 'rgba(255,255,255,0.4)'
      ctx.beginPath()
      ctx.arc(padLeft + 210, 20, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillText('BASELINE GROWTH', padLeft + 222, 24)

      if (animated && progressRef.current < 1) {
        animId = requestAnimationFrame(draw)
      }
    }

    if (animated) {
      function loop() {
        draw()
        if (progressRef.current < 1) {
          animId = requestAnimationFrame(loop)
        }
      }
      loop()
    } else {
      draw()
    }

    const handleResize = () => { resize(); draw() }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [animated])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}

export default function RetentionEngine() {
  const [animated, setAnimated] = useState(false)
  const chartRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (chartRef.current) observer.observe(chartRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="section" id="retention">
      <div className="section-inner">
        <span className="section-tag">The Sacred Metric</span>
        <h2 className="section-title">Retention is the Snowball.</h2>
        <p className="section-subtitle">
          Acquisition without retention is a leaky bucket. Compounding retention is the only defensible growth strategy — and it starts before the first click.
        </p>

        <div className="retention-container">
          <div className="retention-chart" ref={chartRef}>
            <RetentionChart animated={animated} />
          </div>

          <div className="retention-pillars">
            {pillars.map((p, i) => (
              <div className="retention-pillar" key={i}>
                <div className="pillar-num">{p.num}</div>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
