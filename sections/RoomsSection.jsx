import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { useFadeUp } from '../hooks/useFadeUp'
import BASE_URL from '../services/config.js'

const TAG_STYLES = [
  { background: '#6b7c5c', color: '#fff' },
  { background: '#c9a96e', color: '#fff' },
  { background: '#5c6b7c', color: '#fff' },
  { background: '#7c5c6b', color: '#fff' },
]

function normaliseRoom(r, index) {
  const images = r.images || []
  const amenities = r.amenities || []
  const details = r.room_details || {}

  const price = r.selling_price
    ? parseFloat(r.selling_price).toLocaleString('en-IN')
    : r.mrp
      ? parseFloat(r.mrp).toLocaleString('en-IN')
      : '—'

  const specs = [
    details.room_size && { icon: 'fa-ruler-combined', val: details.room_size.trim(), lbl: 'Room Size' },
    details.bed_type && { icon: 'fa-bed', val: details.bed_type.trim(), lbl: 'Bed Type' },
    details.max_occupancy && { icon: 'fa-user', val: details.max_occupancy.trim(), lbl: 'Occupancy' },
  ].filter(Boolean)

  const resolveUrl = (url) => {
    if (!url) return ''
    return url.startsWith('http') ? url : `${BASE_URL}${url}`
  }

  return {
    id: String(r.id),
    img: resolveUrl(images[0]?.image),
    images: images.map((img) => ({ ...img, image: resolveUrl(img.image) })),
    name: r.room_type?.trim() || 'Room',
    desc: r.title?.trim() || '',
    longDesc: r.description?.trim() || '',
    tag: r.room_type?.trim() || 'Room',
    tagStyle: TAG_STYLES[index % TAG_STYLES.length],
    feats: amenities.slice(0, 3).map((a) => a.name?.trim()).filter(Boolean),
    price,
    mrp: r.mrp,
    selling_price: r.selling_price,
    specs,
    amenities: amenities.map((a) => ({
      icon: a.icon ? a.icon.replace(/fa-solid\s+|fa-regular\s+|fa-brands\s+/g, '') : 'fa-star',
      text: a.name?.trim() || '',
    })),
    rawData: r,
  }
}

/* ── Mini Room Modal ────────────────────────────────────────────────── */
function RoomDetailModal({ room, onClose }) {
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setActiveImg(0)
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [room])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!room) return null

  // Debug — remove once images confirmed working
  console.log('[Modal] img:', room.img, '| images:', room.images)

  const imgSrc = room.images[activeImg]?.image || room.img

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.65)',
          zIndex: 9998,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999,
          width: 'min(860px, 95vw)',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--ivory, #F4EDE7)',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Gallery */}
        <div style={{ position: 'relative', width: '100%', height: 300, overflow: 'hidden', flexShrink: 0 }}>
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={room.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={(e) => {
                console.warn('[Modal] Image failed to load:', imgSrc)
                e.target.style.display = 'none'
              }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--forest, #2E3E31)', opacity: 0.15 }} />
          )}

          {/* Close button — overlaid on image */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: 0, right: 0,
              zIndex: 10,
              background: 'var(--forest, #2E3E31)',
              color: '#fff',
              border: 'none',
              width: 39,
              height: 40,
              borderRadius: 0,
              cursor: 'pointer',
              fontSize: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px',
            }}
          >
            <i className="fa fa-xmark" />
          </button>

          {/* Thumbnails */}
          {room.images.length > 1 && (
            <div style={{
              position: 'absolute', bottom: 12, left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex', gap: 8,
            }}>
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    width: 52, height: 36,
                    border: i === activeImg ? '2px solid var(--gold, #AC9256)' : '2px solid rgba(255,255,255,0.4)',
                    borderRadius: 2,
                    padding: 0, cursor: 'pointer', overflow: 'hidden',
                    background: 'transparent',
                  }}
                >
                  <img src={img.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Body */}
        <div style={{ padding: '28px 36px 36px', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            fontFamily: 'var(--sans, Geologica, sans-serif)',
            fontSize: 11, letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--gold, #AC9256)',
            marginBottom: 10,
          }}>
            {room.tag}
          </span>

          <h2 style={{
            fontFamily: 'var(--serif, serif)',
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 500,
            color: 'var(--forest, #2E3E31)',
            margin: '0 0 8px',
          }}>
            {room.name}
          </h2>

          <p style={{
            fontFamily: 'var(--sans, sans-serif)',
            fontSize: 15,
            color: 'var(--brown, #453E2A)',
            maxWidth: 560,
            margin: '0 auto 24px',
            lineHeight: 1.7,
          }}>
            {room.longDesc || room.desc}
          </p>

          {/* Specs */}
          {room.specs.length > 0 && (
            <div style={{
              display: 'flex', justifyContent: 'center',
              gap: 'clamp(16px, 4vw, 40px)',
              flexWrap: 'wrap',
              borderTop: '1px solid rgba(46,62,49,0.12)',
              borderBottom: '1px solid rgba(46,62,49,0.12)',
              padding: '20px 0',
              marginBottom: 24,
            }}>
              {room.specs.map((sp) => (
                <div key={sp.lbl} style={{ textAlign: 'center' }}>
                  <i className={`fa ${sp.icon}`} style={{ color: 'var(--gold, #AC9256)', fontSize: 18, marginBottom: 6, display: 'block' }} />
                  <div style={{ fontFamily: 'var(--serif, serif)', fontSize: 15, fontWeight: 600, color: 'var(--forest, #2E3E31)' }}>{sp.val}</div>
                  <div style={{ fontFamily: 'var(--sans, sans-serif)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--grey, #9D9D9C)', marginTop: 2 }}>{sp.lbl}</div>
                </div>
              ))}
            </div>
          )}

          {/* Amenities */}
          {room.amenities.length > 0 && (
            <div style={{ marginBottom: 28 }}>
              <p style={{
                fontFamily: 'var(--sans, sans-serif)',
                fontSize: 11, letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--grey, #9D9D9C)',
                marginBottom: 14,
              }}>
                Room Amenities
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                gap: '10px 16px',
                textAlign: 'left',
                maxWidth: 600,
                margin: '0 auto',
              }}>
                {room.amenities.map((a) => (
                  <div key={a.text} style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'var(--sans, sans-serif)',
                    fontSize: 13, color: 'var(--brown, #453E2A)',
                  }}>
                    <i className={`fa ${a.icon}`} style={{ color: 'var(--gold, #AC9256)', width: 16, textAlign: 'center', flexShrink: 0 }} />
                    {a.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 24, flexWrap: 'wrap',
            borderTop: '1px solid rgba(46,62,49,0.12)',
            paddingTop: 24,
          }}>
            <div style={{ textAlign: 'center' }}>
              {room.mrp && room.selling_price && room.mrp !== room.selling_price && (
                <div style={{
                  fontFamily: 'var(--sans, sans-serif)',
                  fontSize: 13, color: 'var(--grey, #9D9D9C)',
                  textDecoration: 'line-through', display: 'none',
                }}>
                  ₹{parseFloat(room.mrp).toLocaleString('en-IN')}
                </div>
              )}
              <div style={{
                fontFamily: 'var(--serif, serif)',
                fontSize: 26, fontWeight: 600,
                color: 'var(--forest, #2E3E31)', display: 'none',
              }}>
                <sup style={{ fontSize: 14 }}>₹</sup>{room.price}
              </div>
              <div style={{
                fontFamily: 'var(--sans, sans-serif)',
                fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
                color: 'var(--grey, #9D9D9C)',
              }}>
                per night · taxes inclusive
              </div>
            </div>

            <Link
              href={`/rooms/${room.id}`}
              className="btn-forest"
              onClick={onClose}
            >
              Book This Room
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

/* ── Main Section ───────────────────────────────────────────────────── */
export default function RoomsSection() {
  const ref = useRef(null)
  useFadeUp(ref)

  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [modalRoom, setModalRoom] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    fetch(`${BASE_URL}/api/rooms/`)
      .then((res) => res.json())
      .then((json) => {
        if (cancelled) return
        if (!json.status) throw new Error(json.message || 'Failed to fetch rooms')
        setRooms(json.data.map(normaliseRoom))
      })
      .catch((err) => {
        if (cancelled) return
        console.error('[RoomsSection API]', err)
        setError('Unable to load rooms.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!rooms.length || !ref.current) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )
    const els = ref.current.querySelectorAll('.fade-up:not(.in)')
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [rooms])

  return (
    <>
      <section className="section section-alt" id="rooms" ref={ref}>
        <div className="containerWrapper">

          {/* Heading */}
          <div className="row">
            <div className="col-sm-12 text-center" style={{ marginBottom: '52px' }}>
              <span className="sec-label fade-up">Accommodations</span>
              <h2 className="sec-title dark fade-up fd2">Rooms &amp; <em>Suites</em></h2>
              <span className="sec-line center fade-up fd3"></span>
              <p className="sec-body fade-up fd3" style={{ maxWidth: '520px', margin: '0 auto' }}>
                Each room is a sanctuary — thoughtfully designed to balance restful comfort
                with the visual poetry of Marathwada's heritage.
              </p>
            </div>
          </div>

          {/* Room cards */}
          <div className="row">

            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <div className="col-md-3 col-sm-6 col-xs-12" key={i}>
                  <div className="room-card skeleton-room">
                    <div className="rf-photo skeleton-box" style={{ height: 200 }} />
                    <div className="room-body">
                      <div className="skeleton-line skeleton-line--short" />
                      <div className="skeleton-line" />
                      <div className="skeleton-line skeleton-line--med" />
                    </div>
                  </div>
                </div>
              ))
            }

            {!loading && error && (
              <div className="col-sm-12 text-center">
                <p style={{ color: '#a00', margin: '24px 0' }}>{error}</p>
                <button className="btn-forest" onClick={() => window.location.reload()}>
                  Try Again
                </button>
              </div>
            )}

            {!loading && !error && rooms.map((room, i) => (
              <div className="col-md-3 col-sm-6 col-xs-12" key={room.id}>
                <div className={`room-card fade-up fd${i + 2}`}>
                  <div className="room-photo">
                    <img src={room.img} alt={room.name} />
                    <span className="room-tag" style={room.tagStyle}>{room.tag}</span>
                  </div>
                  <div className="room-body">
                    <h3 className="room-name">{room.name}</h3>
                    <p className="room-desc">{room.desc}</p>
                    <div className="room-feats">
                      {room.feats.map((f) => (
                        <span className="room-feat" key={f}>{f}</span>
                      ))}
                    </div>
                    <div className="room-footer">
                      <div>
                        <div className="room-price"><sup>₹</sup>{room.price}</div>
                        <div className="room-price-label">per night</div>
                      </div>
                      <Link
                        href={`/rooms/${room.id}`}
                        className="sec-link"
                      >
                        Book Room
                      </Link>
                    </div>

                    {/* View Details button */}
                    <button
                      className="btn-view-details"
                      onClick={() => setModalRoom(room)}
                      style={{
                        display: 'block',
                        width: '100%',
                        marginTop: 10,
                        padding: '9px 0',
                        background: 'transparent',
                        border: '1px solid var(--forest, #2E3E31)',
                        color: 'var(--forest, #2E3E31)',
                        fontFamily: 'var(--sans, sans-serif)',
                        fontSize: 12,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        borderRadius: 2,
                        transition: 'background 0.2s, color 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--forest, #2E3E31)'
                        e.currentTarget.style.color = '#fff'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = 'var(--forest, #2E3E31)'
                      }}
                    >
                      More
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>

          {/* CTA */}
          <div className="row">
            <div className="col-sm-12 text-center" style={{ marginTop: '44px' }}>
              <Link href="/rooms" className="btn-forest fade-up">View All Rooms</Link>
            </div>
          </div>

        </div>
      </section>

      {modalRoom && (
        <RoomDetailModal
          room={modalRoom}
          onClose={() => setModalRoom(null)}
        />
      )}
    </>
  )
}