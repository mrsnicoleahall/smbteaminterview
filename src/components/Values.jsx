import { useState } from 'react'

const values = [
  {
    title: "Be the Bar",
    teaser: "Be what everyone else is striving for.",
    caseTitle: "840 Activations in 30 Days",
    problem: "B2B SaaS product launching a major feature with zero positioning and 60-day runway.",
    action: "Ran 28 user interviews, validated positioning with real data, built a sales playbook, and coordinated a cross-channel launch.",
    result: "840 feature activations in 30 days. Landing page converted at 14.2% vs. 6% site average — 137% improvement.",
    impact: "Set the bar for product launches: research-backed, data-validated, cross-functionally coordinated.",
    link: "https://nicole.hallghosts.com",
    metrics: ["840 activations", "14.2% conversion", "76% WAU"],
    homeServices: "In home services, being the bar means building the growth system contractors didn't know was possible — attribution, lifecycle automation, and positioning that no SEO agency or lead broker is offering."
  },
  {
    title: "Extreme Ownership",
    teaser: "Own the outcome — even when it wasn't your fault.",
    caseTitle: "$2.4M Pipeline from Zero",
    problem: "Mid-market B2B company, 100% dependent on cold outbound with declining response rates. Zero inbound.",
    action: "Built the entire demand engine: lead magnets, paid campaigns, webinar series, lead scoring, and a 50-account ABM program.",
    result: "$2.4M qualified pipeline in 6 months. 487 MQLs at $43 CPL. Sales cycle shortened from 6.3 to 4.8 months.",
    impact: "Pipeline wasn't my mandate — but revenue was everyone's problem. Took accountability and built the system.",
    link: "https://nicole.hallghosts.com",
    metrics: ["$2.4M pipeline", "487 MQLs", "$43 avg CPL"],
    homeServices: "Contractor growth requires owning the entire funnel — not just handing off leads. From first search to closed deal to repeat service, one owner eliminates the blame gaps between marketing, sales, and operations."
  },
  {
    title: "3-Way-Winners",
    teaser: "The company wins. The team wins. The client wins.",
    caseTitle: "Hybrid Funnel Rebuild",
    problem: "Leads rose but conversions collapsed — classic marketing-sales misalignment.",
    action: "Rewrote positioning from features to outcomes, rebuilt key pages, implemented server-side tracking, and automated lead routing with a 2-hour SLA.",
    result: "CPL down 37% in 60 days. Close rate jumped from 14% to 24%. First-contact time: 22 hours to 2 hours.",
    impact: "Company grows revenue. Team operates with clarity. Client gets served immediately. Three-way win.",
    link: "https://nicole.hallghosts.com",
    metrics: ["CPL -37%", "Close rate: 14% → 24%", "2-hr response time"],
    homeServices: "The 3-way-win in home services: the contractor grows revenue, the coaching team delivers measurable results, and the homeowner gets a responsive, trustworthy service provider. Everyone wins or the system is broken."
  },
  {
    title: "Growth is a Minimum Requirement",
    teaser: "Scale is the floor, not the ceiling.",
    caseTitle: "$12K to $85K Monthly at 4.2x ROAS",
    problem: "E-commerce brand stuck at $12K/month ad spend with inconsistent ROAS. iOS14+ had crippled attribution to 42%.",
    action: "Rebuilt attribution infrastructure (server-side GTM + Meta CAPI), built a 42-variation creative testing framework, and automated bid rules.",
    result: "Scaled 7x from $12K to $85K/month. Maintained 4.2x blended ROAS. CAC dropped 31%.",
    impact: "Sustainable, profitable scale — not a lucky month. Systems-driven growth.",
    link: "https://nicole.hallghosts.com",
    metrics: ["7x spend scale", "4.2x ROAS", "CAC -31%"],
    homeServices: "Home services contractors who plateau at 10-20 jobs/month need the same systems approach: structured creative testing, automated bid management, and attribution that proves what's actually driving booked jobs."
  },
  {
    title: "Adversity is an Opportunity",
    teaser: "Ship the fix, not the excuse.",
    caseTitle: "SEO Migration Recovery",
    problem: "SEO migration missed redirect parity, causing 18% organic traffic drop in 6 days.",
    action: "Published a transparent post-mortem, built a parity checklist script, and added preflight redirect QA to CI/CD.",
    result: "Traffic recovered with net +4% gain in 3 weeks. Built permanent safeguards into the pipeline.",
    impact: "Turned a mistake into a stronger system. Radical ownership and permanent improvement.",
    link: "https://nicole.hallghosts.com",
    metrics: ["Recovered in 3 weeks", "Net +4% gain", "Zero recurrence"],
    homeServices: "When a contractor's Google Business Profile gets suspended or a bad review tanks their rating, the response defines the business. Systems turn setbacks into competitive advantages — every adversity produces a better process."
  },
  {
    title: "Give More Than You Capture",
    teaser: "Lead with value. Revenue follows.",
    caseTitle: "B2B Content Engine",
    problem: "B2B tech company blog got traffic but produced zero leads. Content existed for vanity metrics.",
    action: "Developed 3 content pillars tied to product value, created templates, embedded contextual CTAs, and built a resource hub.",
    result: "Content-sourced leads up 200% QoQ. Organic leads up 170% over 6 months.",
    impact: "Gave the audience real education. Captured demand from people who were genuinely helped.",
    link: "https://nicole.hallghosts.com",
    metrics: ["Leads +200% QoQ", "Organic +170%", "+90s time on page"],
    homeServices: "Home services coaching starts with free value — growth clinics, ROI calculators, and operational guides — that prove competence before asking for commitment. Contractors who see results from free resources become long-term coaching clients."
  },
  {
    title: "Radical Transparency",
    teaser: "No vanity metrics. No hidden numbers.",
    caseTitle: "Multi-Touch Attribution System",
    problem: "All credit went to last-click, causing underinvestment in awareness channels and incomplete leadership data.",
    action: "Built a custom multi-touch attribution model in BigQuery connecting GA4, ad platforms, and CRM with full Looker Studio dashboards.",
    result: "Discovered content and social drove 40% of pipeline — previously invisible. CAC decreased 22% after reallocation.",
    impact: "Gave leadership the truth. Real numbers. Transparent methodology. Better decisions followed.",
    link: "https://nicole.hallghosts.com",
    metrics: ["40% hidden pipeline exposed", "CAC -22%", "Full attribution clarity"],
    homeServices: "Contractors deserve to see exactly where every marketing dollar goes and what it produces. Full attribution, honest reporting, and clear ROI — no hiding behind vanity metrics like impressions or clicks."
  }
]

export default function Values() {
  const [expanded, setExpanded] = useState(null)

  return (
    <section className="section" id="values">
      <div className="section-inner">
        <span className="section-tag">Cultural Alignment</span>
        <h2 className="section-title">SMB Team Values in Action</h2>
        <p className="section-subtitle">
          Seven operating principles — each backed by a real engagement, a measurable result, and a direct application to home services growth.
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

                <div className="value-home-services">
                  <div className="value-label">Home Services Application</div>
                  <p>{v.homeServices}</p>
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
