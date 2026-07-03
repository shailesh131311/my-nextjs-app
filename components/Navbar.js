import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const router = useRouter()
  const pathname = router.pathname

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false)
  }, [pathname])

  // Helper — returns the active style if this path matches current page
  function activeStyle(path) {
    if (path === '/' && pathname === '/') {
      return { color: 'var(--forest)', borderBottom: '2px solid var(--gold)' }
    }
    if (path !== '/' && pathname.startsWith(path)) {
      return { color: 'var(--forest)', borderBottom: '2px solid var(--gold)' }
    }
    return {}
  }

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Rooms & Suites', path: '/rooms' },
    { label: 'Events & Conferences', path: '/events' },
    { label: 'Experiences & Attractions', path: '/experiences' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* ═══ ANNOUNCE BAR ═══ */}
      <div className="announce-bar">
        <strong>Website Exclusive:</strong> Save 20% on direct bookings
        &nbsp;·&nbsp;
        Use code <strong>ACASA20</strong> &nbsp;·&nbsp;
        <Link href="/#booking-bar">Book Now</Link>
      </div>

      {/* ═══ NAVBAR ═══ */}
      <nav className="site-nav" id="siteNav">
        <div className="nav-top">

          {/* Logo */}
          <Link href="/" className="nav-logo">
            <img src="/images/logo.png" alt="ACASA Logo" />
          </Link>

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link href={link.path} style={activeStyle(link.path)}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>



          {/* Hamburger */}
          <div
            className="nav-hamburger"
            id="hamburger"
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        {/* Mobile drawer */}
        {drawerOpen && (
          <div className="nav-drawer" id="navDrawer">
            <ul>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <Link href="/#booking-bar" className="btn-book-nav">
              Book Your Stay
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
