import { useState, useEffect } from 'react'
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

// cls sets the relative height of each photo: tall = 3 units, std / wide = 2 units
const gallery = [
    { id: 1, src: '/images/toroni-gallery-1.jpg', cls: 'tall', cat: 'The dining room' },
    { id: 2, src: '/images/toroni-gallery-2.jpg', cls: 'std', cat: 'The live counter' },
    { id: 3, src: '/images/toroni-gallery-3.jpg', cls: 'wide', cat: 'By the garden' },
    { id: 4, src: '/images/toroni-gallery-4.jpg', cls: 'std', cat: 'The spread' },
    { id: 5, src: '/images/toroni-gallery-5.jpg', cls: 'tall', cat: 'Among the plants' },
    { id: 6, src: '/images/toroni-gallery-6.jpg', cls: 'std', cat: 'Quiet corners' },
    { id: 7, src: '/images/toroni-gallery-7.jpg', cls: 'wide', cat: 'The heart of TORONI' },
    { id: 8, src: '/images/toroni-gallery-8.jpg', cls: 'tall', cat: 'Under the relief wall' },
    { id: 9, src: '/images/toroni-gallery-9.jpg', cls: 'std', cat: 'The kitchen shelves' },
    { id: 10, src: '/images/toroni-gallery-10.jpg', cls: 'wide', cat: 'Along the garden wall' },
    { id: 11, src: '/images/toroni-gallery-11.jpg', cls: 'tall', cat: 'Copper pendants' },
    { id: 12, src: '/images/toroni-gallery-12.jpg', cls: 'std', cat: 'The coffee station' },
    { id: 13, src: '/images/toroni-gallery-13.jpg', cls: 'std', cat: 'The red banquette' },
    { id: 14, src: '/images/toroni-gallery-14.jpg', cls: 'wide', cat: 'Beneath the skylights' },
    { id: 15, src: '/images/toroni-gallery-15.jpg', cls: 'tall', cat: 'The beaded lanterns' },
    { id: 16, src: '/images/toroni-gallery-16.jpg', cls: 'std', cat: 'The green banquettes' },
    { id: 17, src: '/images/toroni-gallery-17.jpg', cls: 'std', cat: 'Colour on the counter' },
    { id: 18, src: '/images/toroni-gallery-18.jpg', cls: 'wide', cat: 'Warm light, soft curtains' },
    { id: 19, src: '/images/toroni-gallery-19.jpg', cls: 'tall', cat: 'Behind the timber screen' },
    { id: 20, src: '/images/toroni-gallery-20.jpg', cls: 'std', cat: 'The garden aisle' },
    { id: 21, src: '/images/toroni-gallery-21.jpg', cls: 'std', cat: 'The green marble island' },
    { id: 22, src: '/images/toroni-gallery-22.jpg', cls: 'wide', cat: 'The main hall' },
    { id: 23, src: '/images/toroni-gallery-23.jpg', cls: 'std', cat: 'Sage and gold' },
    { id: 24, src: '/images/toroni-gallery-24.jpg', cls: 'wide', cat: 'The buffet counter' },
    { id: 25, src: '/images/toroni-gallery-25.jpg', cls: 'std', cat: 'Cane and teak' },
    { id: 26, src: '/images/toroni-gallery-26.jpg', cls: 'wide', cat: 'A private corner' },
]

// Same shape as the API photos in GallerySection
// (same order as `gallery`, so the index of a photo here = its index in the lightbox)
const lightboxImages = gallery.map((g) => ({
    id: g.id,
    src: g.src,
    alt: g.cat,
    title: g.cat,
    label: g.cat,
}))

// Relative heights: tall = 3 units, std and wide = 2 units
const UNITS = { tall: 3, std: 2, wide: 2 }

// Deals photos into columns, always adding to the shortest one,
// so every column ends at (almost) the same height
function splitColumns(items, count) {
    const cols = Array.from({ length: count }, () => ({ h: 0, items: [] }))
    items.forEach((item) => {
        const shortest = cols.reduce((a, b) => (b.h < a.h ? b : a))
        shortest.items.push(item)
        shortest.h += UNITS[item.cls] || 2
    })
    return cols.map((c) => c.items)
}

export default function Restaurant() {
    const [colCount, setColCount] = useState(4)
    const [lbIdx, setLbIdx] = useState(null)

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth
            setColCount(w <= 480 ? 1 : w <= 991 ? 2 : w <= 1200 ? 3 : 4)
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    const columns = splitColumns(gallery, colCount)

    // Lightbox controls
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

            {/* ═══ OUR STORY ═══ */}
            <section className="story-section">
                <div className="containerWrapper">
                    <div className="story-grid">

                        <div className="story-text-col">
                            <span className="sec-label">OUR STORY</span>

                            <h2 className="sec-title dark">
                                Where Cultures Meet, and Every Meal Becomes a Memory.
                            </h2>

                            <span className="sec-line" />

                            <p className="lead-text">
                                Inspired by the warmth of Indian hospitality and the timeless
                                charm of Mediterranean living, TORONI brings people together
                                through the universal love of good food.
                            </p>

                            <p className="sec-body">
                                Set within the elegant surroundings of ACASA – The Collective,
                                TORONI offers a thoughtfully curated multicuisine dining
                                experience where diverse flavours, inviting spaces and genuine
                                hospitality come together effortlessly.
                            </p>

                            <p className="sec-body" style={{ marginTop: 16 }}>
                                Whether it’s a leisurely lunch, an intimate dinner or a
                                gathering with friends and family, every visit is an opportunity
                                to discover something new, savour familiar favourites and
                                create moments worth remembering.
                            </p>

                            <p className="sec-body toroni-tagline" style={{ marginTop: 20 }}>
                                <strong>
                                    TORONI — A place to gather, savour and belong.
                                </strong>
                            </p>

                            <div style={{ marginTop: 32 }}>
                                <Link href="/contact" className="btn-forest">
                                    Reserve a Table
                                </Link>
                            </div>
                        </div>

                        <div className="story-img-col">
                            <div className="story-img-wrap toroni-story-img">
                                <img
                                    src="/images/torni-intro.jpg"
                                    alt="TORONI Restaurant dining experience"
                                />
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
                <div className="containerWrapper">
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
                <div className="containerWrapper">
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
                <div className="containerWrapper">
                    <div style={{ textAlign: 'center', marginBottom: 40 }}>
                        <span className="sec-label">A look inside</span>
                        <h2 className="sec-title dark">Come in, take a seat</h2>
                        <span className="sec-line center" />
                    </div>

                    <div className="toroni-gallery" style={{ '--cols': columns.length }}>
                        {columns.map((col, i) => (
                            <div className="toroni-gal-col" key={i}>
                                {col.map((g) => (
                                    <div
                                        className="masonry-item toroni-gal-item"
                                        key={g.src}
                                        style={{ '--u': UNITS[g.cls] || 2, cursor: 'pointer' }}
                                        onClick={() => openLb(gallery.indexOf(g))}
                                    >
                                        <img src={g.src} alt={g.cat} loading="lazy" />
                                        <div className="masonry-label">
                                            <span className="ml-cat">{g.cat}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Toran />

            {/* ═══ RESERVE ═══ */}
            <section className="enquiry-section">
                <div className="containerWrapper">
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