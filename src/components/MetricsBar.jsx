import { useState, useEffect, useRef } from 'react'

const metrics = [
  { number: '$2.4M', label: 'Pipeline Generated' },
  { number: '4.2x', label: 'Blended ROAS' },
  { number: '840', label: 'Activations / 30 Days' },
  { number: '94%', label: 'Attribution Accuracy' },
  { number: '-31%', label: 'CAC Reduction' },
  { number: '14.2%', label: 'Landing Page CVR' },
]

export default function MetricsBar() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="metrics-bar" ref={ref}>
      <div className="metrics-track">
        {metrics.map((m, i) => (
          <div
            className="metric-item"
            key={i}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `all 0.5s ease ${i * 0.1}s`
            }}
          >
            <div className="metric-number">{m.number}</div>
            <div className="metric-label">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
