import { useState, useEffect } from 'react'

const sections = [
  { id: 'why-home-services', label: 'Why Home Services' },
  { id: 'values', label: 'Values' },
  { id: 'roadmap', label: '90-Day Plan' },
  { id: 'governance', label: 'Governance' },
  { id: 'cases', label: 'Case Studies' },
  { id: 'simulator', label: 'Simulator' },
]

const externalLinks = [
  { href: 'https://medium.com/@mrsnicoleahall', label: 'Blog' },
  { href: 'https://nicole.hallghosts.com', label: 'Portfolio' },
  { href: 'https://nicole.hallghosts.com/contact', label: 'Contact' },
]

export default function NavBar() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const els = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean)

    if (els.length === 0) return

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting)
        if (visible.length > 0) {
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
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <a
          className="navbar-brand"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          href="#"
        >
          NH
        </a>

        <ul className="navbar-links">
          {sections.map(s => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={active === s.id ? 'active' : ''}
                onClick={(e) => { e.preventDefault(); scrollTo(s.id) }}
              >
                {s.label}
              </a>
            </li>
          ))}
          {externalLinks.map(l => (
            <li key={l.label}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="nav-external"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      <div className={`navbar-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {sections.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={active === s.id ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); scrollTo(s.id) }}
          >
            {s.label}
          </a>
        ))}
        {externalLinks.map(l => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-external"
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  )
}
