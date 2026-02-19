import { useState } from 'react'

const phases = [
  {
    month: 'Month 1',
    title: 'Validate',
    subtitle: 'Translate the model. Segment the market. Build governance.',
    items: [
      {
        label: 'Model Translation — Home Services',
        points: [
          'Audit SMB Team infrastructure for home services delivery readiness',
          'Map contractor unit economics across top categories',
          'Build demand curves for HVAC, plumbing, roofing, landscaping, electrical',
          'Benchmark Google Business Profile, Yelp, and Angi authority by category',
          'Identify metro areas with highest contractor fragmentation and lead demand',
          'Rank categories by recurring revenue potential and average ticket size'
        ]
      },
      {
        label: 'Vertical Segmentation Strategy',
        points: [
          'Rank top home service categories by TAM and revenue ceiling',
          'Score categories by ticket size, recurring revenue, and fragmentation',
          'Map franchise density — identify categories where independents dominate',
          'Assess coaching readiness by contractor segment',
          'Deliver tiered priority list with recommended entry category'
        ]
      },
      {
        label: 'Idea Governance Framework',
        points: [
          'Establish formal intake process for all new campaign ideas',
          'Require hypothesis documentation before resource allocation',
          'Set budget caps per experiment ($2–5K default, leadership approval above)',
          'Define time-to-signal windows: 14-day minimum, 30-day maximum',
          'Publish kill criteria — pre-defined data thresholds, no debate',
          'Launch weekly triage scoring: impact, confidence, effort, alignment'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 10: Model translation findings → leadership',
          'Day 18: Vertical segmentation scorecard → entry recommendation',
          'Day 25: Governance framework live — all ideas flow through intake',
          'Day 30: Pilot brief approved with category, budget, offers, kill criteria'
        ]
      }
    ]
  },
  {
    month: 'Month 2',
    title: 'Pilot',
    subtitle: 'Test the offer. Test the channel. Earn the signal.',
    items: [
      {
        label: 'Offer + Channel Testing',
        points: [
          'Launch pilot with 2–3 distinct offer variants in validated category',
          'Test positioning: price-anchored vs. outcome-anchored vs. risk-reversal',
          'Run parallel channel tests: paid search, paid social, LSA, direct mail',
          'Target: 50–100 qualified leads at defined CPL ceiling per variant',
          'Measure cost-per-opportunity and cost-per-closed-deal — not just CPL',
          'Weekly kill/scale decisions on offer and creative performance'
        ]
      },
      {
        label: 'Inbound Authority Strategy',
        points: [
          'Launch content engine: 2–4 category-specific articles/week targeting contractor pain points',
          'Develop first home services case study — document pilot results in real time',
          'Design monthly "Growth Clinic" webinar for home service contractors',
          'Initiate trade association partnerships: ACCA, PHCC, NARI',
          'Build vertical messaging library: category-specific ad copy, landing pages, email sequences',
          'Establish case study engine cadence: 1 new study per validated category per quarter',
          'Build organic lead capture: gated guides, ROI calculators, audit request forms'
        ]
      },
      {
        label: 'Risk Mitigation',
        points: [
          'Daily spend monitoring with automated alerts and hard budget caps',
          'Automated bid rules: pause if CPA exceeds ceiling for 3 consecutive days',
          'All new ideas routed through governance intake — no rogue launches',
          'Weekly sales alignment on lead quality and contractor engagement',
          'Monitor contractor onboarding velocity and early churn indicators'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 45: Offer and channel results reviewed against targets',
          'Day 50: Winning offer identified — losing variants killed with rationale',
          'Day 55: Inbound pipeline assessment — early authority signals measured',
          'Day 60: Scale or kill recommendation with data and retention impact'
        ]
      }
    ]
  },
  {
    month: 'Month 3',
    title: 'Scale or Kill',
    subtitle: 'Systematize what works. Cut what doesn\'t. Protect retention.',
    items: [
      {
        label: 'Scale Execution',
        points: [
          'If scale: 3–5x budget increase on proven offer + channel combinations',
          'Target LTV:CAC ≥ 3x before aggressive expansion',
          'Tie revenue forecasting to contractor capacity — never outpace delivery',
          'Validate multi-touch attribution accuracy before scaling spend',
          'If kill: redeploy budget to next vertical candidate within 5 business days'
        ]
      },
      {
        label: 'Playbook + Messaging Infrastructure',
        points: [
          'Document full vertical playbook: positioning, offers, channels, benchmarks',
          'Build verticalized messaging library: ad copy, landing pages, email sequences',
          'Templatize pilot process for repeatable entry into next category',
          'Publish internal knowledge base — every test, result, decision catalogued'
        ]
      },
      {
        label: 'Retention + Governance',
        points: [
          'Validate new acquisition is not degrading existing contractor book',
          'Review all intake ideas — score hit rate and resource efficiency',
          'Refine kill criteria and budget caps based on Month 2 actuals',
          'Monthly strategy review with leadership — transparent, no surprises'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 75: Full 90-day performance report with revenue attribution',
          'Day 80: Next category recommendation with projected unit economics',
          'Day 85: Playbook v1 delivered — ready for second category entry',
          'Day 90: Q2 strategic plan with pipeline targets and governance scorecard'
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
        <h2 className="section-title">The First 90 Days — Home Services Entry</h2>
        <p className="section-subtitle">
          Structured validation, governed execution, and hard kill criteria at every phase.
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
