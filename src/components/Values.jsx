import { useState } from 'react'

const values = [
  {
    title: "Be the Bar",
    teaser: "Don't set the standard. Become it.",
    caseTitle: "840 Activations in 30 Days",
    problem: "B2B SaaS product launching a major feature with zero positioning strategy and 60-day runway.",
    action: "Ran 28 user interviews, validated positioning with real data, built a 12-page sales playbook, A/B tested 3 landing page variants, and coordinated a cross-channel launch.",
    result: "840 feature activations in 30 days (68% of target base). Landing page converted at 14.2% vs. 6% site average — a 137% improvement.",
    impact: "Set the bar for product launches: research-backed, data-validated, cross-functionally coordinated. No guessing.",
    link: "https://nicole.hallghosts.com",
    metrics: ["840 activations", "14.2% conversion", "76% WAU"]
  },
  {
    title: "Extreme Ownership",
    teaser: "Own the pipeline. Own the number.",
    caseTitle: "$2.4M Pipeline from Zero",
    problem: "Mid-market B2B company, $8M ARR, 100% dependent on cold outbound with declining response rates. Zero inbound.",
    action: "Built the entire demand engine: high-value lead magnets, paid social & search campaigns, quarterly webinar series, lead scoring with 12 behavioral signals, Salesforce + Marketo automation, and a 50-account ABM program.",
    result: "$2.4M in qualified pipeline within 6 months. 487 MQLs at $43 average CPL. 19 closed deals worth $680K. Sales cycle shortened from 6.3 to 4.8 months.",
    impact: "Revenue clarity + sustainable funnel. Inbound went from 0% to 35% of total pipeline.",
    link: "https://nicole.hallghosts.com",
    metrics: ["$2.4M pipeline", "487 MQLs", "$43 avg CPL"]
  },
  {
    title: "3-Way-Winners",
    teaser: "Marketing wins. Sales wins. Customers win.",
    caseTitle: "Hybrid Funnel Rebuild",
    problem: "Mid-market services brand where leads rose but conversions collapsed — a classic marketing-sales misalignment.",
    action: "Rewrote positioning from features to outcomes, simplified lead capture, rebuilt key pages in React SSG, implemented server-side GA4 events, automated lead routing to sales with 2-hour SLA.",
    result: "CPL down 37% in 60 days. Close rate jumped from 14% to 24%. Time to first contact: 22 hours down to 2 hours.",
    impact: "Marketing generates better leads. Sales closes faster. Customers get served immediately. Three-way win.",
    link: "https://nicole.hallghosts.com",
    metrics: ["CPL -37%", "Close rate: 14% → 24%", "2-hr response time"]
  },
  {
    title: "Growth is a Minimum Requirement",
    teaser: "Scale is the floor, not the ceiling.",
    caseTitle: "$12K to $85K Monthly at 4.2x ROAS",
    problem: "E-commerce brand stuck at $12K/month ad spend with inconsistent 2.8–5.1x ROAS. iOS14+ had crippled attribution accuracy to 42%.",
    action: "Rebuilt attribution infrastructure (server-side GTM + Meta CAPI, accuracy to 94%), built a structured creative testing framework (42 variations, weekly kill/scale cadence), automated bid rules and Slack alerts.",
    result: "Scaled 7x from $12K to $85K/month. Maintained 4.2x blended ROAS. CAC dropped 31% from $67 to $46. Landing page conversion up 81%.",
    impact: "Sustainable, profitable scale — not a lucky month. Systems-driven growth.",
    link: "https://nicole.hallghosts.com",
    metrics: ["7x spend scale", "4.2x ROAS", "CAC -31%"]
  },
  {
    title: "Adversity is an Opportunity",
    teaser: "Ship the fix, not the excuse.",
    caseTitle: "SEO Migration Recovery",
    problem: "An SEO migration missed redirect parity, causing an 18% organic traffic drop in 6 days.",
    action: "Published a transparent post-mortem. Built a parity checklist script. Added preflight redirect QA to CI/CD. Implemented synthetic monitoring for critical paths.",
    result: "Traffic recovered with a net +4% gain within 3 weeks. Built permanent safeguards into the deployment pipeline.",
    impact: "Turned a mistake into a stronger system. No hiding. Radical ownership and permanent improvement.",
    link: "https://nicole.hallghosts.com",
    metrics: ["Recovered in 3 weeks", "Net +4% gain", "Zero recurrence"]
  },
  {
    title: "Give More Than You Capture",
    teaser: "Lead with value. Revenue follows.",
    caseTitle: "B2B Content Engine",
    problem: "B2B tech company blog got traffic but produced zero leads. Content existed for vanity metrics.",
    action: "Developed 3 core content pillars tied to product value, created case study and guide templates, embedded contextual CTAs, built a filterable resource hub, added schema markup for rich snippets.",
    result: "Content-sourced leads up 200% quarter-over-quarter. Time on page for key articles up 90 seconds. Organic leads up 170% over 6 months.",
    impact: "Gave the audience real education. Captured demand from people who were genuinely helped — not tricked.",
    link: "https://nicole.hallghosts.com",
    metrics: ["Leads +200% QoQ", "Organic +170%", "+90s time on page"]
  },
  {
    title: "Radical Transparency",
    teaser: "No vanity metrics. No hidden numbers.",
    caseTitle: "Multi-Touch Attribution System",
    problem: "All credit went to last-click, causing chronic underinvestment in awareness channels. Leadership decisions based on incomplete data.",
    action: "Built a custom multi-touch attribution model in BigQuery connecting GA4, ad platforms, and CRM. Created Looker Studio dashboard with full channel contribution analysis.",
    result: "Discovered content and social drove 40% of pipeline — previously invisible. Budget reallocation decreased overall CAC by 22%.",
    impact: "Gave leadership the truth. Real numbers. Transparent methodology. Better decisions followed naturally.",
    link: "https://nicole.hallghosts.com",
    metrics: ["40% hidden pipeline exposed", "CAC -22%", "Full attribution clarity"]
  }
]

export default function Values() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section className="section" id="values">
      <div className="section-inner">
        <span className="section-tag">Prove It, Don't Claim It</span>
        <h2 className="section-title">SMB Team Values in Action</h2>
        <p className="section-subtitle">
          Every value is backed by a real engagement, a measurable result, and a system that can be replicated inside GoSMB.
        </p>

        <div className="values-grid">
          {values.map((v, i) => (
            <div
              key={i}
              className={`value-tile ${expanded === i ? 'expanded' : ''}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <h3>
                {v.title}
                <span className="toggle">+</span>
              </h3>
              <p className="teaser">{v.teaser}</p>

              <div className="value-detail">
                <div className="value-label">Case</div>
                <p>{v.caseTitle}</p>

                <div className="value-label">Problem</div>
                <p>{v.problem}</p>

                <div className="value-label">Action</div>
                <p>{v.action}</p>

                <div className="value-label">Result</div>
                <p>{v.result}</p>

                <div className="impact-bar">
                  <p>Impact: {v.impact}</p>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                  {v.metrics.map((m, j) => (
                    <span key={j} style={{
                      background: 'var(--green-dim)',
                      color: 'var(--green)',
                      fontSize: '12px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '4px'
                    }}>{m}</span>
                  ))}
                </div>

                <a href={v.link} target="_blank" rel="noopener noreferrer">
                  View Full Case Study →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
