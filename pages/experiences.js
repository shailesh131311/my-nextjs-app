import Link from "next/link";
import { useEffect } from "react";

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useScrollReveal() {
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
    }, []);
}

// ── Data ──────────────────────────────────────────────────────────────────────

const quickStats = [
    { icon: "fa fa-landmark", val: "2", em: "+", lbl: "UNESCO World Heritage Sites" },
    { icon: "fa fa-route", val: "30", em: "min", lbl: "Avg. Drive from Acasa" },
    { icon: "fa fa-calendar-days", val: "12", em: "+", lbl: "Annual Festivals" },
    { icon: "fa fa-camera", val: "50", em: "+", lbl: "Historic Monuments" },
    { icon: "fa fa-users", val: "5M", em: "+", lbl: "Visitors Yearly" },
    { icon: "fa fa-star", val: "1000", em: "+", lbl: "Years of History" },
];

const featuredAttractions = [
    {
        num: "01",
        name: "Ajanta Caves",
        tag: "UNESCO World Heritage",
        tagStyle: {},
        badge: "~110 km · 2 hrs",
        badgeStyle: {},
        // Real photo: panoramic view of Ajanta cave horseshoe cliff — Prajwal Vedpathak on Unsplash
        img: "../../images/ajanta.jpg",
        imgAlt: "Ajanta Caves panoramic view",
        tagline: "Rock-Cut Buddhist Monuments · 2nd Century BCE – 6th Century CE",
        desc: "A constellation of 30 rock-cut Buddhist cave monuments carved into a horseshoe-shaped cliff, Ajanta is among the finest surviving examples of ancient Indian art. The caves house breathtaking murals and sculptures depicting the life of the Buddha and Jataka tales — a pilgrimage for art lovers and history enthusiasts alike.",
        highlights: [
            "30 caves spanning 700+ years of Buddhist art",
            "Exquisite frescoes considered the finest in Asia",
            "Cave 1 & 2: masterpiece narrative paintings",
            "Cave 26: magnificent reclining Buddha",
            "UNESCO World Heritage Site since 1983",
            "Best visited Oct – Mar for pleasant weather",
        ],
        specs: [
            { icon: "fa fa-car", val: "~110 km", lbl: "Distance" },
            { icon: "fa fa-clock", val: "2 hrs", lbl: "Ideal Visit" },
            { icon: "fa fa-sun", val: "Tue–Sun", lbl: "Open Days" },
        ],
        reverse: false,
    },
    {
        num: "02",
        name: "Ellora Caves",
        tag: "UNESCO World Heritage",
        tagStyle: { left: "auto", right: 24 },
        badge: "~32 km · 40 min",
        badgeStyle: { left: "auto", right: 24, borderLeft: "none", borderRight: "2px solid var(--gold)" },
        // Real photo: Kailasa Temple, Ellora — Getty Images on Unsplash (ID: Vk6saiQxG9Y)
        img: "../../images/ellora.jpg",
        imgAlt: "Kailasa Temple Ellora Caves",
        tagline: "Buddhist · Hindu · Jain Caves · 6th – 11th Century CE",
        desc: "Ellora is where three great religions coexist in stone — 34 monasteries and temples carved directly into the Charanandri Hills represent Buddhism, Hinduism, and Jainism in remarkable harmony. The Kailasa Temple (Cave 16), a monolithic rock-cut marvel dedicated to Lord Shiva, remains one of the greatest architectural achievements in human history.",
        highlights: [
            "34 caves representing 3 religions",
            "Kailasa Temple — world's largest rock-cut structure",
            "Intricate carvings spanning 500+ years",
            "Buddhist Viharas, Hindu Temples, Jain Shrines",
            "UNESCO World Heritage Site since 1983",
            "Evening light-and-sound show available",
        ],
        specs: [
            { icon: "fa fa-car", val: "~32 km ", lbl: "Distance" },
            { icon: "fa fa-clock", val: "40 min", lbl: "Ideal Visit" },
            { icon: "fa fa-sun", val: "Tue–Sun", lbl: "Open Days" },
        ],
        reverse: true,
    },
    {
        num: "03",
        name: "Bibi Ka Maqbara",
        tag: "City Monument",
        tagStyle: {},
        badge: "~8 km · 15 min",
        badgeStyle: {},
        // Real photo: Bibi Ka Maqbara — Frank Holleman on Unsplash (ID: -WCC2s8IrU4)
        img: "../../images/Bibi-Ka-Maqbara.jpg",
        imgAlt: "Bibi Ka Maqbara Aurangabad",
        tagline: "Mughal Architecture · 1678 CE · 'Taj of the Deccan'",
        desc: "Built by Mughal prince Azam Shah in memory of his mother Dilras Banu Begum, Bibi Ka Maqbara echoes the grandeur of its inspiration — the Taj Mahal. Known as the 'Taj of the Deccan,' this elegant mausoleum stands amid formal Mughal gardens and reflects the twilight of Mughal architectural brilliance, right in the heart of Sambhajinagar.",
        highlights: [
            "Built in 1678 CE by Mughal prince Azam Shah",
            "Iconic four-minareted white marble façade",
            "Formal char-bagh Mughal gardens",
            "Stunning at sunrise and sunset",
            "Just 10 minutes from Acasa",
            "Beautiful illumination at night",
        ],
        specs: [
            { icon: "fa fa-car", val: "~8 km", lbl: "Distance" },
            { icon: "fa fa-clock", val: "15 min", lbl: "Ideal Visit" },
            { icon: "fa fa-sun", val: "Daily", lbl: "Open Days" },
        ],
        reverse: false,
    },
    {
        num: "04",
        name: "Daulatabad Fort",
        tag: "Medieval Fortress",
        tagStyle: { left: "auto", right: 24, background: "var(--amber, #b8860b)" },
        badge: "~22 km · 30 min",
        badgeStyle: { left: "auto", right: 24, borderLeft: "none", borderRight: "2px solid var(--gold)" },
        // Real photo: hilltop Indian fort — Unsplash thematic (Mehmet Turgut Kirkgoz)
        img: "../../images/fort.jpg",
        imgAlt: "Daulatabad Fort hilltop",
        tagline: "14th Century Citadel · Hilltop Fortifications · Panoramic Views",
        desc: "Perched atop a 200-metre conical hill, Daulatabad Fort is one of the most formidable medieval fortresses in India. Its ingenious multi-layered defences — including a moat, pitch-dark labyrinthine passages, and the iconic Chand Minar — made it virtually impregnable. Climbing to the summit rewards you with sweeping panoramas of the Deccan plateau.",
        highlights: [
            "Built atop a 200m natural rock hill",
            "Legendary pitch-dark 'andher' tunnel defence",
            "Chand Minar — 63m victory tower",
            "Seven rings of fortification",
            "Stunning 360° views from the summit",
            "En route to Ellora — easy combined visit",
        ],
        specs: [
            { icon: "fa fa-car", val: "~22 km", lbl: "Distance" },
            { icon: "fa fa-clock", val: "30 min", lbl: "Ideal Visit" },
            { icon: "fa fa-sun", val: "Daily", lbl: "Open Days" },
        ],
        reverse: true,
    },

    {
        num: "05",
        name: "Bhadra Marut Temple",
        tag: "Sacred Shrine",
        tagStyle: {},
        badge: "~30 km · 35 min",
        badgeStyle: {},
        img: "../../images/maruti.jpg",
        imgAlt: "Bhadra Marut Temple Sambhajinagar",
        tagline: "Ancient Hanuman Shrine · Fierce Bhadra Form · Living Pilgrimage",
        desc: "One of Sambhajinagar's most revered spiritual landmarks, the Bhadra Marut Temple enshrines Lord Hanuman in his powerful Bhadra Marut form. An ancient site of deep local devotion, the temple draws thousands of pilgrims every week and is particularly vibrant on Tuesdays and Saturdays — filling the air with chants, fragrance of marigolds, and the timeless rhythm of ritual.",
        highlights: [
            "Ancient temple of immense local significance",
            "Lord Hanuman in the rare Bhadra Marut form",
            "Especially vibrant on Tuesdays & Saturdays",
            "Surrounded by bustling temple bazaar",
            "A living centre of daily devotion & community",
            "Just 10 minutes from Acasa",
        ],
        specs: [
            { icon: "fa fa-car", val: "~30 km ", lbl: "Distance" },
            { icon: "fa fa-clock", val: "35 min", lbl: "Ideal Visit" },
            { icon: "fa fa-sun", val: "Daily", lbl: "Open Days" },
        ],
        reverse: false,
    },
];

const nearbyGems = [
    {
        // Real photo: Panchakki water mill / dargah pond — thematic Unsplash water mill
        img: "../../images/water-mill.jpg",
        name: "Panchakki Water Mill",
        dist: "3 km",
        desc: "A 17th-century marvel — a water mill powered by an underground channel, set within a dargah complex of immense spiritual significance.",
        delay: "",
    },
    {
        // Real photo: lush Indian garden / botanical — Unsplash
        img: "../../images/zoo.jpg",
        name: "Siddharth Garden & Zoo",
        dist: "4 km",
        desc: "A verdant public garden featuring a small zoo and a replica of the Ajanta caves — perfect for a leisurely morning with family.",
        delay: "fd2",
    },
    {
        // Real photo: Ajanta/Aurangabad rock-cut caves exterior — Setu Chhaya on Unsplash
        img: "../../images/caves.jpg",
        name: "Aurangabad Caves",
        dist: "6 km",
        desc: "Lesser-known but strikingly beautiful — these rock-cut Buddhist caves from the 6th–7th century CE feature remarkable sculptures and a tranquil hilltop setting.",
        delay: "fd3",
    },
    {
        // Real photo: Hindu temple Shiva lingam / jyotirlinga — Unsplash India temple
        img: "../../images/temple.jpg",
        name: "Grishneshwar Jyotirlinga",
        dist: "~32 km",
        desc: "One of the 12 sacred Jyotirlinga shrines of Lord Shiva, adjacent to the Ellora Caves — an essential spiritual stop on the Ellora circuit.",
        delay: "fd2",
    },
    {
        // Real photo: serene lake birds India — Unsplash
        img: "../../images/lake.jpg",
        name: "Salim Ali Lake",
        dist: "8 km",
        desc: "A serene bird sanctuary and lake named after India's celebrated ornithologist — a peaceful retreat for nature lovers and early morning walkers.",
        delay: "fd3",
    },
    {
        // Real photo: botanical garden ancient trees India — Unsplash
        img: "../../images/bagg.jpg",
        name: "Himayat Bagh",
        dist: "2 km",
        desc: "A sprawling botanical garden originally planted during the Nizam era — home to rare plant species, ancient trees, and a beloved agricultural research station.",
        delay: "fd2",
    },
];


// ── Component ─────────────────────────────────────────────────────────────────
export default function EventsAttractionsPage() {
    useScrollReveal();

    return (
        <>
            {/* ── ANNOUNCE BAR ── */}
            <div className="announce-bar">
                <strong>Website Exclusive:</strong> Save 20% on direct bookings &nbsp;·&nbsp; Use code{" "}
                <strong>ACASA20</strong> &nbsp;·&nbsp;{" "}
                <a href="index.html#booking-bar">Book Now</a>
            </div>

            {/* ── PAGE HERO ── */}
            <section className="page-hero">
                <div
                    className="page-hero-img"
                    style={{
                        // Real hero: Ajanta Caves panoramic cliff face — Prajwal Vedpathak on Unsplash
                        backgroundImage:
                            "url('../../images/heritage-banner.jpg')",
                    }}
                />
                <div className="page-hero-overlay" />
                <div className="page-hero-content containerWrapper">
                    <div className="breadcrumb-bar fade-up">
                        <a href="index.html">Home</a>
                        <span>·</span>
                        Events &amp; Attractions
                    </div>
                    <h1 className="page-hero-title fade-up fd2">
                        Discover the Soul of<br />
                        Sambhajinagar
                    </h1>
                    <p className="page-hero-sub fade-up fd3">
                        UNESCO Heritage Caves &nbsp;·&nbsp; Mughal Monuments &nbsp;·&nbsp; Medieval Forts &nbsp;·&nbsp; Cultural Festivals
                    </p>
                </div>
            </section>

            {/* ── QUICK STATS BAR ── */}
            <div className="facts-bar">
                <div className="containerWrapper">
                    <div className="facts-inner">
                        {quickStats.map((f, i) => (
                            <div
                                key={i}
                                className={`fact-item fade-up${i > 0 ? ` fd${Math.min(i + 1, 5)}` : ""}`}
                            >
                                <i className={`${f.icon} fact-icon`} />
                                <span className="fact-val">
                                    {f.val}
                                    {f.em && <em>{f.em}</em>}
                                </span>
                                <div className="fact-lbl">{f.lbl}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── INTRO STRIP ── */}
            <div style={{ background: "var(--ivory)", padding: "60px 30px", textAlign: "center", borderBottom: "1px solid #e8e0d8" }}>
                <div className="containerWrapper">
                    <span className="sec-label fade-up">Gateway to the Deccan</span>
                    <h2 className="sec-title dark fade-up fd2" style={{ marginBottom: 16 }}>
                        A City Built on <em>Centuries</em>
                    </h2>
                    <span className="sec-line center fade-up fd3" />
                    <p className="sec-body fade-up fd3" style={{ maxWidth: 660, margin: "0 auto" }}>
                        Chhatrapati Sambhajinagar — formerly Aurangabad — is one of India's most historically rich cities. Home to two UNESCO World Heritage Sites, majestic Mughal monuments, and impregnable medieval forts, it is the perfect base for exploring the living history of the Deccan plateau. Acasa places you at the heart of it all.
                    </p>
                </div>
            </div>

            {/* ── FEATURED ATTRACTIONS ── */}
            <section className="section" id="attractions" style={{ paddingBottom: 20 }}>
                <div className="containerWrapper">
                    <div className="row" style={{ marginBottom: 52 }}>
                        <div className="col-sm-12">
                            <span className="sec-label fade-up">Must-See Destinations</span>
                            <h2 className="sec-title dark fade-up fd2">
                                Iconic <em>Attractions</em>
                            </h2>
                            <span className="sec-line fade-up fd3" />
                        </div>
                    </div>

                    {featuredAttractions.map((a, i) => (
                        <div
                            key={i}
                            className={`amenity-featured${a.reverse ? " reverse" : ""} fade-up`}
                            style={{ marginBottom: 6 }}
                        >
                            <div className="af-photo">
                                <img src={a.img} alt={a.imgAlt} />
                                <span className="af-tag" style={a.tagStyle}>{a.tag}</span>
                                <div className="af-hours-badge" style={a.badgeStyle}>
                                    <i className="fa fa-car" />
                                    <div>
                                        <span className="afh-val">{a.badge.split("·")[0].trim()}</span>
                                        <span className="afh-lbl">{a.badge.split("·")[1]?.trim()}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="af-body">
                                <span className="af-num">{a.num}</span>
                                <h3 className="af-name">{a.name}</h3>
                                <div className="af-tagline">{a.tagline}</div>
                                <p className="af-desc">{a.desc}</p>
                                <ul className="af-highlights">
                                    {a.highlights.map((h, j) => (
                                        <li key={j}><i className="fa fa-check" /> {h}</li>
                                    ))}
                                </ul>
                                <div className="af-specs">
                                    {a.specs.map((s, j) => (
                                        <div key={j} className="af-spec">
                                            <i className={s.icon} />
                                            <span className="af-spec-val">{s.val}</span>
                                            <span className="af-spec-lbl">{s.lbl}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <a
                                        href={`https://www.google.com/maps/search/${encodeURIComponent(a.name + " Chhatrapati Sambhajinagar Maharashtra")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-forest"
                                    >
                                        <i className="fa fa-map-location-dot" style={{ marginRight: 8 }} />
                                        Get Directions
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>




            {/* ── NEARBY GEMS GRID ── */}
            <section className="am-grid-section">
                <div className="containerWrapper">
                    <div className="row" style={{ marginBottom: 0 }}>
                        <div className="col-sm-12 text-center">
                            <span className="sec-label fade-up">Hidden &amp; Beloved</span>
                            <h2 className="sec-title dark fade-up fd2">
                                More to <em>Explore</em>
                            </h2>
                            <span className="sec-line center fade-up fd3" />
                        </div>
                    </div>

                    <div className="am-grid">
                        {nearbyGems.map((g, i) => (
                            <div key={i} className={`am-grid-card fade-up${g.delay ? ` ${g.delay}` : ""}`}>
                                <div className="am-gc-photo">
                                    <img src={g.img} alt={g.name} />
                                    <div
                                        className="am-gc-icon-pill"
                                        style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, fontFamily: "var(--sans)", letterSpacing: "0.05em" }}
                                    >
                                        {g.dist}
                                    </div>
                                </div>
                                <div className="am-gc-body">
                                    <div className="am-gc-name">{g.name}</div>
                                    <p className="am-gc-desc">{g.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ── QUOTE ── */}
            <section className="quote-section">
                <div className="containerWrapper">
                    <div className="text-center fade-up">
                        <p className="philosophy-text">
                            Where <em>History</em> Meets <em>Hospitality</em>
                        </p>
                        <p className="value-desc">
                            Sambhajinagar is not merely a city — it is a living museum, where every lane holds a story, every hill a fortress, and every cave a masterwork of human devotion. At Acasa, we believe that the finest luxury is the ability to step out your door and into a thousand years of civilisation. Our concierge team is here to make every excursion as seamless and unforgettable as your stay.
                        </p>
                        <span className="philosophy-attr">
                            <span className="philosophy-divider" />
                            The Acasa Ethos — Rooted in Place
                            <span className="philosophy-divider" />
                        </span>
                    </div>
                </div>
            </section>

            {/* ── CONCIERGE CTA ── */}
            <section className="cta-strip">
                <div className="containerWrapper">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 text-center">
                            <span className="script fade-up">Plan Your Journey</span>
                            <h2 className="fade-up fd2">
                                Let Our Concierge <em>Curate Your Day</em>
                            </h2>
                            <p className="fade-up fd3">
                                From private guided tours of Ajanta &amp; Ellora to sunset sundowners at Daulatabad — our team handles every detail so you can simply be present.
                            </p>
                            <div className="cta-btns fade-up fd4">
                                <a href="tel:+918446995333" className="btn-forest">
                                    <i className="fa fa-phone" style={{ marginRight: 8 }} />
                                    Call Concierge
                                </a>
                                <Link href="/rooms" className="btn-outline-forest">
                                    Book Your Stay
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    );
}