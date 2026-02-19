import { useState } from 'react'

const phases = [
  {
    month: 'Month 1',
    title: 'Validate',
    subtitle: 'Audit, align, and establish baselines',
    items: [
      {
        label: 'KPIs',
        points: [
          'Complete marketing + sales systems audit',
          'Map current attribution accuracy baseline',
          'Document existing funnel conversion rates at every stage',
          'Identify top 3 vertical expansion candidates',
          'Establish CAC, LTV, and ROAS benchmarks per vertical'
        ]
      },
      {
        label: 'Budget Targets',
        points: [
          'Audit current spend allocation across channels',
          'Identify highest-ROI quick wins (typically $0 to execute)',
          'Propose initial test budget for top vertical candidate',
          'Map attribution infrastructure investment needs'
        ]
      },
      {
        label: 'Risk Mitigation',
        points: [
          'No large spend commitments until attribution is verified',
          'Align with sales on lead quality definitions before generating volume',
          'Validate messaging assumptions with 15-20 customer interviews',
          'Document "kill criteria" — what would prove a vertical is not viable'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 14: Systems audit presented to leadership',
          'Day 21: Attribution infrastructure live or timeline confirmed',
          'Day 30: Validated vertical recommendation with unit economics model'
        ]
      }
    ]
  },
  {
    month: 'Month 2',
    title: 'Pilot',
    subtitle: 'Constrained spend, maximum signal',
    items: [
      {
        label: 'KPIs',
        points: [
          'Launch pilot campaign in validated vertical',
          'Target: 50-100 MQLs at defined CPL ceiling',
          'Measure true cost-per-opportunity (not just CPL)',
          'Track sales cycle length for inbound vs. existing pipeline',
          'Weekly creative performance reviews with kill/scale decisions'
        ]
      },
      {
        label: 'Budget Targets',
        points: [
          'Constrained test budget: $10-20K for initial channel validation',
          'A/B test minimum 6-8 creative variations per channel',
          'Allocate 20% of budget to experimental channels/audiences',
          'Zero budget increase until CPL and ROAS targets are confirmed'
        ]
      },
      {
        label: 'Risk Mitigation',
        points: [
          'Daily spend monitoring with automated alerts',
          'Automated bid rules: pause if CPA exceeds ceiling for 3 days',
          'Sales feedback loop: weekly alignment on lead quality scoring',
          'Landing page A/B testing to optimize conversion before scale'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 45: Pilot performance review — hit/miss against targets',
          'Day 50: Sales feedback integration — lead quality assessment',
          'Day 60: Scale or kill recommendation with supporting data'
        ]
      }
    ]
  },
  {
    month: 'Month 3',
    title: 'Scale or Kill',
    subtitle: 'Data dictates the decision',
    items: [
      {
        label: 'KPIs',
        points: [
          'If scale: 3-5x budget increase with maintained efficiency targets',
          'Target LTV:CAC ratio ≥ 3x before aggressive expansion',
          'Build playbook documentation for repeatable vertical entry',
          'Establish monthly reporting cadence with leadership',
          'If kill: redeploy budget to next vertical candidate within 1 week'
        ]
      },
      {
        label: 'Budget Targets',
        points: [
          'Scale scenario: Increase to $50-85K/month (proven at this level)',
          'Maintain blended ROAS floor of 3.5x during scale',
          'Allocate budget to proven creative formats (UGC at 5.8x ROAS)',
          'Kill scenario: Zero wasted spend — reallocate within 5 business days'
        ]
      },
      {
        label: 'Risk Mitigation',
        points: [
          'Automated scaling rules prevent over-spending on declining creative',
          'Attribution dashboard verified before scaling decisions',
          'Sales capacity planning aligned with lead volume projections',
          'Monthly strategy review with leadership — no surprises'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 75: Full 90-day performance report with revenue attribution',
          'Day 80: Next vertical recommendation (whether scaling or pivoting)',
          'Day 90: Q2 strategic plan presented with projected pipeline targets'
        ]
      }
    ]
  }
]

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(0)

  return (
    <section className="section" id="roadmap">
      <div className="section-inner">
        <span className="section-tag">Execution Plan</span>
        <h2 className="section-title">The First 90 Days</h2>
        <p className="section-subtitle">
          Every phase has clear KPIs, budget guardrails, risk mitigation, and kill criteria. No ambiguity. No surprises.
        </p>

        <div className="roadmap-container">
          <div className="roadmap-slider">
            {phases.map((p, i) => (
              <button
                key={i}
                className={`roadmap-tab ${activePhase === i ? 'active' : ''}`}
                onClick={() => setActivePhase(i)}
              >
                {p.month}: {p.title}
              </button>
            ))}
          </div>

          <div className="roadmap-phase" key={activePhase}>
            <h3>{phases[activePhase].title}</h3>
            <p className="phase-subtitle">{phases[activePhase].subtitle}</p>

            <div className="roadmap-grid">
              {phases[activePhase].items.map((item, i) => (
                <div className="roadmap-item" key={i}>
                  <h5>{item.label}</h5>
                  <ul>
                    {item.points.map((pt, j) => (
                      <li key={j}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
