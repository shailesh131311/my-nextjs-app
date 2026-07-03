import { useRef, useState, useEffect } from 'react'
import  Link  from 'next/link'
import { useFadeUp } from '../hooks/useFadeUp'
import Lightbox from '../components/Lightbox'
import BASE_URL from '../services/config.js'

const API_IMAGES = `${BASE_URL}/api/gallery/`

function normalisePhoto(item) {
  return {
    id: item.id,
    src: item.image,
    alt: item.title || 'Acasa Gallery',
    cat: item.category_slug,
    label: item.category_name,
    title: item.title,
    size: item.layout || 'std',
  }
}

export default function GallerySection() {
  const ref = useRef(null)
  useFadeUp(ref)

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [lbIdx, setLbIdx] = useState(null)

  // ── Fetch gallery images from API ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(API_IMAGES)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return
        const raw = Array.isArray(json) ? json : json.data ?? []
        // Sort by id so order is consistent, then take first 5 for the section
        const sorted = raw
          .sort((a, b) => Number(a.id) - Number(b.id))
          .slice(0, 5)
        setPhotos(sorted.map(normalisePhoto))
      })
      .catch((err) => console.error('[GallerySection API]', err))
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [])

  // ── Re-run fade observer after photos render ───────────────────────────────
  useEffect(() => {
    if (!photos.length || !ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    ref.current.querySelectorAll('.fade-up:not(.in)').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [photos])

  function openLb(i) { setLbIdx(i) }
  function closeLb() { setLbIdx(null) }
  function prevLb() { setLbIdx((lbIdx - 1 + photos.length) % photos.length) }
  function nextLb() { setLbIdx((lbIdx + 1) % photos.length) }

  // ── Skeleton placeholders while loading ───────────────────────────────────
  if (loading) {
    return (
      <section className="section section-alt" id="gallery" ref={ref}>
        <div className="containerWrapper">
          <div className="row">
            <div className="col-sm-12 text-center" style={{ marginBottom: '52px' }}>
              <span className="sec-label fade-up">Photo Gallery</span>
              <h2 className="sec-title dark fade-up fd2">A Glimpse of <em>Acasa</em></h2>
              <span className="sec-line center fade-up fd3"></span>
            </div>
          </div>
          <div className="row gallery-row">
            <div className="col-md-5 col-sm-12 gal-col-left">
              <div className="gal-item gal-tall skeleton-box" style={{ borderRadius: 4 }} />
            </div>
            <div className="col-md-7 col-sm-12 gal-col-right">
              <div className="row gal-inner-row">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div className="col-sm-6 col-xs-12" key={i}>
                    <div className="gal-item gal-half skeleton-box" style={{ borderRadius: 4 }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // ── Guard: nothing to show yet ─────────────────────────────────────────────
  if (!photos.length) return null

  return (
    <section className="section section-alt" id="gallery" ref={ref}>
      <div className="containerWrapper">

        {/* Heading */}
        <div className="row">
          <div className="col-sm-12 text-center" style={{ marginBottom: '52px' }}>
            <span className="sec-label fade-up">Photo Gallery</span>
            <h2 className="sec-title dark fade-up fd2">A Glimpse of <em>Acasa</em></h2>
            <span className="sec-line center fade-up fd3"></span>
          </div>
        </div>

        {/* Gallery grid — identical layout to original */}
        <div className="row gallery-row">

          {/* Tall left image — always photos[0] */}
          <div className="col-md-5 col-sm-12 gal-col-left">
            <div
              className="gal-item gal-tall fade-up"
              onClick={() => openLb(0)}
              style={{ cursor: 'pointer' }}
            >
              <img src={photos[0].src} alt={photos[0].alt} />
              <div className="gal-overlay"><i className="fa fa-expand"></i></div>
            </div>
          </div>

          {/* 2×2 right grid — photos[1..4] */}
          <div className="col-md-7 col-sm-12 gal-col-right">
            <div className="row gal-inner-row">
              {photos.slice(1).map((img, i) => (
                <div className="col-sm-6 col-xs-12" key={img.id}>
                  <div
                    className={`gal-item gal-half fade-up fd${(i % 2) + 2}`}
                    onClick={() => openLb(i + 1)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img src={img.src} alt={img.alt} />
                    <div className="gal-overlay"><i className="fa fa-expand"></i></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="row">
          <div className="col-sm-12 text-center" style={{ marginTop: '36px' }}>
            <Link href="/gallery" className="btn-outline-forest fade-up">View Full Gallery</Link>
          </div>
        </div>

      </div>

      {/* Lightbox — passes live API photos */}
      {lbIdx !== null && (
        <Lightbox
          images={photos}
          currentIdx={lbIdx}
          onClose={closeLb}
          onPrev={prevLb}
          onNext={nextLb}
        />
      )}
    </section>
  )
}