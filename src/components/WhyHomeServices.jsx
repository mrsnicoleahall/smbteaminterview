const pillars = [
  {
    title: 'Fragmented Market, Ready for Consolidation',
    description: 'Home services is a $600B+ industry dominated by independent contractors with no marketing infrastructure. Fragmentation creates consolidation opportunity for anyone who brings systemized growth.',
    stat: '$600B+ TAM',
  },
  {
    title: 'High LTV, Recurring Revenue Built In',
    description: 'HVAC alone averages $15K+ lifetime customer value with recurring maintenance contracts. Plumbing, electrical, and roofing follow similar patterns — high ticket, repeat need, referral-driven.',
    stat: '$15K+ avg HVAC LTV',
  },
  {
    title: 'Growth Acceleration Model Translates Directly',
    description: 'The demand engine, attribution infrastructure, and lifecycle automation built for B2B SaaS map 1:1 to contractor growth. Same playbook, different vertical.',
    stat: '1:1 model fit',
  },
  {
    title: 'First-Mover in Coaching-Led Growth',
    description: 'No one is combining growth marketing systems with contractor coaching at scale. The competitive landscape is SEO agencies and lead brokers — zero strategic operators.',
    stat: '0 direct competitors',
  },
]

export default function WhyHomeServices() {
  return (
    <section className="section" id="why-home-services">
      <div className="section-inner">
        <span className="section-tag">Market Opportunity</span>
        <h2 className="section-title">Why Home Services Now</h2>
        <p className="section-subtitle">
          A $600B fragmented market with zero coaching-led growth operators. The model translates. The timing is now.
        </p>

        <div className="why-hs-grid">
          {pillars.map((p, i) => (
            <div className="why-hs-card" key={i}>
              <div className="why-hs-num">0{i + 1}</div>
              <h4>{p.title}</h4>
              <p>{p.description}</p>
              <span className="why-hs-stat">{p.stat}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
