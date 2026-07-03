import { useEffect } from 'react'

export default function Lightbox({ images, currentIdx, onClose, onPrev, onNext }) {
  // Lock body scroll + keyboard navigation
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }

    window.addEventListener('keydown', handler)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [onClose, onNext, onPrev])

  const img = images[currentIdx]

  return (
    <div
      className="lb-backdrop lb-open"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button className="lb-close" onClick={onClose}>
        <i className="fa fa-xmark"></i>
      </button>
      <button className="lb-arrow lb-prev" onClick={onPrev}>
        <i className="fa fa-chevron-left"></i>
      </button>
      <button className="lb-arrow lb-next" onClick={onNext}>
        <i className="fa fa-chevron-right"></i>
      </button>
      <div className="lb-stage">
        <img className="lb-img" src={img.src} alt={img.alt} />
      </div>
      <div className="lb-caption">{img.alt}</div>
      <div className="lb-counter">
        {currentIdx + 1} / {images.length}
      </div>
    </div>
  )
}
