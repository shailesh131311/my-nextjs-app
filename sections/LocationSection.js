import { useRef } from 'react'
import { useFadeUp } from '../hooks/useFadeUp'

export default function LocationSection() {
  const ref = useRef(null)
  useFadeUp(ref)

  return (
    <section id="location" ref={ref}>
      <div className="row location-row" style={{ margin: 0 }}>

        {/* Map */}
        <div className="col-md-6 col-sm-12" style={{ padding: 0 }}>
          <div className="loc-map fade-up">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4462.766489320426!2d75.3246704742067!3d19.851613293117886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb99005fcc9a7f%3A0xb2f26f253568ba9d!2sAcasa%20The%20Collective!5e0!3m2!1sen!2sin!4v1780729673648!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "350px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Acasa The Collective Location"
            />
          </div>
        </div>

        {/* Info panel */}
        <div className="col-md-6 col-sm-12" style={{ padding: 0 }}>
          <div className="loc-info">
            <span className="sec-label" style={{ color: 'rgba(172,146,86,.6)' }}>Find Us</span>
            <h2 className="sec-title light fade-up" style={{ marginBottom: '8px' }}>
              At the Heart of<br /><em>Sambhajinagar</em>
            </h2>
            <span className="sec-line fade-up fd2" style={{ marginBottom: '36px' }}></span>

            <div className="loc-detail fade-up fd2">
              <div className="loc-icon-wrap"><i className="fa fa-location-dot"></i></div>
              <div>
                <div className="loc-lbl">Address</div>
                <div className="loc-val">
                  Acasa The Collective
                  Gut No. 71, Jai Nagari, Plot No. 10,
                  Beed Bypass Road, PWD Colony,<br />Ch. Sambhajinagar 431001
                </div>
              </div>
            </div>

            <div className="loc-detail fade-up fd3">
              <div className="loc-icon-wrap"><i className="fa fa-phone"></i></div>
              <div>
                <div className="loc-lbl">Reservations</div>
                <div className="loc-val">+91 77986 85666 · +91 86051 62448 · +91 88061 12300  </div>
              </div>
            </div>

            <div className="loc-detail fade-up fd4">
              <div className="loc-icon-wrap"><i className="fa fa-envelope"></i></div>
              <div>
                <div className="loc-lbl">Email</div>
                <div className="loc-val">
                  <a href="mailto:info@chrhospitality.com ">info@chrhospitality.com </a>
                </div>
              </div>
            </div>

            <div className="loc-detail fade-up fd5">
              <div className="loc-icon-wrap"><i className="fa fa-plane"></i></div>
              <div>
                <div className="loc-lbl">Nearest Airport</div>
                <div className="loc-val">Aurangabad Airport — 8 km (~15 min)</div>
              </div>
            </div>
            <div className="loc-detail fade-up fd6">
              <div className="loc-icon-wrap">
                <i className="fa fa-train"></i>
              </div>
              <div>
                <div className="loc-lbl">Nearest Railway Station</div>
                <div className="loc-val">
                  Chhatrapati Sambhajinagar Railway Station — 6 km (~12 min)
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
