import { useRef, useState, useEffect } from 'react'
import  Link  from 'next/link'
import BASE_URL from '../services/config.js'

// ── How many cards to show on the Home page ───────────────────────────────────
const MAX_TALL = 1   // always just 1 large card on the left
const MAX_STD = 4   // 4 small cards on the right (2×2 grid)
// ─────────────────────────────────────────────────────────────────────────────

export default function EventsSection() {
  const ref = useRef(null)

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch events
  useEffect(() => {
    fetch(`${BASE_URL}/api/experiences/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setEvents(data.data ?? [])
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch experiences:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Re-run fade-up observer after data loads
  useEffect(() => {
    if (loading || !ref.current) return
    const els = ref.current.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  // ── Limit cards — change MAX_TALL / MAX_STD above to adjust ─────────────────
  const largeEvent = events.filter(e => e.layout === 'tall').slice(0, MAX_TALL)[0] ?? null
  const smallEvents = events.filter(e => e.layout !== 'tall').slice(0, MAX_STD)
  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <section className="section" id="experiences" ref={ref}>
      <div className="containerWrapper">

        {/* Heading */}
        <div className="row" style={{ marginBottom: '52px', alignItems: 'flex-end' }}>
          <div className="col-sm-8 col-xs-12">
            <span className="sec-label fade-up">Celebrate With Us</span>
            <h2 className="sec-title dark fade-up fd2">Events &amp; <em>Experiences</em></h2>
            <span className="sec-line fade-up fd3"></span>
          </div>
          <div className="col-sm-4 col-xs-12 text-right">
            <Link href="/banquet" className="sec-link fade-up">View All Experiences</Link>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Loading experiences...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Failed to load experiences: {error}</p>
            </div>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && events.length > 0 && (
          <div className="row events-row">

            {/* Tall card */}
            {largeEvent && (
              <div className="col-md-4 col-sm-12">
                <div className="event-card large fade-up">
                  <img src={largeEvent.image} alt={largeEvent.title} />
                  <div className="event-overlay"></div>
                  <div className="event-label">
                    <div className="event-name">{largeEvent.title}</div>
                    <div className="event-sub">{largeEvent.description}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Std cards */}
            <div className={largeEvent ? 'col-md-8 col-sm-12' : 'col-md-12 col-sm-12'}>
              <div className="row">
                {smallEvents.map((ev, i) => (
                  <div className="col-md-6 col-sm-6 col-xs-12" key={ev.id}>
                    <div className={`event-card fade-up fd${i + 2}`}>
                      <img src={ev.image} alt={ev.title} />
                      <div className="event-overlay"></div>
                      <div className="event-label">
                        <div className="event-name">{ev.title}</div>
                        <div className="event-sub">{ev.description}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  )
}