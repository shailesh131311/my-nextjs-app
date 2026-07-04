import { useEffect } from 'react'
import Link from 'next/link'

export default function HeroSection() {
  // Trigger fade-up on mount (hero is always visible on load)
  useEffect(() => {
    const els = document.querySelectorAll('.hero .fade-up')
    els.forEach((el) => el.classList.add('in'))
  }, [])

  return (
    <section className="hero">
      <div className="hero-img"></div>
      <div className="hero-overlay"></div>
      <div className="containerWrapper hero-content">
        <div className="hero-content-inner">
          <h1 className="hero-h1 fade-up" style={{ transitionDelay: '.35s' }}>
            Rooted <br />in <em>Culture</em> &<br />Luxury
          </h1>
          <p className="hero-desc fade-up" style={{ transitionDelay: '.5s' }}>
            A  contemporary luxury destination in Chhatrapati Sambhajinagar, thoughtfully curated for
            elevated stays, timeless celebrations, and refined experiences.
          </p>
          <div className="hero-cta-row fade-up" style={{ transitionDelay: '.65s' }}>
            <a href="#booking-bar" className="btn-gold">Book Your Stay</a>
            <Link href="/rooms" className="btn-outline-white">
              Plan Your Celebration
            </Link>
          </div>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-bar"></div>
        <span>Scroll</span>
      </div>
    </section>
  )
}
