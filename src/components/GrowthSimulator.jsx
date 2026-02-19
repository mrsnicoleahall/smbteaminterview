import { useState } from 'react'

export default function GrowthSimulator() {
  const [ltv, setLtv] = useState('')
  const [targetCac, setTargetCac] = useState('')
  const [closeRate, setCloseRate] = useState('')
  const [results, setResults] = useState(null)

  function calculate() {
    const ltvNum = parseFloat(ltv)
    const cacNum = parseFloat(targetCac)
    const crNum = parseFloat(closeRate) / 100

    if (!ltvNum || !cacNum || !crNum || crNum <= 0) return

    const requiredCpl = cacNum * crNum
    const ltvCacRatio = ltvNum / cacNum
    const breakEvenMonths = ltvCacRatio >= 3 ? Math.ceil(cacNum / (ltvNum / 12)) : ltvCacRatio >= 1 ? Math.ceil(cacNum / (ltvNum / 18)) : null
    const monthlyClients = 100 * crNum
    const annualRevenue = monthlyClients * ltvNum * 12
    const scalable = ltvCacRatio >= 3

    setResults({
      requiredCpl: requiredCpl.toFixed(0),
      ltvCacRatio: ltvCacRatio.toFixed(1),
      breakEvenMonths: breakEvenMonths || 'N/A',
      annualRevenue: annualRevenue >= 1000000
        ? `$${(annualRevenue / 1000000).toFixed(1)}M`
        : `$${(annualRevenue / 1000).toFixed(0)}K`,
      scalable
    })
  }

  return (
    <section className="section" id="simulator">
      <div className="section-inner">
        <span className="section-tag">Financial Fluency</span>
        <h2 className="section-title">Can This Vertical Scale?</h2>
        <p className="section-subtitle">
          Growth decisions require unit economics, not intuition. Model the numbers before spending the budget.
        </p>

        <div className="simulator">
          <div className="simulator-inputs">
            <div className="sim-field">
              <label>Average Client LTV ($)</label>
              <input
                type="number"
                placeholder="e.g. 15000"
                value={ltv}
                onChange={(e) => setLtv(e.target.value)}
              />
            </div>
            <div className="sim-field">
              <label>Target CAC ($)</label>
              <input
                type="number"
                placeholder="e.g. 2500"
                value={targetCac}
                onChange={(e) => setTargetCac(e.target.value)}
              />
            </div>
            <div className="sim-field">
              <label>Close Rate (%)</label>
              <input
                type="number"
                placeholder="e.g. 25"
                value={closeRate}
                onChange={(e) => setCloseRate(e.target.value)}
              />
            </div>
          </div>

          <button className="sim-calculate" onClick={calculate}>
            Run Model →
          </button>

          {results && (
            <div className="sim-results">
              <div className="sim-results-grid">
                <div className="sim-result-card">
                  <div className="result-value">${results.requiredCpl}</div>
                  <div className="result-label">Required CPL</div>
                </div>
                <div className="sim-result-card">
                  <div className="result-value">{results.ltvCacRatio}x</div>
                  <div className="result-label">LTV:CAC Ratio</div>
                </div>
                <div className="sim-result-card">
                  <div className="result-value">{results.breakEvenMonths}{typeof results.breakEvenMonths === 'number' ? 'mo' : ''}</div>
                  <div className="result-label">Break-Even</div>
                </div>
                <div className="sim-result-card">
                  <div className="result-value">{results.annualRevenue}</div>
                  <div className="result-label">12-Mo Revenue (100 leads/mo)</div>
                </div>
              </div>

              <div className={`sim-verdict ${results.scalable ? 'scale' : 'refine'}`}>
                {results.scalable ? '✓ Scale This Vertical' : '⚠ Refine Before Scaling'}
              </div>

              <div className="sim-commentary">
                <p>
                  {results.scalable
                    ? `With a ${results.ltvCacRatio}x LTV:CAC ratio, this vertical supports aggressive expansion. I would validate with a 30-day pilot at constrained budget, confirm CPL targets hold at $${results.requiredCpl}, then scale spend systematically — the same methodology that took one brand from $12K to $85K/month while maintaining 4.2x ROAS. The key is building attribution infrastructure first so every scaling decision is backed by real conversion data, not platform-reported vanity metrics.`
                    : `A ${results.ltvCacRatio}x LTV:CAC ratio signals risk — expansion at this ratio burns cash faster than it compounds. Before scaling, I'd tighten the funnel: improve close rates through better qualification (we lifted one client from 14% to 24%), reduce CPL through creative testing frameworks, and validate product-market fit with customer interviews. The $2.4M pipeline I built started with the same discipline — modeling the economics before spending the first dollar.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
