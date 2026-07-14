import { useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

export default function CtaStrip() {
  const ref = useRef(null)
  useFadeUp(ref)

  return (
    <section className="cta-strip" ref={ref}>
      <div className="containerWrapper">
        <div className="row">
          <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 text-center">
            <span className="script fade-up">Begin Your Story</span>
            <h2 className="fade-up fd2">Reserve Your Stay at <em>Acasa</em></h2>
            <p className="fade-up fd3">
              Every visit is a chapter in a larger story — one of culture, warmth,
              and the quiet luxury of feeling truly at home.
            </p>
            <div className="cta-btns fade-up fd4">
              <a href="https://bookings.resavenue.com/engine-ibe/search?regCode=TTEC0622" className="btn-forest">Book Direct</a>
              <a href="tel:+918446995333" className="btn-outline-forest">Call Us Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
