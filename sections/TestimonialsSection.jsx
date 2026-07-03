import { useRef, useState, useEffect } from 'react'
import BASE_URL from '../services/config.js'


export default function TestimonialsSection() {
  const ref = useRef(null)

  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [idx, setIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  // Fetch testimonials
  useEffect(() => {
    fetch(`${BASE_URL}/api/testimonials/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setTestimonials(data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch testimonials:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Re-run fade-up observer after data loads
  useEffect(() => {
    if (loading || !ref.current) return

    const els = ref.current.querySelectorAll('.fade-up')
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in')
        }),
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [loading])

  function goTo(i) {
    setVisible(false)
    setTimeout(() => {
      setIdx(i)
      setVisible(true)
    }, 300)
  }

  // Auto-rotate every 5.5s
  useEffect(() => {
    if (testimonials.length === 0) return
    const timer = setInterval(() => {
      goTo((idx + 1) % testimonials.length)
    }, 5500)
    return () => clearInterval(timer)
  }, [idx, testimonials.length])

  return (
    <section className="section" id="testimonials" ref={ref}>
      <div className="containerWrapper">

        {/* Heading */}
        <div className="row">
          <div className="col-sm-12 text-center" style={{ marginBottom: '52px' }}>
            <span className="sec-label fade-up">Guest Reviews</span>
            <h2 className="sec-title dark fade-up fd2">What Our <em>Guests</em> Say</h2>
            <span className="sec-line center fade-up fd3"></span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Loading testimonials...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Failed to load testimonials: {error}</p>
            </div>
          </div>
        )}

        {/* Testimonial */}
        {!loading && !error && testimonials.length > 0 && (
          <div className="row">
            <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
              <div className="testi-wrap fade-up">
                <div className="testi-stars">★ ★ ★ ★ ★</div>
                <p
                  className="testi-quote"
                  style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                  {testimonials[idx].review}
                </p>
                <p
                  className="testi-author"
                  style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s ease' }}
                >
                  {testimonials[idx].guest_name} — {testimonials[idx].location}
                </p>
                <div className="testi-dots">
                  {testimonials.map((_, i) => (
                    <div
                      key={i}
                      className={`testi-dot${i === idx ? ' active' : ''}`}
                      onClick={() => goTo(i)}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  )
}