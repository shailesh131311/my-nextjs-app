import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import useFadeUp from '../hooks/useFadeUp'

/* ── Data ── */
const VALUES = [
    {
        icon: 'fa-landmark',
        name: 'Cultural Pride',
        desc: "Every design choice honours the living heritage of Marathwada — from our fort-arch motif to Deccan hand-crafted furnishings.",
        delay: '',
    },
    {
        icon: 'fa-heart',
        name: 'Warm Hospitality',
        desc: "Service that feels genuinely personal — anticipating needs before they are voiced, and caring long after check-out.",
        delay: 'fd2',
    },
    {
        icon: 'fa-leaf',
        name: 'Conscious Luxury',
        desc: "Elegance with intention — sourcing locally, reducing waste, and ensuring our presence uplifts the community around us.",
        delay: 'fd3',
    },
    {
        icon: 'fa-gem',
        name: 'Uncompromising Quality',
        desc: "From the thread count of our linens to the provenance of our produce — standards that never waver, in any detail.",
        delay: 'fd4',
    },
]

const TIMELINE = [
    {
        side: 'left',
        year: '2019',
        title: 'The Vision is Born',
        desc: "A group of visionaries from Marathwada come together with a singular dream — to create a hospitality landmark that the region could call its own. The site on Beed Bypass Road is chosen for its central prominence.",
        delay: '',
    },
    {
        side: 'right',
        year: '2021',
        title: 'Design & Architecture',
        desc: "The architectural concept takes shape — a modern structure that pays homage to the great fort gateways of the Marathas. Local artisans are engaged from the outset, embedding regional craft into every surface.",
        delay: 'fd2',
    },
    {
        side: 'left',
        year: '2023',
        title: 'Construction Begins',
        desc: "Ground breaks. The property rises over two years of meticulous construction, with a dedicated team ensuring that every beam, tile, and fixture upholds the founding promise of purposeful luxury.",
        delay: 'fd2',
    },
    {
        side: 'right',
        year: '2025',
        title: 'Acasa Opens Its Doors',
        desc: "Acasa — The Collective welcomes its first guests. The response is immediate and overwhelming. A new benchmark for luxury hospitality in Sambhajinagar and Marathwada has been set.",
        delay: 'fd2',
    },
]

const TEAM = [
    {
        img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
        name: 'Vikram Deshmukh',
        role: 'Founder & Managing Director',
        bio: "A Marathwada native with 20 years in luxury hospitality, Vikram's vision for Acasa is rooted in a deep love for the region's culture and a conviction that Sambhajinagar deserves a world-class destination.",
        delay: 'fd2',
    },
    {
        img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80',
        name: 'Ananya Kulkarni',
        role: 'Director of Guest Experience',
        bio: "With a background spanning The Oberoi Group and Taj Hotels, Ananya brings an unmatched eye for detail and an ethos of anticipatory service to every interaction at Acasa.",
        delay: 'fd3',
    },
    {
        img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
        name: 'Chef Rahul Pawar',
        role: 'Executive Chef',
        bio: "Rahul's culinary philosophy is simple: honour the Deccan pantry. Trained in Mumbai and Paris, he returns to his roots at Acasa — reimagining Marathwada's bold, earthy flavours for a global palate.",
        delay: 'fd4',
    },
]

const AWARDS = [
    { icon: 'fa-trophy', name: 'Best New Hotel', year: 'Maharashtra Tourism · 2025', delay: '' },
    { icon: 'fa-star', name: '5-Star Certified', year: 'Ministry of Tourism · India', delay: 'fd2' },
    { icon: 'fa-leaf', name: 'Sustainable Luxury', year: 'Green Hotels India · 2025', delay: 'fd3' },
    { icon: 'fa-utensils', name: 'Best Dining Experience', year: 'Condé Nast India · 2025', delay: 'fd4' },
    { icon: 'fa-heart', name: 'Guest Choice Award', year: 'TripAdvisor · 2025', delay: 'fd5' },
]

/* ════════════════════════════════════════
   ANIMATED COUNTER — counts up when in view
════════════════════════════════════════ */
function AnimatedCounter({ target, suffix }) {
    const [value, setValue] = useState(0)
    const ref = useRef(null)
    const triggered = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true
                    const duration = 1800
                    let startTime = null

                    function step(timestamp) {
                        if (!startTime) startTime = timestamp
                        const progress = Math.min((timestamp - startTime) / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setValue(Math.floor(eased * target))
                        if (progress < 1) requestAnimationFrame(step)
                        else setValue(target)
                    }
                    requestAnimationFrame(step)
                }
            },
            { threshold: 0.3 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [target])

    return (
        <span className="number-val" ref={ref}>
            {value}<em>{suffix}</em>
        </span>
    )
}

/* ════════════════════════════════════════
   ABOUT PAGE
════════════════════════════════════════ */
function AboutPage() {
    // Trigger hero fade-ups immediately on mount
    useEffect(() => {
        document.querySelectorAll('.page-hero .fade-up').forEach((el) =>
            el.classList.add('in')
        )
    }, [])

    // Scroll reveal for all other sections
    useFadeUp()

    return (
        <>
            {/* ═══ PAGE HERO ═══ */}
            <section className="page-hero">
                <div className="aboutpage-hero-img"></div>
                <div className="page-hero-overlay"></div>
                <div className="page-hero-content containerWrapper">
                    <h1 className="page-hero-title fade-up fd2">
                        Where Every<br />Corner Tells a Story
                    </h1>
                    <p className="page-hero-sub fade-up fd3">
                        Rooted in culture · Elevated by design
                    </p>
                </div>
            </section>

            {/* ═══ STORY SECTION ═══ */}
            <section className="story-section">
                <div className="containerWrapper">
                    <div className="story-grid">

                        {/* Left — text */}
                        <div className="story-text-col">
                            <span className="sec-label fade-up">Our Heritage</span>
                            <h2 className="sec-title dark fade-up fd2">
                                About  <em>Acasa</em>
                            </h2>
                            <span className="sec-line fade-up fd3"></span>

                            <span className="pull-quote fade-up fd3">"</span>
                            <p className="lead-text fade-up fd3">
                                At Acasa The Collective, hospitality is envisioned as an experience of calm luxury,
                                meaningful gatherings, and refined comfort. Thoughtfully designed with a contemporary
                                aesthetic and rooted in cultural elegance, Acasa offers a seamless blend of modern
                                sophistication and warm hospitality in the heart of Chhatrapati Sambhajinagar.
                            </p>

                            <p className="sec-body fade-up fd4">
                                Inspired by timeless architectural forms and elevated living, the property reflects an
                                atmosphere of understated luxury — where every space is curated to feel intimate, elegant,
                                and welcoming. From luxurious accommodations and sophisticated event venues to
                                immersive celebrations and upcoming culinary experiences, Acasa is designed to bring
                                people together through moments that feel memorable and effortless.
                            </p>

                            <div className="gold-divider fade-up fd4">
                                <i className="fa fa-diamond"></i>
                            </div>

                            <p className="sec-body fade-up fd4">
                                Home to 58 elegantly appointed rooms and suites, along with expansive banquet spaces,
                                landscaped lawns, and terrace venues, Acasa The Collective is envisioned as a destination for
                                every occasion — from grand weddings and corporate gatherings to intimate celebrations and
                                leisurely stays.
                                Guided by the philosophy of being “Rooted in Culture & Luxury,” Acasa The Collective
                                embraces modern hospitality while remaining deeply connected to warmth, detail, and
                                personalized experiences. Every stay, every gathering, and every celebration is crafted to
                                leave a lasting impression of comfort, exclusivity, and refined elegance.
                            </p>

                            <div style={{ marginTop: '36px' }} className="fade-up fd5">
                                <Link href="/#booking-bar" className="btn-forest">
                                    Begin Your Stay
                                </Link>
                            </div>
                        </div>

                        {/* Right — image */}
                        <div className="story-img-col fade-up fd3">
                            <div className="story-img-wrap">
                                <img src="/images/inner_about.jpg" alt="Acasa interior" />
                            </div>
                        </div>

                    </div>
                </div>
            </section>


            {/* ═══ VISION SECTION ═══ */}
            <section className="vision-section">
                <div className="containerWrapper">
                    <div className="vision-grid">

                        {/* Left — image / icon block */}
                        <div className="vision-img-col fade-up">
                            <div className="vision-icon-wrap">
                                <i className="fa fa-eye"></i>
                            </div>
                        </div>

                        {/* Right — text */}
                        <div className="vision-text-col">
                            <span className="sec-label fade-up">Where We Are Headed</span>
                            <h2 className="sec-title dark fade-up fd2">
                                Our <em>Vision</em>
                            </h2>
                            <span className="sec-line fade-up fd3"></span>
                            <p className="lead-text fade-up fd3">
                                To become a distinguished symbol of contemporary luxury
                                hospitality, where refined experiences, cultural elegance,
                                and meaningful celebrations come together to create
                                timeless memories.
                            </p>
                            <p className="sec-body fade-up fd4">
                                Acasa The Collective envisions redefining hospitality in
                                Chhatrapati Sambhajinagar through thoughtful design, elevated
                                service, and experiences that feel both modern and deeply
                                personal.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* ═══ MISSION SECTION ═══ */}
            <section className="mission-section">
                <div className="containerWrapper">
                    <div className="row" style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <div className="col-sm-12">
                            <span className="sec-label fade-up" style={{ color: 'rgba(172,146,86,.6)' }}>
                                What Drives Us
                            </span>
                            <h2 className="sec-title light fade-up fd2">
                                Our <em>Mission</em>
                            </h2>
                            <span className="sec-line center fade-up fd3"></span>
                            <p className="sec-body fade-up fd3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                                At Acasa The Collective, our mission is to create exceptional
                                hospitality experiences through elegant spaces, personalised
                                service, and thoughtfully curated moments.
                            </p>
                        </div>
                    </div>

                    <div className="mission-pillars">
                        <div className="mission-pillar fade-up">
                            <div className="mission-pillar-icon">
                                <i className="fa fa-bed"></i>
                            </div>
                            <div className="mission-pillar-text">
                                <h4>Luxurious Accommodations</h4>
                                <p>58 elegantly appointed rooms and suites crafted for restful, refined stays.</p>
                            </div>
                        </div>
                        <div className="mission-pillar fade-up fd2">
                            <div className="mission-pillar-icon">
                                <i className="fa fa-glass-cheers"></i>
                            </div>
                            <div className="mission-pillar-text">
                                <h4>Memorable Celebrations</h4>
                                <p>Versatile venues designed to host every milestone — from grand weddings to intimate gatherings.</p>
                            </div>
                        </div>
                        <div className="mission-pillar fade-up fd3">
                            <div className="mission-pillar-icon">
                                <i className="fa fa-briefcase"></i>
                            </div>
                            <div className="mission-pillar-text">
                                <h4>Sophisticated Events</h4>
                                <p>Contemporary spaces equipped for conferences, seminars, and curated corporate experiences.</p>
                            </div>
                        </div>
                        <div className="mission-pillar fade-up fd4">
                            <div className="mission-pillar-icon">
                                <i className="fa fa-heart"></i>
                            </div>
                            <div className="mission-pillar-text">
                                <h4>Warm, Attentive Hospitality</h4>
                                <p>Service rooted in culture, design, and modern elegance — creating comfort, exclusivity, and effortless luxury.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ NUMBERS BAR ═══ */}
            <div className="numbers-bar">
                <div className="containerWrapper" style={{ padding: '0 30px' }}>
                    <div className="numbers-inner">

                        {/* Static — no animation needed */}
                        <div className="number-item fade-up">
                            <span className="number-val">5<em>★</em></span>
                            <div className="number-lbl">Luxury Standard</div>
                        </div>

                        {/* Animated counters */}
                        <div className="number-item fade-up fd2">
                            <AnimatedCounter target={200} suffix="+" />
                            <div className="number-lbl">Guest Capacity</div>
                        </div>
                        <div className="number-item fade-up fd3">
                            <AnimatedCounter target={6} suffix="+" />
                            <div className="number-lbl">Event Venues</div>
                        </div>
                        <div className="number-item fade-up fd4">
                            <AnimatedCounter target={8} suffix="km" />
                            <div className="number-lbl">From Airport</div>
                        </div>

                        {/* Static infinity */}
                        <div className="number-item fade-up fd5">
                            <span className="number-val">∞</span>
                            <div className="number-lbl">Memories Made</div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ═══ VALUES STRIP ═══ */}
            <div className="values-strip">
                <div className="containerWrapper">
                    <div className="row" style={{ marginBottom: '48px', textAlign: 'center' }}>
                        <div className="col-sm-12">
                            <span
                                className="sec-label fade-up"
                                style={{ color: 'rgba(172,146,86,.6)' }}
                            >
                                What We Stand For
                            </span>
                            <h2 className="sec-title light fade-up fd2">
                                Our <em>Core</em> Values
                            </h2>
                            <span className="sec-line center fade-up fd3"></span>
                        </div>
                    </div>

                    <div className="values-grid">
                        {VALUES.map((v) => (
                            <div className={`value-item fade-up ${v.delay}`} key={v.name}>
                                <div className="value-icon">
                                    <i className={`fa ${v.icon}`}></i>
                                </div>
                                <div className="value-name">{v.name}</div>
                                <p className="value-desc">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ═══ HERITAGE TIMELINE ═══ */}
            <section className="heritage-section">
                <div className="containerWrapper">
                    <div className="row" style={{ textAlign: 'center', marginBottom: 0 }}>
                        <div className="col-sm-12">
                            <span className="sec-label fade-up">The Journey</span>
                            <h2 className="sec-title dark fade-up fd2">
                                Our <em>Story</em> Unfolds
                            </h2>
                            <span className="sec-line center fade-up fd3"></span>
                        </div>
                    </div>

                    <div className="timeline">
                        {TIMELINE.map((item) => (
                            <div
                                key={item.year}
                                className={`tl-item ${item.side} fade-up ${item.delay}`}
                            >
                                {item.side === 'left' ? (
                                    <>
                                        <div className="tl-content">
                                            <span className="tl-year">{item.year}</span>
                                            <h3 className="tl-title">{item.title}</h3>
                                            <p className="tl-desc">{item.desc}</p>
                                        </div>
                                        <div className="tl-dot"></div>
                                        <div className="tl-spacer"></div>
                                    </>
                                ) : (
                                    <>
                                        <div className="tl-spacer"></div>
                                        <div className="tl-dot"></div>
                                        <div className="tl-content">
                                            <span className="tl-year">{item.year}</span>
                                            <h3 className="tl-title">{item.title}</h3>
                                            <p className="tl-desc">{item.desc}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ PHILOSOPHY QUOTE ═══ */}
            <section className="philosophy-section">
                <div className="containerWrapper">
                    <div className="philosophy-inner fade-up">
                        <span className="philosophy-mark">"</span>
                        <p className="philosophy-text">
                            Rooted in Culture <em>Culture</em> & <em>Luxury </em>
                        </p>

                        <p className="value-desc">Acasa The Collective is inspired by the harmony between cultural depth and contemporary
                            sophistication. Designed with a modern architectural language and an understated sense of
                            elegance, the brand reflects a hospitality experience that is immersive, refined, and
                            welcoming.
                            Every detail — from spaces and experiences to service and ambiance — is thoughtfully
                            curated to evoke calm luxury, timeless aesthetics, and meaningful human connection.
                            Acasa is more than a destination; it is a collective of experiences designed to bring people
                            together beautifully. </p>
                        <span className="philosophy-attr">
                            <span className="philosophy-divider"></span>
                            The Founding Philosophy of Acasa
                            <span className="philosophy-divider"></span>
                        </span>
                    </div>
                </div>
            </section>





            {/* ═══ CONNECT CTA ═══ */}
            <section className="connect-section">
                <div className="containerWrapper">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                            <span className="script fade-up">Come, Stay With Us</span>
                            <h2 className="fade-up fd2">
                                Experience <em>Acasa</em> Yourself
                            </h2>
                            <p className="fade-up fd3">
                                Every story we have shared here comes alive the moment you
                                arrive. We look forward to welcoming you to Sambhajinagar —
                                and to a home that feels like it was made for you.
                            </p>
                            <div className="cta-btns fade-up fd4">
                                <Link href="/#booking-bar" className="btn-forest">
                                    Book Your Stay
                                </Link>
                                <a href="tel:+918446995333" className="btn-outline-forest">
                                    Call Us Now
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutPage