import { useRef, useEffect, useState } from 'react'
import BASE_URL from '../services/config.js'

export default function AmenitiesSection() {
  const ref = useRef(null)

  const [amenities, setAmenities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${BASE_URL}/api/amenities/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(data => {
        setAmenities(data.data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Failed to fetch amenities:', err)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Re-run fade-up observer after amenities load
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
  }, [loading]) // 👈 fires again once loading becomes false

  return (
    <section className="section" id="amenities" ref={ref}>
      <div className="containerWrapper">

        {/* Heading */}
        <div className="row">
          <div className="col-sm-12 text-center" style={{ marginBottom: '52px' }}>
            <span className="sec-label fade-up">Hotel Facilities</span>
            <h2 className="sec-title dark fade-up fd2">Our <em>Amenities</em></h2>
            <span className="sec-line center fade-up fd3"></span>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Loading amenities...</p>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="row">
            <div className="col-sm-12 text-center">
              <p>Failed to load amenities: {error}</p>
            </div>
          </div>
        )}

        {/* Cards */}
        {!loading && !error && (
          <div className="row amenities-row">
            {amenities.map((am, i) => (
              <div className="col-md-3 col-sm-6 col-xs-12" key={am.id}>
                <div className={`amenity-card fade-up${i % 4 !== 0 ? ` fd${(i % 4) + 1}` : ''}`}>
                  <div className="am-icon">
                    <i className={am.icon}></i>
                  </div>
                  <div className="am-name">{am.title}</div>
                  <p className="am-desc">{am.short_description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}