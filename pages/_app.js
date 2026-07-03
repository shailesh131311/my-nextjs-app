import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import ScrollToTopButton from '../components/ScrollToTop'

// TODO: point these at your actual global stylesheets once you share the css/ folder.
import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// ── Scroll to top on every route change ──────────────────────────────────────
function useScrollToTopOnRouteChange() {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])
}

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  useScrollToTopOnRouteChange()

  useEffect(() => {
    const start = () => setLoading(true)
    const done = () => {
      // mirrors the old 1500ms minimum-display timeout
      setTimeout(() => setLoading(false), 1000)
    }
    router.events.on('routeChangeStart', start)
    router.events.on('routeChangeComplete', done)
    router.events.on('routeChangeError', done)
    return () => {
      router.events.off('routeChangeStart', start)
      router.events.off('routeChangeComplete', done)
      router.events.off('routeChangeError', done)
    }
  }, [router.events])

  return (
    <>
      <Loader visible={loading} />
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
