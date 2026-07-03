import { useEffect } from "react";
import { useExperiences } from "../hooks/useExperiences";
import Link from "next/link";
// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useScrollReveal(dep) {
    useEffect(() => {
        const els = document.querySelectorAll(".fade-up");
        const io = new IntersectionObserver(
            (entries) =>
                entries.forEach((e) => {
                    if (e.isIntersecting) e.target.classList.add("in");
                }),
            { threshold: 0.1 }
        );
        els.forEach((el) => io.observe(el));
        document
            .querySelectorAll(".page-hero .fade-up")
            .forEach((el) => el.classList.add("in"));
        return () => io.disconnect();
    }, [dep]);
}

// ── Static data ───────────────────────────────────────────────────────────────
const capacityItems = [
    { icon: "fa fa-building", name: "Grand Ballroom", num: "Up to 500 guests" },
    { icon: "fa fa-sun", name: "Outdoor Lawn", num: "Up to 800 guests" },
    { icon: "fa fa-briefcase", name: "Conference Hall", num: "Up to 150 guests" },
    { icon: "fa fa-champagne-glasses", name: "Private Terrace", num: "Up to 80 guests" },
    { icon: "fa fa-leaf", name: "Garden Courtyard", num: "Up to 200 guests" },
];

const venues = [
    {
        num: "01", name: "The Ballroom",
        badge: "Signature Venue", badgeStyle: {},
        tagline: "Sophisticated Indoor Celebrations",
        desc: "Designed with contemporary elegance and expansive proportions, The Ballroom offers a refined indoor venue ideal for weddings, receptions, conferences, seminars, and large-scale celebrations. Featuring soaring 35-foot ceilings and thoughtfully designed interiors, the space creates an atmosphere of grandeur while maintaining warmth and sophistication.",
        img: "../images/banquet.jpg",
        capacity: 500, capacityTagStyle: {}, reverse: false,
        specs: [
            { icon: "fa fa-expand", val: " 8,078 Sq. Ft.", lbl: "Area" },
            { icon: "fa fa-users", val: "550", lbl: "Capacity" },
            { icon: "fa fa-temperature-half", val: "AC", lbl: "Climate" },
            { icon: "fa fa-lightbulb", val: "Dimmable", lbl: "Lighting" },
        ],
        features: ["Pillarless Hall", "LED Stage Lighting", "Surround Sound", "Bridal Suite Access", "Valet Parking", "In-house Catering"],
    },
    {
        num: "02", name: "Savannah Lawn",
        badge: "Open Air", badgeStyle: { background: "var(--amber)" },
        tagline: "Expansive Outdoor Elegance ",
        desc: "Set amidst open skies and landscaped surroundings, Savannah Lawn offers a versatile outdoor venue crafted for grand celebrations and elevated social experiences. Thoughtfully divided into two sections, the lawn provides flexibility for both large-scale events and more intimate gatherings, making it an ideal setting for weddings, mehendi ceremonies, receptions, concerts, and curated outdoor experiences. ",
        img: "../images/lawnbanner.png",
        capacity: 800, capacityTagStyle: { right: "24px", left: "auto", borderLeft: "none", borderRight: "2px solid var(--gold)" }, reverse: true,
        specs: [
            { icon: "fa fa-expand", val: "17,730 Sq. Ft.", lbl: "Area" },
            { icon: "fa fa-users", val: "800", lbl: "Capacity" },
            { icon: "fa fa-cloud-sun", val: "Open Air", lbl: "Setting" },
            { icon: "fa fa-tent", val: "Canopy", lbl: "Options" },
        ],
        features: ["Floral Mandap Setup", "Generator Backup", "Outdoor Catering", "Landscape Lighting", "Canopy Available", "Ample Parking"],
    },

    {
        num: "03", name: "Alfresco",
        badge: "Intimate", badgeStyle: { background: "var(--forest)" },
        tagline: "Elevated Celebrations Beneath the Open Sky",
        desc: "Alfresco is Acasa’s intimate terrace lawn venue designed for sophisticated open-air experiences and curated celebrations. Combining exclusivity with contemporary ambiance, the venue creates the perfect setting for sunset gatherings, private occasions, cocktail evenings, and intimate celebrations. ",
        img: "../images/terise-lawn.jpg",
        capacity: 80, capacityTagStyle: { right: "24px", left: "auto", borderLeft: "none", borderRight: "2px solid var(--gold)" }, reverse: false,
        specs: [
            { icon: "fa fa-expand", val: "5,600 Sq. Ft.", lbl: "Area" },
            { icon: "fa fa-users", val: "80", lbl: "Capacity" },
            { icon: "fa fa-eye", val: "City View", lbl: "Panorama" },
            { icon: "fa fa-glass-martini", val: "Bar", lbl: "Service" },
        ],
        features: ["Open Sky Canopy", "In-built Bar Counter", "Ambient Lighting", "Lounge Seating", "Private Butler", "Sound System"],
    },

    {
        num: "04", name: "DINING EXPERIENCES (Opening Soon) ",
        badge: "Business Ready", badgeStyle: {},
        tagline: "Opening Soon ",
        desc: "Acasa The Collective is set to introduce thoughtfully curated dining experiences designed to complement the spirit of contemporary luxury and refined hospitality. From elegant all-day dining and artisanal café experiences to elevated lounge and bar concepts, our upcoming culinary destinations will offer immersive spaces crafted for meaningful conversations, indulgent moments, and memorable gatherings.",
        img: "../images/aboutimg.jpg",
        capacity: 150, capacityTagStyle: {}, reverse: true,
        specs: [
            { icon: "fa fa-expand", val: "2,400 sqft", lbl: "Area" },
            { icon: "fa fa-users", val: "150", lbl: "Capacity" },
            { icon: "fa fa-display", val: "4K AV", lbl: "Display" },
            { icon: "fa fa-wifi", val: "1 Gbps", lbl: "Wi-Fi" },
        ],
        features: ["4K Projection", "Video Conferencing", "Modular Setup", "Coffee Station", "Secretarial Support", "Whiteboard"],
    },
];



const galleryImgs = [
    { src: "/images/dummy.jpg", alt: "Grand Wedding" },
    { src: "/images/dummy.jpg", alt: "Outdoor Lawn" },
    { src: "/images/dummy.jpg", alt: "Corporate" },
    { src: "/images/dummy.jpg", alt: "Birthday" },
    { src: "/images/dummy.jpg", alt: "Engagement" },
];

// Stagger delay classes cycling for grid cards
const DELAYS = ["", "fd2", "fd3", "fd2", "fd3", "fd2"];

// ── Skeleton loader for occasions ─────────────────────────────────────────────
function OccasionSkeletons() {
    return (
        <div className="occasions-grid">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="occasion-card">
                    <div
                        className="occasion-photo"
                        style={{ background: "#e8e4df", animation: "pulse 1.4s ease-in-out infinite" }}
                    />
                    <div className="occasion-body" style={{ padding: "20px 24px" }}>
                        <div style={{ height: 14, width: "50%", background: "#e8e4df", borderRadius: 4, marginBottom: 10, animation: "pulse 1.4s ease-in-out infinite" }} />
                        <div style={{ height: 10, width: "85%", background: "#e8e4df", borderRadius: 4, animation: "pulse 1.4s ease-in-out infinite" }} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function BanquetPage() {
    // Fetch only "std" layout items for this page
    const { experiences: occasions, loading, error } = useExperiences("std");

    useScrollReveal(loading); // re-run observer after data loads

    return (
        <>
            {/* ── ANNOUNCE BAR ── */}
            <div className="announce-bar">
                <strong>Website Exclusive:</strong> Save 20% on direct bookings &nbsp;·&nbsp; Use code <strong>ACASA20</strong> &nbsp;·&nbsp;{" "}
                <a href="#booking-bar">Book Now</a>
            </div>

            {/* ── PAGE HERO ── */}
            <section className="page-hero">
                <div className="page-hero-img" style={{ backgroundImage: "url('../images/lawnbanner.png')" }}></div>
                <div className="page-hero-overlay"></div>
                <div className="page-hero-content containerWrapper">
                    <div className="breadcrumb-bar fade-up">
                        <a href="index.html">Home</a>
                        <span>·</span>
                        Banquet / Events / Lawn
                    </div>
                    <h1 className="page-hero-title fade-up fd2">
                        Where Celebrations
                        <br />
                        Come Alive
                    </h1>
                    <p className="page-hero-sub fade-up fd3">6 Distinct Venues &nbsp;·&nbsp; 500+ Capacity &nbsp;·&nbsp; Heritage-Inspired Settings</p>
                </div>
            </section>

            {/* ── CAPACITY BAR ── */}
            <div className="capacity-bar">
                <div className="containerWrapper">
                    <div className="capacity-inner">
                        {capacityItems.map((item, i) => (
                            <div key={i} className={`cap-item fade-up${i > 0 ? ` fd${i + 1}` : ""}`}>
                                <i className={`${item.icon} cap-icon`}></i>
                                <div className="cap-name">{item.name}</div>
                                <div className="cap-num">{item.num}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── INTRO ── */}
            <div className="rooms-intro" style={{ background: "var(--ivory)", padding: "60px 30px", textAlign: "center", borderBottom: "1px solid #e8e0d8" }}>
                <div className="containerWrapper">
                    <span className="sec-label fade-up">Our Promise to You</span>
                    <h2 className="sec-title dark fade-up fd2" style={{ marginBottom: 16 }}>
                        Crafted for Timeless  <em>Gatherings </em>
                    </h2>
                    <span className="sec-line center fade-up fd3"></span>
                    <p className="sec-body fade-up fd3" style={{ margin: "0 auto" }}>
                        and unforgettable. From grand weddings and sophisticated corporate events to intimate
                        gatherings and social celebrations, our versatile venues are designed to host moments that
                        deserve to be remembered beautifully.
                        Blending contemporary luxury with warm hospitality, Acasa offers refined event spaces,
                        expansive outdoor venues, and personalized experiences tailored for every occasion.
                        Whether it is a wedding celebration beneath the open sky, an elevated corporate gathering, or
                        a private social event, Acasa The Collective creates the perfect setting for meaningful
                        moments and memorable experiences.
                    </p>
                </div>
            </div>

            {/* ── VENUE CARDS ── */}
            <section className="venues-section" id="venues">
                <div className="containerWrapper">
                    <div className="row" style={{ marginBottom: 52 }}>
                        <div className="col-sm-12">
                            <span className="sec-label fade-up">Our Spaces</span>
                            <h2 className="sec-title dark fade-up fd2">Signature <em>Venues</em></h2>
                            <span className="sec-line fade-up fd3"></span>
                        </div>
                    </div>

                    {venues.map((v, i) => (
                        <div key={i} className={`venue-card fade-up${i > 0 ? ` fd${(i % 4) + 2}` : ""}`}>
                            <div className={`venue-card-inner${v.reverse ? " reverse" : ""}`}>
                                <div className="vc-photo">
                                    <img src={v.img} alt={v.name} />
                                    <span className="vc-badge" style={v.badgeStyle}>{v.badge}</span>
                                    <div className="vc-capacity-tag" style={v.capacityTagStyle}>
                                        <i className="fa fa-users"></i>
                                        <div>
                                            <span className="vct-num">{v.capacity}</span>
                                            <span className="vct-lbl">Max Guests</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="vc-body">
                                    <span className="vc-num">{v.num}</span>
                                    <h3 className="vc-name">{v.name}</h3>
                                    <div className="vc-tagline">{v.tagline}</div>
                                    <p className="vc-desc">{v.desc}</p>
                                    <div className="vc-specs">
                                        {v.specs.map((s, j) => (
                                            <div key={j} className="vc-spec">
                                                <i className={s.icon}></i>
                                                <span className="vc-spec-val">{s.val}</span>
                                                <span className="vc-spec-lbl">{s.lbl}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="vc-features">
                                        {v.features.map((f, j) => (
                                            <span key={j} className="vc-feature">{f}</span>
                                        ))}
                                    </div>
                                    <div className="vc-actions">
                                        <a href="#enquiry" className="btn-forest">Enquire Now</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ══════════════════════════════════════════════════════════════════
                ── OCCASIONS SECTION — DYNAMIC (std layout only) ──
            ══════════════════════════════════════════════════════════════════ */}
            <section className="occasions-section">
                <div className="containerWrapper">
                    <div className="row" style={{ marginBottom: 0 }}>
                        <div className="col-sm-12 text-center">
                            <span className="sec-label fade-up">Perfect For</span>
                            <h2 className="sec-title dark fade-up fd2">Every <em>Occasion</em></h2>
                            <span className="sec-line center fade-up fd3"></span>
                            <p className="sec-body fade-up fd3" style={{ maxWidth: 520, margin: "0 auto" }}>
                                From milestone celebrations to professional milestones — Acasa is built for moments that matter.
                            </p>
                        </div>
                    </div>

                    {/* Loading */}
                    {loading && <OccasionSkeletons />}

                    {/* Error */}
                    {error && !loading && (
                        <div className="gal-empty show">
                            <i className="fa fa-circle-exclamation" />
                            <p className="sec-body">
                                Could not load occasions — please try again later.
                                <br />
                                <small style={{ opacity: 0.6 }}>{error}</small>
                            </p>
                        </div>
                    )}

                    {/* Loaded */}
                    {!loading && !error && (
                        <div className="occasions-grid">
                            {occasions.map((o, i) => (
                                <div
                                    key={o.id}
                                    className={`occasion-card fade-up${DELAYS[i % DELAYS.length] ? ` ${DELAYS[i % DELAYS.length]}` : ""}`}
                                >
                                    <div className="occasion-photo">
                                        <img src={o.image} alt={o.title} />
                                    </div>
                                    <div className="occasion-body">
                                        <div className="occasion-icon">
                                            <i className={o.icon}></i>
                                        </div>
                                        <div className="occasion-name">{o.title}</div>
                                        <p className="occasion-desc">{o.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── QUOTE ── */}
            <section className="quote-section">
                <div className="containerWrapper">
                    <div className="text-center fade-up">
                        <span className="quote-mark">"</span>
                        <p className="quote-text">We don't just host events.<br />We craft <em>memories</em>.</p>
                        <span className="quote-attr">
                            <span className="quote-divider"></span>
                            The Acasa Events Promise
                            <span className="quote-divider"></span>
                        </span>
                    </div>
                </div>
            </section>



            {/* ── CATERING & SERVICES ── */}
            <section className="services-section">
                <div className="containerWrapper">
                    <div className="row intro-row" style={{ alignItems: "center" }}>
                        <div className="col-md-6 col-sm-12" style={{ paddingRight: 48 }}>
                            <span className="sec-label fade-up">White Glove Service</span>
                            <h2 className="sec-title dark fade-up fd2">Catering &amp; <em>Event Services</em></h2>
                            <span className="sec-line fade-up fd3"></span>
                            {[
                                { icon: "fa fa-utensils", title: "In-house Catering", desc: "Our executive chefs craft bespoke menus spanning Maharashtrian feasts, Mughal-inspired spreads, Pan-Asian delicacies, and Continental fine dining — tailored entirely to your palate and occasion." },
                                { icon: "fa fa-wand-magic-sparkles", title: "Décor & Styling", desc: "From traditional marigold mandaps to modern minimalist tablescapes, our in-house décor team brings your aesthetic vision to life with premium florals and custom lighting installations." },
                                { icon: "fa fa-camera", title: "Photography & AV", desc: "We partner with Marathwada's finest photographers, videographers, and live performers. Our AV team ensures pristine sound, crisp visuals, and seamless technical production for every event." },
                                { icon: "fa fa-bell-concierge", title: "Dedicated Event Manager", desc: "Every booking comes with a personal event manager who is your single point of contact — from first consultation to the final curtain, ensuring nothing is left to chance." },
                            ].map((s, i) => (
                                <div key={i} className="service-item fade-up fd3">
                                    <div className="service-icon-wrap"><i className={s.icon}></i></div>
                                    <div>
                                        <div className="service-title">{s.title}</div>
                                        <p className="service-desc">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-6 col-sm-12">
                            <div className="services-img fade-up fd2">
                                <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=900&q=85" alt="Catering & Décor" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BANQUET GALLERY ── */}
            <section className="banquet-gallery" id="gallery">
                <div className="containerWrapper">
                    <div className="row">
                        <div className="col-sm-12 text-center" style={{ marginBottom: 0 }}>
                            <span className="sec-label fade-up">See the Spaces</span>
                            <h2 className="sec-title dark fade-up fd2">Event <em>Gallery</em></h2>
                            <span className="sec-line center fade-up fd3"></span>
                        </div>
                    </div>
                    <div className="bg-grid fade-up fd2">
                        {galleryImgs.map((img, i) => (
                            <div key={i} className="bg-item">
                                <img src={img.src} alt={img.alt} />
                                <div className="bg-overlay"><i className="fa fa-expand"></i></div>
                            </div>
                        ))}
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-center" style={{ marginTop: 36 }}>
                            <Link href="/gallery" className="btn-outline-forest fade-up">View Full Gallery</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ENQUIRY CTA ── */}
            <section className="enquiry-section" id="enquiry">
                <div className="containerWrapper">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 text-center">
                            <span className="script fade-up">Begin Planning</span>
                            <h2 className="fade-up fd2">Let Us Create Your <em>Perfect Event</em></h2>
                            <p className="fade-up fd3">Share your vision with our events team and we'll craft a proposal tailored to every detail — from venue to menu to décor.</p>
                            <div className="cta-btns fade-up fd4">
                                <a href="tel:+918446995333" className="btn-gold">Call Our Events Team</a>
                                <a href="mailto:events@acasa.in" className="btn-gold-outline">Email an Enquiry</a>
                            </div>
                            <p style={{ marginTop: 28, fontFamily: "var(--sans)", fontSize: 11, letterSpacing: ".18em", color: "rgba(172,146,86,.4)" }} className="fade-up fd5">
                                +91 84469 95333 &nbsp;·&nbsp; +91 77986 95666 &nbsp;·&nbsp; events@acasa.in
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── LOCATION ── */}
            <section id="location">
                <div className="row location-row" style={{ margin: 0 }}>
                    <div className="col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <div className="loc-map fade-up">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4462.766489320426!2d75.3246704742067!3d19.851613293117886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb99005fcc9a7f%3A0xb2f26f253568ba9d!2sAcasa%20The%20Collective!5e0!3m2!1sen!2sin!4v1780729673648!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Acasa The Collective Location"
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12" style={{ padding: 0 }}>
                        <div className="loc-info">
                            <span
                                className="sec-label"
                                style={{ color: "rgba(172,146,86,.6)" }}
                            >
                                Find Us
                            </span>

                            <h2
                                className="sec-title light fade-up"
                                style={{ marginBottom: 8 }}
                            >
                                At the Heart of <br />
                                <em>Sambhajinagar</em>
                            </h2>

                            <span
                                className="sec-line fade-up fd2"
                                style={{ marginBottom: 36 }}
                            ></span>

                            {[
                                {
                                    icon: "fa fa-location-dot",
                                    lbl: "Address",
                                    val: `Acasa The Collective\nGut No. 71, Jai Nagari, Plot No. 10,\nBeed Bypass Road, PWD Colony,\nCh. Sambhajinagar 431001`,
                                    delay: "fd2",
                                },
                                {
                                    icon: "fa fa-phone",
                                    lbl: "Reservations",
                                    val: `+91 77986 85666 · +91 86051 62448 · +91 88061 12300`,
                                    delay: "fd3",
                                },
                                {
                                    icon: "fa fa-envelope",
                                    lbl: "Email",
                                    val: "info@chrhospitality.com",
                                    delay: "fd4",
                                    isEmail: true,
                                },
                                {
                                    icon: "fa fa-plane",
                                    lbl: "Nearest Airport",
                                    val: "Aurangabad Airport — 8 km (~15 min)",
                                    delay: "fd5",
                                },
                                {
                                    icon: "fa fa-train",
                                    lbl: "Nearest Railway Station",
                                    val: "Chhatrapati Sambhajinagar Railway Station — 6 km (~12 min)",
                                    delay: "fd6",
                                },
                            ].map((d, i) => (
                                <div key={i} className={`loc-detail fade-up ${d.delay}`}>
                                    <div className="loc-icon-wrap">
                                        <i className={d.icon}></i>
                                    </div>

                                    <div>
                                        <div className="loc-lbl">{d.lbl}</div>

                                        <div
                                            className="loc-val"
                                            style={{ whiteSpace: "pre-line" }}
                                        >
                                            {d.isEmail ? (
                                                <a href={`mailto:${d.val}`}>{d.val}</a>
                                            ) : (
                                                d.val
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}