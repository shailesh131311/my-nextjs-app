import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer>
      <div className="containerWrapper">
        <div className="row footer-row">

          {/* Brand column */}
          <div className="col-md-4 col-sm-6 col-xs-12">
            <div className="footerlogo">
              <img src="/images/logo-light.png" alt="ACASA Logo" />
            </div>
            <p className="ft-tagline">Rooted in Culture &amp; Luxury</p>
            <div className="ft-social">
              <a href="https://www.instagram.com/acasa.in" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="fa-brands fa-facebook"></i>
              </a>

              <a href="https://maps.app.goo.gl/f85Ma2HqDaxaToRZ6" aria-label="Google">
                <i className="fa-brands fa-google"></i>
              </a>
            </div>
          </div>

          {/* Explore column */}
          <div className="col-md-2 col-sm-6 col-xs-12 ft-col">
            <h5>Explore</h5>
            <ul>
              <li><Link href="/about">Our Story</Link></li>
              <li><Link href="/rooms">Rooms &amp; Suites</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/amenities">Experiences &amp; Attractions</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
            </ul>
          </div>

          {/* Experiences column */}
          <div className="col-md-3 col-sm-6 col-xs-12 ft-col">
            <h5>Experiences</h5>
            <ul>
              <li><Link href="/events">Weddings</Link></li>
              <li><Link href="/events">Corporate Events</Link></li>
              <li><Link href="/events">Engagements</Link></li>
              <li><Link href="/events">Birthdays</Link></li>
              <li><Link href="/events">Get-togethers</Link></li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="col-md-3 col-sm-6 col-xs-12 ft-col">
            <h5>Contact</h5>
            <ul>
              <li>Plot No. 10, Gut No. 71</li>
              <li>Jai Nagari, Beed Bypass Road</li>
              <li>Ch. Sambhaji Nagar 431001</li>
              <li style={{ color: 'rgb(172, 146, 86)', marginTop: '8px' }}>
                <a href="mailto:info@chrhospitality.com">info@chrhospitality.com</a>
              </li>
              <li style={{ marginTop: '6px' }}>
                <a href="tel:+917798685666">+91 77986 85666</a><br /><br />
                <a href="tel:+918605162448">+91 86051 62448</a><br /><br />
                <a href="tel:+918806112300">+91 88061 12300</a><br /><br />
              </li>
            </ul>
          </div>

        </div>



        {/* Bottom bar */}
        <div className="footer-bottom">
          <p>&copy; 2026 Acasa — The Collective. All rights reserved.
            <span className="footer-legal-inline">
              <span>·</span>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <span>·</span>
              <Link href="/terms">Terms &amp; Conditions</Link>
            </span>
          </p>
          <p>
            Designed and developed by{' '}
            <a href="https://www.invictuswebsolutions.com/" target="_blank" rel="noreferrer">
              <img src="/images/copyrightlogo.png" alt="Invictus Web Solutions" />
            </a>
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer
