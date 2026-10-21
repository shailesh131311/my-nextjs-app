import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Lightbox from '../components/Lightbox'

// Pennant colours for the toran garland (brand tokens only)
const TORAN_COLORS = ['var(--gold)', 'var(--forest)', 'var(--amber)', 'var(--forest)']

function Toran() {
    return (
        <div className="toran" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
                <span key={i} style={{ background: TORAN_COLORS[i % TORAN_COLORS.length] }} />
            ))}
        </div>
    )
}

const pillars = [
    { icon: 'fa-solid fa-utensils', name: 'Shared tables', desc: 'Food is meant to be passed around, tasted together and talked about.' },
    { icon: 'fa-regular fa-comments', name: 'Lingering conversations', desc: 'No rush. Stay for one more course, one more story.' },
    { icon: 'fa-solid fa-heart', name: 'Guests are family', desc: 'Everyone who walks in is welcomed the way we would welcome our own.' },
    { icon: 'fa-solid fa-leaf', name: 'Away from the bustle', desc: 'Set apart from the city, so you can unwind and be present.' },
]

const cuisines = [
    {
        name: 'The Greek coast',
        tag: 'From Toroni',
        img: '/images/toroni-greek.jpg',
        desc: 'Sea-facing flavours inspired by the ancient coastal town that gave us our name and our spirit of hospitality.',
    },
    {
        name: 'The Indian doorway',
        tag: 'From the Toran',
        img: '/images/toroni-indian.jpg',
        desc: 'The warmth of a garlanded entrance, carried into dishes made for celebration and sharing.',
    },
    {
        name: 'Where they meet',
        tag: 'At Toroni',
        img: '/images/toroni-fusion.jpg',
        desc: 'Two traditions, one table. Familiar comfort with something unexpected beside it.',
    },
]

const gallery = [
    { id: 1, src: '/images/toroni-gallery-1.jpg', cls: 'tall', cat: 'The dining room' },
    { id: 2, src: '/images/toroni-gallery-2.jpg', cls: 'std', cat: 'The live counter' },
    { id: 3, src: '/images/toroni-gallery-3.jpg', cls: 'wide', cat: 'By the garden' },
    { id: 4, src: '/images/toroni-gallery-4.jpg', cls: 'std', cat: 'The spread' },
    { id: 5, src: '/images/toroni-gallery-5.jpg', cls: 'tall', cat: 'Among the plants' },
    { id: 6, src: '/images/toroni-gallery-6.jpg', cls: 'std', cat: 'Quiet corners' },
]

// Same shape as the API photos in GallerySection
const lightboxImages = gallery.map((g) => ({
    id: g.id,
    src: g.src,
    alt: g.cat,
    title: g.cat,
    label: g.cat,
}))

export default function Restaurant() {
    const [lbIdx, setLbIdx] = useState(null)

    const openLb = (i) => setLbIdx(i)
    const closeLb = () => setLbIdx(null)
    const prevLb = () => setLbIdx((lbIdx - 1 + lightboxImages.length) % lightboxImages.length)
    const nextLb = () => setLbIdx((lbIdx + 1) % lightboxImages.length)

    return (
        <div className="toroni-page">
            <Head>
                <title>TORONI Restaurant | ACASA</title>
                <meta
                    name="description"
                    content="TORONI is a restaurant inspired by Greek hospitality and the Indian Toran. A welcome that feels like home."
                />
            </Head>

            {/* ═══ HERO ═══ */}
            <section className="page-hero">
                <div className="toroni-hero-img" />
                <div className="page-hero-overlay" />
                <div className="page-hero-content">
                    <h1 className="page-hero-title">TORONI</h1>
                    <p className="toroni-hero-lead">A welcome that feels like home</p>
                </div>
            </section>

            <Toran />

            {/* ═══ STORY ═══ */}
            <section className="story-section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-text-col">
                            <span className="sec-label">Our name</span>
                            <h2 className="sec-title dark">Two doorways, one welcome</h2>
                            <span className="sec-line" />
                            <p className="lead-text">
                                Toroni is a coastal town in ancient Greece, known for its spirit of hospitality.
                                The Toran is the garland that hangs over an Indian doorway to say: come in.
                            </p>
                            <p className="sec-body">
                                TORONI brings the two together through the universal language of food. Tucked
                                away from the bustle of the city, it is more than a place to eat. It is a place
                                to unwind, connect and savour the moments that matter.
                            </p>
                            <p className="sec-body" style={{ marginTop: 16 }}>
                                Inspired by shared tables, long conversations and the belief that every guest
                                is family, TORONI offers hospitality that feels both familiar and extraordinary.
                            </p>
                            <div style={{ marginTop: 32 }}>
                                <Link href="/contact" className="btn-forest">Reserve a Table</Link>
                            </div>
                        </div>
                        <div className="story-img-col">
                            <div className="story-img-wrap toroni-story-img">
                                <img src="/images/toroni-story.jpg" alt="Inside the TORONI restaurant" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ PHILOSOPHY ═══ */}
            <section className="philosophy-section toroni-philosophy">
                <div className="containerWrapper">
                    <div className="philosophy-inner">
                        <span className="philosophy-mark">“</span>
                        <p className="philosophy-text">
                            Where every entrance feels like a welcome, and every meal feels like coming home.
                        </p>
                        <span className="philosophy-attr">
                            <span className="philosophy-divider" />
                            TORONI
                            <span className="philosophy-divider" />
                        </span>
                    </div>
                </div>
            </section>

            {/* ═══ WHAT WE BELIEVE ═══ */}
            <section className="values-strip">
                <div className="container">
                    <div className="values-grid">
                        {pillars.map((p) => (
                            <div className="value-item" key={p.name}>
                                <div className="value-icon"><i className={p.icon} /></div>
                                <h3 className="value-name">{p.name}</h3>
                                <p className="value-desc">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CUISINE ═══ */}
            <section className="am-grid-section">
                <div className="container">
                    <div style={{ textAlign: 'center' }}>
                        <span className="sec-label">On the table</span>
                        <h2 className="sec-title dark">Food that brings cultures together</h2>
                        <span className="sec-line center" />
                    </div>
                    <div className="am-grid">
                        {cuisines.map((c) => (
                            <article className="am-grid-card" key={c.name}>
                                <div className="am-gc-photo">
                                    <img src={c.img} alt={c.name} />
                                </div>
                                <div className="am-gc-body">
                                    <h3 className="am-gc-name">{c.name}</h3>
                                    <div className="am-gc-hours">{c.tag}</div>
                                    <p className="am-gc-desc">{c.desc}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ GALLERY ═══ */}
            <section className="gallery-section">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <span className="sec-label">A look inside</span>
                        <h2 className="sec-title dark">Come in, take a seat</h2>
                        <span className="sec-line center" />
                    </div>
                    <div className="masonry-grid">
                        {gallery.map((g, i) => (
                            <div
                                className={`masonry-item ${g.cls}`}
                                key={g.src}
                                onClick={() => openLb(i)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={g.src} alt={g.cat} />
                                <div className="masonry-label">
                                    <span className="ml-cat">{g.cat}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Toran />

            {/* ═══ RESERVE ═══ */}
            <section className="enquiry-section">
                <div className="container">
                    <span className="script">Every guest is family</span>
                    <h2>Reserve your table at TORONI</h2>
                    <p>
                        Tell us when you would like to dine and how many of you are coming.
                        We will take care of the rest.
                    </p>
                    <div className="cta-btns">
                        <Link href="/contact" className="btn-gold">Reserve a Table</Link>
                        <Link href="/contact" className="btn-outline-white">Contact Us</Link>
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lbIdx !== null && (
                <Lightbox
                    images={lightboxImages}
                    currentIdx={lbIdx}
                    onClose={closeLb}
                    onPrev={prevLb}
                    onNext={nextLb}
                />
            )}
        </div>
    )
}