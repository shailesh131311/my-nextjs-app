import { useState, useEffect } from 'react'

export default function ScrollToTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const scrollUp = () => window.scrollTo({ top: 0, behavior: 'smooth' })

    if (!visible) return null

    return (
        <button
            onClick={scrollUp}
            style={{
                position: 'fixed',
                bottom: 10,
                right: 10,
                zIndex: 9000,
                width: 44,
                height: 44,
                background: 'var(--forest, #2E3E31)',
                color: '#fff',
                border: '2px solid var(--gold, #AC9256)',
                borderRadius: 2,
                
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                opacity: visible ? 1 : 0,
                transition: 'opacity 0.3s, background 0.2s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--gold, #AC9256)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--forest, #2E3E31)'}
            aria-label="Back to top"
        >
            <i className="fa fa-chevron-up" />
        </button>
    )
}