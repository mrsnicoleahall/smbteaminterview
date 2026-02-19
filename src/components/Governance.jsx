const items = [
  {
    title: 'Weekly Leadership Sync',
    description: 'Every initiative reviewed against pipeline targets. No surprises. No status-only meetings — decisions only.',
  },
  {
    title: 'Idea Intake Scoring',
    description: 'All new campaigns and experiments enter a formal intake. Scored on impact, confidence, effort, and strategic alignment before any resource allocation.',
  },
  {
    title: 'Budget Cap Enforcement',
    description: '$2–5K default experiment budget. Anything above requires leadership sign-off with documented hypothesis and success criteria.',
  },
  {
    title: 'Time-to-Signal Rules',
    description: '14-day minimum, 30-day maximum per test. No indefinite experiments. If the signal isn\'t clear, the test dies.',
  },
  {
    title: 'Kill Criteria',
    description: 'Pre-defined data thresholds that kill an idea — no debate, no politics. If CPA exceeds ceiling for 3 consecutive days, it pauses automatically.',
  },
  {
    title: 'Radical Transparency Reporting',
    description: 'Full attribution, full spend visibility, full pipeline impact. Every dollar tracked. Every decision documented. Leadership sees everything.',
  },
  {
    title: 'Data > Opinion Protocol',
    description: 'Decisions are made on performance data, not seniority or gut feel. Hypotheses are documented before tests run. Results are reviewed without bias.',
  },
]

export default function Governance() {
  return (
    <section className="section" id="governance">
      <div className="section-inner">
        <span className="section-tag">How Growth Gets Governed</span>
        <h2 className="section-title">Executive Alignment & Governance Framework</h2>
        <p className="section-subtitle">
          Every idea flows through structure. Every dollar is accountable. Every decision has a paper trail.
        </p>

        <div className="governance-list">
          {items.map((item, i) => (
            <div className="governance-item" key={i}>
              <span className="governance-num">{i + 1}</span>
              <div className="governance-content">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
