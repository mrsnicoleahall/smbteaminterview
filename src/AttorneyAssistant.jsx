import { useState, useEffect, useRef } from 'react'
import useInView from './hooks/useInView'
import './attorney-assistant.css'

/* ===== CONSTANTS ===== */
const NAV_SECTIONS = [
  { id: 'aa-about', label: 'About' },
  { id: 'aa-cases', label: 'Case Studies' },
  { id: 'aa-plan', label: '90-Day Plan' },
  { id: 'aa-questions', label: 'Strategy Brief' },
  { id: 'aa-close', label: 'The Close' },
]

const EXTERNAL_LINKS = [
  { href: 'https://medium.com/@mrsnicoleahall', label: 'Blog' },
  { href: 'https://nicole.hallghosts.com', label: 'Portfolio' },
  { href: 'https://nicole.hallghosts.com/contact', label: 'Contact' },
]

/* ===== BG ANIMATIONS ===== */
function BgGeo() {
  return (
    <div className="aa-bg-geo">
      <div className="aa-geo aa-geo-circle aa-geo-circle-1" />
      <div className="aa-geo aa-geo-circle aa-geo-circle-2" />
      <div className="aa-geo aa-geo-circle aa-geo-circle-3" />
      <div className="aa-geo aa-geo-square aa-geo-square-1" />
      <div className="aa-geo aa-geo-tri aa-geo-tri-1" />
      <div className="aa-geo aa-geo-tri aa-geo-tri-2" />
      <div className="aa-geo aa-geo-diamond aa-geo-diamond-1" />
      <div className="aa-geo aa-geo-diamond aa-geo-diamond-2" />
      <div className="aa-geo aa-geo-diamond aa-geo-diamond-3" />
      <div className="aa-geo aa-geo-hex aa-geo-hex-1" />
      <div className="aa-geo aa-geo-hex aa-geo-hex-2" />
      <div className="aa-geo aa-geo-cross aa-geo-cross-1" />
      <div className="aa-geo aa-geo-cross aa-geo-cross-2" />
    </div>
  )
}

function BgDark() { return <div className="aa-bg-dark" /> }

/* ===== UTILITIES ===== */
function RevealOnScroll({ children, delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView(0.1)
  const transforms = {
    up: 'translateY(40px)',
    down: 'translateY(-40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
  }
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate(0)' : transforms[direction],
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const [ref, inView] = useInView(0.3)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

/* ===== SCROLL PROGRESS ===== */
function ScrollProgress() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const top = document.documentElement.scrollTop
      const height = document.documentElement.scrollHeight - window.innerHeight
      setWidth(height > 0 ? (top / height) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="aa-scroll-progress" style={{ width: `${width}%` }} />
}

/* ===== NAVBAR ===== */
function AANavBar() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const els = NAV_SECTIONS.map(s => document.getElementById(s.id)).filter(Boolean)
    if (!els.length) return
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActive(top.target.id)
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`aa-navbar ${scrolled ? 'solid' : 'transparent'}`}>
        <a
          className="aa-navbar-brand"
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
        >
          NH
        </a>
        <ul className="aa-navbar-links">
          {NAV_SECTIONS.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(s.id) }}
              >
                {s.label}
              </a>
            </li>
          ))}
          {EXTERNAL_LINKS.map(l => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="aa-nav-external">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="aa-navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '\u2715' : '\u2630'}
        </button>
      </nav>
      <div className={`aa-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {NAV_SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? 'active' : ''}
            onClick={e => { e.preventDefault(); scrollTo(s.id) }}
          >
            {s.label}
          </a>
        ))}
        {EXTERNAL_LINKS.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}

/* ===== HERO ===== */
function Hero() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <section className="aa-hero">
      <div className="aa-hero-overlay" />
      <div className="aa-hero-grid" />
      <div className="aa-hero-shapes">
        <div className="aa-shape aa-shape-1" />
        <div className="aa-shape aa-shape-2" />
        <div className="aa-shape aa-shape-3" />
        <div className="aa-shape aa-shape-4" />
        <div className="aa-shape aa-shape-5" />
      </div>
      <div className={`aa-hero-content ${visible ? 'visible' : ''}`}>
        <h1 className="aa-hero-headline">
          Turning Attorney Assistant into a{' '}
          <span className="aa-hero-highlight">Predictable Revenue Machine.</span>
        </h1>
        <p className="aa-hero-sub">
          Strategic Revenue Marketing. Operational Intelligence. Predictable Growth.
        </p>
        <div className="aa-hero-ctas">
          <a
            href="#aa-plan"
            className="aa-btn aa-btn-primary"
            onClick={e => { e.preventDefault(); document.getElementById('aa-plan')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Explore the 90 Day Plan
          </a>
          <a
            href="#aa-cases"
            className="aa-btn aa-btn-secondary"
            onClick={e => { e.preventDefault(); document.getElementById('aa-cases')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            See the Case Studies
          </a>
        </div>
      </div>
      <div className="aa-scroll-indicator">
        <div className="aa-scroll-arrow" />
      </div>
    </section>
  )
}

/* ===== WHO I AM ===== */
function WhoIAm() {
  const specialties = [
    'Full-funnel strategy',
    'Paid acquisition systems',
    'Conversion architecture',
    'Intake optimization',
    'Revenue modeling',
    'Cross-channel attribution',
    'Sales-marketing alignment',
    'Growth experimentation',
  ]

  const metrics = [
    { icon: '$', value: 'Multi-Million', label: 'Dollar Revenue Growth Campaigns', detail: 'Designed and executed large-scale campaigns driving measurable top-line revenue.' },
    { icon: '%', value: null, counter: 40, suffix: '%+', label: 'Conversion Lift Initiatives', detail: 'Systematic CRO across landing pages, funnels, and intake flows.' },
    { icon: '3', value: '3x', label: 'Pipeline Velocity Increase', detail: 'Compressed sales cycles through funnel optimization and automation systems.' },
    { icon: 'E', value: 'Enterprise', label: 'SaaS GTM Leadership', detail: 'Go-to-market strategy for multi-segment enterprise software.' },
    { icon: 'A', value: 'Agency', label: 'Founder & Systems Builder', detail: 'Founded and operated a growth marketing agency from the ground up.' },
  ]

  return (
    <section id="aa-about" className="aa-section aa-about">
      <BgGeo />
      <div className="aa-section-inner">
        <div className="aa-about-grid">
          <RevealOnScroll direction="left">
            <div className="aa-about-text">
              <span className="aa-tag">About</span>
              <h2 className="aa-heading-lg">
                I Don&#8217;t Do Marketing.<br />
                <span className="aa-text-blue">I Build Revenue Systems.</span>
              </h2>
              <p className="aa-body-text">
                I&#8217;m a Marketing Engineer with 20 years of experience designing and optimizing
                full-funnel revenue systems across SaaS, service-based businesses, and high-trust industries.
              </p>
              <p className="aa-body-text aa-body-bold">
                I don&#8217;t manage channels. I build engines.
              </p>
              <div className="aa-specialties">
                {specialties.map((s, i) => (
                  <span key={i} className="aa-specialty-tag">{s}</span>
                ))}
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll direction="right" delay={0.2}>
            <div className="aa-about-metrics">
              {metrics.map((m, i) => (
                <div key={i} className="aa-metric-card">
                  <div className="aa-metric-icon">{m.icon}</div>
                  <div className="aa-metric-text">
                    <div className="aa-metric-value">
                      {m.counter != null
                        ? <AnimatedCounter target={m.counter} suffix={m.suffix} />
                        : m.value}
                    </div>
                    <div className="aa-metric-label">{m.label}</div>
                    <div className="aa-metric-detail">{m.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  )
}

/* ===== CASE STUDIES ===== */
function CaseStudies() {
  const [activeCase, setActiveCase] = useState(null)
  const [flipped, setFlipped] = useState(null)

  const cases = [
    {
      id: 1,
      title: 'Service Provider Intake Rebuild',
      subtitle: 'Professional Services \u2014 Therapy & Legal-Adjacent',
      problem: 'Leads were rising but conversions collapsed. Intake response time averaged 22 hours. Close rate stuck at 14%. Classic marketing-sales misalignment with no attribution clarity.',
      actions: [
        'Rewrote positioning from features to client outcomes',
        'Rebuilt intake funnel with automated lead routing + 2-hour SLA',
        'Restructured paid channels and messaging repositioning',
        'Implemented CRM + full analytics stack with server-side tracking',
        'Mapped full funnel and eliminated intake leakage points',
        'Built Looker Studio dashboard for real-time pipeline visibility',
      ],
      results: ['CPL down 37% in 60 days', 'Close rate jumped from 14% to 24%', 'First-contact response: 22 hours \u2192 2 hours', 'Higher retention and increased LTV'],
    },
    {
      id: 2,
      title: 'Demand Engine from Zero',
      subtitle: 'B2B Service Company \u2014 $2.4M Pipeline Build',
      problem: '100% dependent on cold outbound with declining response rates. Zero inbound pipeline. Zero brand awareness in target vertical despite strong product-market fit. Sales spending 60%+ of time on unqualified prospects.',
      actions: [
        'Built 4-pillar demand engine from scratch',
        'Created high-value lead magnet (2,847 downloads)',
        'Launched paid social targeting 4 audience segments',
        'Built quarterly webinar series (2.3x higher conversion than content)',
        'Deployed 50-account ABM program with personalized outreach',
        'Implemented lead scoring and full Salesforce attribution',
      ],
      results: ['$2.4M qualified pipeline in 6 months', '487 MQLs generated at $43 average CPL', '28% lead-to-opportunity rate', 'Sales cycle shortened from 6.3 to 4.8 months'],
    },
    {
      id: 3,
      title: 'Paid Scale + Attribution Fix',
      subtitle: 'High-Trust Service Industry \u2014 7x Spend Scale',
      problem: 'Plateaued at $12K/month paid spend with inconsistent ROAS. Attribution degraded to 42% accuracy after privacy changes. Leadership couldn\u2019t trust reported numbers. Scaling decisions were effectively blind.',
      actions: [
        'Rebuilt attribution infrastructure (server-side GTM + Meta CAPI)',
        'Built custom multi-touch attribution model in BigQuery',
        'Structured creative testing framework: 42 ad variations, weekly kill/scale cadence',
        'Discovered UGC client stories averaged 5.8x ROAS vs 3.2x for product-focused ads',
        'Automated bid rules and anomaly alerts',
        'Landing page optimization lifted conversion from 2.1% to 3.8%',
      ],
      results: ['Scaled 7x: $12K to $85K/month', 'Maintained 4.2x blended ROAS', 'CAC reduced 31%', 'Attribution accuracy: 42% \u2192 94%'],
    },
  ]

  function handleCardClick(id) {
    if (activeCase === id) {
      setActiveCase(null)
    } else {
      setActiveCase(id)
    }
    setFlipped(flipped === id ? null : id)
  }

  return (
    <section id="aa-cases" className="aa-section aa-cases">
      <BgDark />
      <div className="aa-section-inner">
        <RevealOnScroll>
          <span className="aa-tag aa-tag-light">Proof of Impact</span>
          <h2 className="aa-heading-lg aa-text-white">Case Studies</h2>
        </RevealOnScroll>
        <div className="aa-cases-grid">
          {cases.map((c, i) => (
            <RevealOnScroll key={c.id} delay={i * 0.15}>
              <div
                className={`aa-case-card ${flipped === c.id ? 'flipped' : ''}`}
                onClick={() => handleCardClick(c.id)}
              >
                <div className="aa-case-card-inner">
                  <div className="aa-case-front">
                    <div>
                      <span className="aa-case-number">0{c.id}</span>
                      <h3 className="aa-case-title">{c.title}</h3>
                      <p className="aa-case-subtitle">{c.subtitle}</p>
                      <p className="aa-case-problem">{c.problem}</p>
                    </div>
                    <span className="aa-case-cta">Hover to preview &middot; Click to expand</span>
                  </div>
                  <div className="aa-case-back">
                    <h4>Actions Taken</h4>
                    <ul>
                      {c.actions.map((a, j) => <li key={j}>{a}</li>)}
                    </ul>
                    <h4>Results</h4>
                    <ul className="aa-results-list">
                      {c.results.map((r, j) => <li key={j}>{r}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {activeCase && (() => {
          const c = cases.find(x => x.id === activeCase)
          return (
            <div className="aa-case-detail">
              <button className="aa-case-detail-close" onClick={() => { setActiveCase(null); setFlipped(null) }}>
                &times;
              </button>
              <div className="aa-case-detail-header">
                <span className="aa-case-number">0{c.id}</span>
                <h3>{c.title}</h3>
                <p>{c.subtitle}</p>
              </div>
              <div className="aa-case-detail-grid">
                <div>
                  <h4>The Problem</h4>
                  <p>{c.problem}</p>
                </div>
                <div>
                  <h4>Actions Taken</h4>
                  <ul>{c.actions.map((a, j) => <li key={j}>{a}</li>)}</ul>
                </div>
                <div>
                  <h4>Results</h4>
                  <ul>{c.results.map((r, j) => <li key={j}>{r}</li>)}</ul>
                </div>
              </div>
            </div>
          )
        })()}
      </div>
    </section>
  )
}

/* ===== 90 DAY PLAN ===== */
function NinetyDayPlan() {
  const [activePhase, setActivePhase] = useState(null)
  const [sliderVal, setSliderVal] = useState(0)
  const [ref, inView] = useInView(0.1)

  const phases = [
    {
      id: 1,
      days: 'Days 1\u201330',
      title: 'Diagnose & Model',
      goal: 'Clarity and baseline metrics.',
      items: [
        'Audit full acquisition funnel',
        'Analyze CAC, LTV, churn',
        'Map conversion rates by stage',
        'Identify intake leakage points',
        'Interview 5\u201310 clients',
        'Audit messaging & differentiation',
        'Evaluate channel ROI',
      ],
    },
    {
      id: 2,
      days: 'Days 31\u201360',
      title: 'Architect & Align',
      goal: 'Strategic repositioning + controlled growth experiments.',
      items: [
        'Refine positioning',
        'Clarify unique differentiators',
        'Build ROI calculator for law firms',
        'Develop case-study heavy proof content',
        'Align sales enablement materials',
        'Optimize landing pages',
        'Launch controlled paid testing',
      ],
    },
    {
      id: 3,
      days: 'Days 61\u201390',
      title: 'Scale & Optimize',
      goal: 'Predictable revenue motion.',
      items: [
        'Double down on profitable channels',
        'Implement retention + upsell playbook',
        'Align cross-channel attribution',
        'Build performance dashboard',
        'Launch webinar funnel or thought leadership series',
        'Implement CRO experiments',
      ],
    },
  ]

  function handleSlider(e) {
    const val = Number(e.target.value)
    setSliderVal(val)
    setActivePhase(val + 1)
  }

  function handleNodeClick(id) {
    if (activePhase === id) {
      setActivePhase(null)
    } else {
      setActivePhase(id)
      setSliderVal(id - 1)
    }
  }

  function handlePhaseClick(id) {
    if (activePhase === id) {
      setActivePhase(null)
    } else {
      setActivePhase(id)
      setSliderVal(id - 1)
    }
  }

  return (
    <section id="aa-plan" className="aa-section aa-plan" ref={ref}>
      <BgGeo />
      <div className="aa-section-inner">
        <RevealOnScroll>
          <span className="aa-tag">The Plan</span>
          <h2 className="aa-heading-lg">
            The First 90 Days:<br />
            <span className="aa-text-blue">Building the Engine</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="aa-phase-slider-wrap">
            <span className="aa-phase-slider-label">Phase</span>
            <input
              type="range"
              min="0"
              max="2"
              step="1"
              value={sliderVal}
              onChange={handleSlider}
              className="aa-phase-slider"
            />
            <span className="aa-phase-slider-label">
              {phases[sliderVal]?.days}
            </span>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.3}>
          <div className="aa-plan-progress">
            <div className="aa-plan-progress-line">
              <div
                className="aa-plan-progress-fill"
                style={{ width: inView ? '100%' : '0%' }}
              />
            </div>
            {phases.map(p => (
              <button
                key={p.id}
                className={`aa-plan-progress-node ${inView ? 'filled' : ''} ${activePhase === p.id ? 'active' : ''}`}
                onClick={() => handleNodeClick(p.id)}
              >
                {p.id}
                <span className="aa-plan-progress-label">{p.days}</span>
              </button>
            ))}
          </div>
        </RevealOnScroll>

        <div className="aa-timeline">
          {phases.map((p, i) => (
            <RevealOnScroll key={p.id} delay={i * 0.15} direction={i % 2 === 0 ? 'left' : 'right'}>
              <div className={`aa-phase ${activePhase === p.id ? 'expanded' : ''}`}>
                <div className="aa-phase-header" onClick={() => handlePhaseClick(p.id)}>
                  <div className="aa-phase-marker">
                    <span>{p.id}</span>
                  </div>
                  <div className="aa-phase-info">
                    <span className="aa-phase-days">{p.days}</span>
                    <h3 className="aa-phase-title">{p.title}</h3>
                  </div>
                  <div className="aa-phase-toggle">
                    {activePhase === p.id ? '\u2212' : '+'}
                  </div>
                </div>
                <div className="aa-phase-content">
                  <ul className="aa-phase-items">
                    {p.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                  <div className="aa-phase-goal">
                    <strong>Goal: </strong>{p.goal}
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== QUESTIONS ===== */
function Questions() {
  const [openQ, setOpenQ] = useState(null)
  const [detailed, setDetailed] = useState(false)

  const questions = [
    { q: 'What is your current CAC?', insight: 'Surfaces acquisition efficiency and helps benchmark against industry standards to identify optimization opportunities.' },
    { q: 'What is your average client lifetime value?', insight: 'Reveals revenue potential per client and informs how aggressively we can invest in acquisition while maintaining profitability.' },
    { q: 'What is your churn rate?', insight: 'Measures retention health\u2014the foundation of sustainable growth. High churn negates acquisition gains.' },
    { q: 'What percentage of clients come organically vs paid?', insight: 'Clarifies channel attribution and dependency risk. Over-reliance on one channel creates vulnerability.' },
    { q: 'What is your intake-to-activation conversion rate?', insight: 'Identifies friction in the conversion pipeline between initial contact and active client status.' },
    { q: 'Where do clients drop off most frequently?', insight: 'Pinpoints the highest-impact funnel friction points where optimization yields the greatest return.' },
    { q: 'What differentiates Attorney Assistant from commoditized VA providers?', insight: 'Defines competitive positioning\u2014the strategic moat that protects pricing power and drives referral growth.' },
    { q: 'Is cross-selling structured or incidental?', insight: 'Reveals expansion revenue potential. Structured cross-sell motions can dramatically increase LTV.' },
    { q: 'What revenue targets are tied to this role?', insight: 'Aligns expectations and defines what success looks like\u2014essential for building a measurable growth plan.' },
  ]

  useEffect(() => {
    if (detailed) {
      setOpenQ('all')
    } else {
      setOpenQ(null)
    }
  }, [detailed])

  function isOpen(i) {
    return openQ === 'all' || openQ === i
  }

  function toggleQ(i) {
    if (detailed) return
    setOpenQ(openQ === i ? null : i)
  }

  return (
    <section id="aa-questions" className="aa-section aa-questions">
      <BgDark />
      <div className="aa-section-inner">
        <RevealOnScroll>
          <span className="aa-tag aa-tag-light">Strategy Brief</span>
          <h2 className="aa-heading-lg aa-text-white">
            The Questions That<br />
            <span className="aa-text-orange">Unlock Growth</span>
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="aa-toggle-wrap">
            <span className={`aa-toggle-label ${!detailed ? 'active' : ''}`}>Executive</span>
            <button
              className={`aa-toggle-switch ${detailed ? 'on' : ''}`}
              onClick={() => setDetailed(!detailed)}
            >
              <span className="aa-toggle-knob" />
            </button>
            <span className={`aa-toggle-label ${detailed ? 'active' : ''}`}>Detailed</span>
          </div>
        </RevealOnScroll>

        <div className="aa-accordion">
          {questions.map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.04}>
              <div className={`aa-accordion-item ${isOpen(i) ? 'open' : ''}`}>
                <button className="aa-accordion-header" onClick={() => toggleQ(i)}>
                  <span className="aa-accordion-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="aa-accordion-question">{item.q}</span>
                  <span className="aa-accordion-icon">{isOpen(i) ? '\u2212' : '+'}</span>
                </button>
                <div className="aa-accordion-body">
                  <p>{item.insight}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ===== WHY ME ===== */
function WhyMe() {
  const needs = [
    'Clear differentiation',
    'Full-funnel visibility',
    'Revenue accountability',
    'Conversion discipline',
    'Cross-channel intelligence',
    'Strategic positioning in a trust-driven industry',
  ]

  return (
    <section id="aa-close" className="aa-section aa-close-section">
      <BgGeo />
      <div className="aa-section-inner aa-close-inner">
        <RevealOnScroll>
          <h2 className="aa-heading-lg aa-close-heading">
            <span className="aa-close-line">You Don&#8217;t Need a Channel Manager.</span>
            <span className="aa-close-line"><span className="aa-text-orange">You Need a Growth Architect.</span></span>
          </h2>
        </RevealOnScroll>
        <RevealOnScroll delay={0.15}>
          <p className="aa-close-intro">
            If Attorney Assistant is going to scale, it needs:
          </p>
        </RevealOnScroll>
        <div className="aa-close-list">
          {needs.map((need, i) => (
            <RevealOnScroll key={i} delay={0.25 + i * 0.08}>
              <div className="aa-close-item">
                <div className="aa-close-check">{'\u2713'}</div>
                <span>{need}</span>
              </div>
            </RevealOnScroll>
          ))}
        </div>
        <RevealOnScroll delay={0.8}>
          <p className="aa-close-statement">That is what I build.</p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.9}>
          <a
            href="https://nicole.hallghosts.com/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="aa-btn aa-btn-cta"
          >
            Let&#8217;s Build the Engine.
          </a>
        </RevealOnScroll>
      </div>
    </section>
  )
}

/* ===== MAIN PAGE ===== */
export default function AttorneyAssistantPage() {
  useEffect(() => {
    const prev = {
      bg: document.body.style.backgroundColor,
      color: document.body.style.color,
      pt: document.body.style.paddingTop,
    }
    document.body.style.backgroundColor = '#FFFFFF'
    document.body.style.color = '#1A1A2E'
    document.body.style.paddingTop = '0'
    return () => {
      document.body.style.backgroundColor = prev.bg
      document.body.style.color = prev.color
      document.body.style.paddingTop = prev.pt
    }
  }, [])

  return (
    <div className="aa-page">
      <ScrollProgress />
      <AANavBar />
      <Hero />
      <WhoIAm />
      <CaseStudies />
      <NinetyDayPlan />
      <Questions />
      <WhyMe />
      <footer className="aa-footer">
        NICOLE HALL &mdash; GROWTH ARCHITECT &mdash; {new Date().getFullYear()}
      </footer>
    </div>
  )
}
