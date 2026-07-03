import { useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

export default function QuoteSection() {
  const ref = useRef(null)
  useFadeUp(ref)

  return (
    <section className="quote-section" ref={ref}>
      <div className="containerWrapper">
        <div className="text-center fade-up">
          <span className="quote-mark">"</span>
          <p className="quote-text">
            Rich in <em>History.</em><br />Rich in <em>Comfort.</em>
          </p>
          <span className="quote-attr">
            <span className="quote-divider"></span>
            The Acasa Promise
            <span className="quote-divider"></span>
          </span>
        </div>
      </div>
    </section>
  )
}
