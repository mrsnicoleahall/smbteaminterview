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
          'Operational readiness audit: assess SMB Team infrastructure for home services delivery',
          'Margin structure analysis: map contractor unit economics across top categories',
          'Seasonality modeling: build demand curves for HVAC, plumbing, roofing, landscaping, and electrical',
          'Review/reputation maturity: benchmark Google Business Profile, Yelp, and Angi authority by category',
          'Local market density: identify metro areas with highest contractor fragmentation and lead demand',
          'Service-mix LTV modeling: rank categories by recurring revenue potential and average ticket size'
        ]
      },
      {
        label: 'Vertical Segmentation Strategy',
        points: [
          'Rank top home service categories by TAM and revenue ceiling',
          'Score categories by average ticket size, recurring revenue potential, and fragmentation',
          'Map franchise density — identify categories where independents dominate',
          'Assess coaching readiness: which contractors will adopt systems vs. resist change',
          'Deliver tiered priority list with recommended entry category and rationale'
        ]
      },
      {
        label: 'Idea Governance Framework',
        points: [
          'Establish formal intake process for all new campaign and funnel ideas',
          'Require hypothesis documentation before any resource allocation',
          'Define budget caps per experiment ($2-5K default, leadership approval above)',
          'Set time-to-signal windows: 14-day minimum, 30-day maximum per test',
          'Publish kill criteria — what data kills an idea, no debate',
          'Launch weekly triage scoring model: impact, confidence, effort, alignment'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 10: Model translation findings presented to leadership',
          'Day 18: Vertical segmentation scorecard delivered with entry recommendation',
          'Day 25: Idea governance framework live — all new ideas flow through intake',
          'Day 30: Pilot brief approved with target category, budget, offers, and kill criteria'
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
          'Launch pilot in validated home services category with 2-3 distinct offer variants',
          'Test offer positioning: price-anchored vs. outcome-anchored vs. risk-reversal',
          'Run parallel channel tests: paid search, paid social, LSA, and direct mail where applicable',
          'Target: 50-100 qualified leads at defined CPL ceiling per offer variant',
          'Measure true cost-per-opportunity and cost-per-closed-deal — not just CPL',
          'Weekly creative and offer performance reviews with kill/scale decisions'
        ]
      },
      {
        label: 'Inbound Authority Strategy',
        points: [
          'Launch content engine: 2-4 category-specific articles per week targeting contractor pain points',
          'Develop first home services case study — document pilot results in real time',
          'Design webinar/event model: monthly "Growth Clinic" for home service contractors',
          'Identify and initiate 3-5 partnership conversations (trade associations, supplier networks, SaaS tools)',
          'Build organic lead capture: gated guides, ROI calculators, audit request forms'
        ]
      },
      {
        label: 'Risk Mitigation',
        points: [
          'Daily spend monitoring with automated alerts and hard budget caps',
          'Automated bid rules: pause if CPA exceeds ceiling for 3 consecutive days',
          'All new ideas routed through governance intake — no rogue launches',
          'Sales feedback loop: weekly alignment on lead quality and contractor engagement',
          'Retention signal tracking: monitor contractor onboarding velocity and early churn indicators'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 45: Pilot performance review — offer and channel results against targets',
          'Day 50: Winning offer identified — losing variants killed with documented rationale',
          'Day 55: Inbound pipeline assessment — early authority signals measured',
          'Day 60: Scale or kill recommendation with supporting data and retention impact analysis'
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
          'If scale: 3-5x budget increase on proven offer + channel combinations',
          'Target LTV:CAC ratio ≥ 3x before aggressive expansion',
          'Revenue forecasting tied to contractor capacity — never outpace delivery',
          'Attribution validation: confirm multi-touch model accuracy before scaling spend',
          'If kill: redeploy budget to next vertical candidate within 5 business days'
        ]
      },
      {
        label: 'Playbook + Messaging Infrastructure',
        points: [
          'Document full vertical playbook: positioning, offers, channels, creative, conversion benchmarks',
          'Build verticalized messaging library: category-specific ad copy, landing pages, email sequences',
          'Templatize the pilot process for repeatable entry into next home services category',
          'Publish internal knowledge base — every test, result, and decision catalogued'
        ]
      },
      {
        label: 'Retention + Governance',
        points: [
          'Retention health check: validate that new contractor acquisition is not degrading existing book',
          'Governance audit: review all ideas that entered intake — score hit rate and resource efficiency',
          'Refine kill criteria and budget caps based on Month 2 actuals',
          'Monthly strategy review with leadership — transparent reporting, no surprises'
        ]
      },
      {
        label: 'Decision Checkpoints',
        points: [
          'Day 75: Full 90-day performance report with revenue attribution and retention impact',
          'Day 80: Next home services category recommendation with projected unit economics',
          'Day 85: Playbook v1 delivered — ready for second category entry',
          'Day 90: Q2 strategic plan presented with pipeline targets, capacity model, and governance scorecard'
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
          Translate the Growth Acceleration Model into home services. Every phase has governance controls, kill criteria, and retention safeguards. No rogue launches. No vanity tests. No surprises.
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
