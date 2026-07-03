import { useEffect } from 'react'

// Named export — for: import { useFadeUp } from '../hooks/useFadeUp.js'
export function useFadeUp() {
    useEffect(() => {
        const els = document.querySelectorAll('.fade-up')

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add('in')
                }),
            { threshold: 0.12 }
        )

        els.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])
}

// Default export — for: import useFadeUp from '../hooks/useFadeUp.js'
export default useFadeUp