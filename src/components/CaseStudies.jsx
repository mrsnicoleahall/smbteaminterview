import { useState } from 'react'

const cases = [
  {
    id: 'new-market',
    label: 'Entered a New Market',
    subtitle: 'B2B SaaS → Healthcare Vertical',
    title: '$2.4M Pipeline in an Untapped Vertical',
    context: 'Mid-market B2B software company, $8M ARR, entirely outbound-driven. Zero brand awareness in healthcare despite strong product-market fit. Sales spending 60%+ of time on unqualified prospects.',
    strategy: 'Built a 4-pillar demand engine: high-value lead magnet (47-page guide, 2,847 downloads), paid social targeting 4 audience segments on LinkedIn, quarterly webinar series driving 2.3x higher conversion than content, and a 50-account ABM program with personalized direct mail and custom landing pages.',
    tools: ['Salesforce', 'Marketo', 'LinkedIn Ads', 'Google Ads', 'Clearbit', 'Looker Studio'],
    metrics: [
      { val: '$2.4M', desc: 'Pipeline in 6 months' },
      { val: '487', desc: 'MQLs generated' },
      { val: '$43', desc: 'Average CPL' },
      { val: '28%', desc: 'Lead-to-opp rate' }
    ],
    gosmb: 'For SMBTeam vertical expansion, I would replicate this exact playbook: structured validation, targeted content that earns trust, coordinated ABM for enterprise accounts, and full attribution so every dollar is accountable. The webinar-to-SQL pipeline alone — with its 2.3x conversion advantage — is a natural fit for SMBTeam\'s educational positioning.'
  },
  {
    id: 'attribution',
    label: 'Fixed Broken Attribution',
    subtitle: 'From 42% to 94% Accuracy',
    title: 'Rebuilt Attribution to Unlock $10.6M in Hidden Value',
    context: 'iOS14+ privacy changes degraded Facebook pixel attribution from 78% to 42%. The team was effectively blind — scaling decisions were based on incomplete data, and leadership couldn\'t trust reported ROAS.',
    strategy: 'Implemented server-side Google Tag Manager on Google Cloud Platform, Meta Conversions API for server-to-server purchase data, Google Ads enhanced conversions, and event deduplication. Built custom Looker Studio dashboard connecting Meta, Google Ads, and Shopify with blended 7-day and 30-day ROAS windows. Separately, built a multi-touch attribution model in BigQuery that revealed content and social drove 40% of pipeline — previously invisible to last-click.',
    tools: ['Server-Side GTM', 'Meta CAPI', 'BigQuery', 'Looker Studio', 'Google Cloud', 'GA4'],
    metrics: [
      { val: '94%', desc: 'Attribution accuracy' },
      { val: '40%', desc: 'Hidden pipeline exposed' },
      { val: '-22%', desc: 'CAC after reallocation' },
      { val: '1 week', desc: 'To 89% accuracy' }
    ],
    gosmb: 'SMBTeam\'s multi-vertical expansion requires rock-solid attribution to know which verticals, channels, and creatives actually drive revenue. I\'d build this infrastructure from day one — not after the budget is spent. Full-stack tracking architecture is the foundation every scaling decision sits on.'
  },
  {
    id: 'paid-scale',
    label: 'Scaled Paid Profitably',
    subtitle: '$12K to $85K/month at 4.2x ROAS',
    title: 'Systematic Scale Without Sacrificing Efficiency',
    context: 'E-commerce brand plateaued at $12K/month paid spend with inconsistent 2.8–5.1x ROAS. No testing framework. Same 3-4 creatives running for months. Manual bid adjustments eating 2+ hours daily.',
    strategy: 'Built a structured creative testing framework: 6 value propositions, 42 ad variations over 4 months, weekly kill/scale cadence ($200 test → graduate at 3.5x ROAS). Discovered UGC customer stories averaged 5.8x ROAS vs 3.2x for product-focused ads — shifted 60% of production accordingly. Automated bid rules, Slack alerts for anomalies, and landing page optimization lifted conversion from 2.1% to 3.8%.',
    tools: ['Meta Ads', 'Google Ads', 'Server-Side GTM', 'Shopify', 'Slack', 'Looker Studio'],
    metrics: [
      { val: '7x', desc: 'Spend scaled' },
      { val: '4.2x', desc: 'Blended ROAS' },
      { val: '-31%', desc: 'CAC reduction' },
      { val: '3.8%', desc: 'Landing page CVR' }
    ],
    gosmb: 'SMBTeam\'s paid channels need systematic creative testing and automation — not spray-and-pray. I\'d implement the same weekly cadence: test small, kill fast, scale winners. The UGC insight alone (5.8x vs 3.2x ROAS) represents the kind of data-driven creative decisions that separate profitable scale from expensive guessing.'
  },
  {
    id: 'pipeline-zero',
    label: 'Built Pipeline from Zero',
    subtitle: '840 Activations in 30 Days',
    title: 'Product Launch: Zero to Market-Ready in 60 Days',
    context: 'B2B SaaS engineering team had built a sophisticated analytics feature over 6 months. Launch deadline in 60 days. No positioning strategy. No validation. No sales enablement.',
    strategy: 'Ran 28 in-depth user interviews in 3 weeks — discovered 73% were doing manual spreadsheet exports (4-6 hours weekly) and 89% would adopt immediately if we solved that. Fed research back to product: 5 of 7 recommendations implemented. Developed core positioning ("Stop wasting 5 hours a week on manual reporting"), A/B tested 3 headlines (winner converted at 14.2% vs 6% average), built 12-page sales playbook, coordinated cross-channel launch with segmented email nurture.',
    tools: ['HubSpot', 'Custom Event Tracking', 'A/B Testing', 'In-App Messaging', 'Email Automation'],
    metrics: [
      { val: '840', desc: 'Activations in 30 days' },
      { val: '14.2%', desc: 'Landing page CVR' },
      { val: '3.2 days', desc: 'Time-to-first-value' },
      { val: '-40%', desc: 'Demo-to-close time' }
    ],
    gosmb: 'Every SMBTeam vertical expansion is essentially a product launch into a new market. I\'d apply the same framework: interview-driven validation, research-backed positioning, coordinated cross-channel execution, and real-time activation tracking. The playbook infrastructure (battle cards, demo scripts, ROI guides) ensures sales can execute independently at scale.'
  }
]

export default function CaseStudies() {
  const [active, setActive] = useState(null)

  return (
    <section className="section" id="cases">
      <div className="section-inner">
        <span className="section-tag">Real Engagements, Real Numbers</span>
        <h2 className="section-title">Pick a Growth Challenge</h2>
        <p className="section-subtitle">
          Select a challenge. See the strategy, tools, before/after metrics, and how I'd replicate the system inside SMBTeam.
        </p>

        <div className="case-options">
          {cases.map((c) => (
            <div
              key={c.id}
              className={`case-option ${active === c.id ? 'active' : ''}`}
              onClick={() => setActive(active === c.id ? null : c.id)}
            >
              <h4>{c.label}</h4>
              <p>{c.subtitle}</p>
            </div>
          ))}
        </div>

        {active && (() => {
          const c = cases.find(x => x.id === active)
          return (
            <div className="case-detail" key={active}>
              <h3>{c.title}</h3>
              <div className="case-sections">
                <div className="case-section">
                  <h5>Context</h5>
                  <p>{c.context}</p>
                </div>
                <div className="case-section">
                  <h5>Strategy</h5>
                  <p>{c.strategy}</p>
                </div>
                <div className="case-section">
                  <h5>Tools Used</h5>
                  <div className="tools-list">
                    {c.tools.map((t, i) => (
                      <span className="tool-tag" key={i}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="case-section">
                  <h5>Results</h5>
                  <div className="case-metrics">
                    {c.metrics.map((m, i) => (
                      <div className="case-metric" key={i}>
                        <div className="metric-val">{m.val}</div>
                        <div className="metric-desc">{m.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="gosmb-box">
                  <h5>What I'd Replicate Inside SMBTeam</h5>
                  <p>{c.gosmb}</p>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
  )
}
