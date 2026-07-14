import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import BASE_URL from "../../services/config";

// ─────────────────────────────────────────────────────────────────────────────
// API
// ─────────────────────────────────────────────────────────────────────────────

async function fetchRoomByIdAPI(roomId) {
    try {
        const res = await fetch(`${BASE_URL}/api/rooms/${roomId}/`);
        if (res.ok) {
            const json = await res.json();
            if (json.status) return json.data;
        }
    } catch (_) { /* fall through */ }

    const res = await fetch(`${BASE_URL}/api/rooms/`);
    const json = await res.json();
    if (!json.status) throw new Error(json.message || "Failed to fetch rooms");
    const found = json.data.find((r) => String(r.id) === String(roomId));
    if (!found) throw new Error(`Room ${roomId} not found`);
    return found;
}

// ─────────────────────────────────────────────────────────────────────────────
// NORMALISER
// ─────────────────────────────────────────────────────────────────────────────

function normaliseRoom(r) {
    const details = r.room_details || {};
    const images = r.images || [];
    const amenities = r.amenities || [];
    const rawPrice = r.selling_price || r.mrp || 0;
    const price = parseFloat(rawPrice) || 0;

    const specs = [
        details.room_size && { icon: "fa-ruler-combined", val: details.room_size.trim(), lbl: "Room Size" },
        details.bed_type && { icon: "fa-bed", val: details.bed_type.trim(), lbl: "Bed Type" },
        details.max_occupancy && { icon: "fa-user-group", val: details.max_occupancy.trim(), lbl: "Guests" },
        details.view && { icon: "fa-building", val: details.view.trim(), lbl: "View" },
        details.floor && { icon: "fa-layer-group", val: details.floor.trim(), lbl: "Location" },
    ].filter(Boolean);

    const normalisedAmenities = amenities.map((a) => ({
        icon: a.icon ? a.icon.replace(/fa-solid\s+|fa-regular\s+|fa-brands\s+/g, "").trim() : "fa-star",
        text: a.name?.trim() || "",
    }));

    const photos = images.length
        ? images.map((img) => ({ src: img.image, alt: img.alt_text || r.room_type || "Room" }))
        : [{ src: "", alt: r.room_type || "Room" }];

    return {
        id: String(r.id),
        name: r.room_type?.trim() || "Room",
        category: r.room_type?.trim() || "Room",
        price,
        priceDisplay: price ? `₹${price.toLocaleString("en-IN")}` : "—",
        mrp: r.mrp,
        selling_price: r.selling_price,
        lead: r.title?.trim() || "",
        desc1: r.description?.trim() || "",
        desc2: details.additional_description?.trim() || "",
        specs,
        amenities: normalisedAmenities,
        photos,
        reviews: r.reviews || [],
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────────────────────────────────────

function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".fade-up");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
            { threshold: 0.08 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    });
}

// ─────────────────────────────────────────────────────────────────────────────
// STARS
// ─────────────────────────────────────────────────────────────────────────────

function Stars({ count }) {
    return (
        <span>
            {Array.from({ length: 5 }).map((_, i) => (
                <i key={i} className="fa fa-star"
                    style={{ color: i < count ? "var(--gold)" : "#ddd", fontSize: 12, marginRight: 2 }} />
            ))}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────

function Lightbox({ photos, startIndex, onClose }) {
    const [cur, setCur] = useState(startIndex);
    const [anim, setAnim] = useState({ x: "0%", opacity: 1 });

    const slide = useCallback((dir) => {
        const total = photos.length;
        const next = (cur + (dir === "next" ? 1 : -1) + total) % total;
        setAnim({ x: dir === "next" ? "-100%" : "100%", opacity: 0 });
        setTimeout(() => {
            setCur(next);
            setAnim({ x: dir === "next" ? "100%" : "-100%", opacity: 0 });
            setTimeout(() => setAnim({ x: "0%", opacity: 1 }), 20);
        }, 380);
    }, [cur, photos.length]);

    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") slide("next");
            if (e.key === "ArrowLeft") slide("prev");
        };
        document.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose, slide]);

    return (
        <div className="lb-backdrop lb-open" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <button className="lb-close" onClick={onClose}><i className="fa fa-xmark" /></button>
            <button className="lb-arrow lb-prev" onClick={() => slide("prev")}><i className="fa fa-chevron-left" /></button>
            <button className="lb-arrow lb-next" onClick={() => slide("next")}><i className="fa fa-chevron-right" /></button>
            <div
                className="lb-stage"
                style={{
                    transform: `translateX(${anim.x})`,
                    opacity: anim.opacity,
                    transition: "transform .4s cubic-bezier(.77,0,.18,1), opacity .4s",
                }}
            >
                {photos[cur].src
                    ? <img className="lb-img" src={photos[cur].src} alt={photos[cur].alt} />
                    : <div style={{ color: "#fff", textAlign: "center", padding: 40 }}>No image available</div>
                }
            </div>
            <div className="lb-caption">{photos[cur].alt}</div>
            <div className="lb-counter">{cur + 1} / {photos.length}</div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// POLICIES
// ─────────────────────────────────────────────────────────────────────────────

const POLICIES = [
    { icon: "fa-clock", title: "Check-in / Check-out", desc: "Check-in from 2:00 PM · Check-out by 12:00 noon. Early check-in and late check-out subject to availability." },
    { icon: "fa-ban", title: "Cancellation Policy", desc: "Free cancellation up to 48 hours before arrival. Cancellations within 48 hours attract one night's charge." },
    { icon: "fa-child", title: "Children & Extra Beds", desc: "Children under 5 stay free. Extra mattresses and cribs available on request, subject to availability." },
    { icon: "fa-paw", title: "Pet Policy", desc: "We welcome well-behaved pets in selected room categories with prior arrangement. Contact our concierge." },
];

// ─────────────────────────────────────────────────────────────────────────────
// LOADING SKELETON
// ─────────────────────────────────────────────────────────────────────────────

function DetailSkeleton() {
    return (
        <div style={{ padding: "40px 0" }}>
            <div className="room-hero skeleton-box" style={{ height: 480, background: "#e8e0d8" }} />
            <div className="detail-layout" style={{ marginTop: 40 }}>
                <div className="dl-desc dt-section">
                    <div className="skeleton-line" style={{ width: "60%", height: 24, marginBottom: 16 }} />
                    <div className="skeleton-line" style={{ marginBottom: 10 }} />
                    <div className="skeleton-line" style={{ marginBottom: 10 }} />
                    <div className="skeleton-line skeleton-line--med" />
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function RoomDetailPage() {
    const router = useRouter();

    const { id: roomId } = router.query;

    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPhoto, setCurrentPhoto] = useState(0);
    const [imgStyle, setImgStyle] = useState({ opacity: 1, transform: "scale(1)" });
    const autoRef = useRef(null);

    const [lbOpen, setLbOpen] = useState(false);
    const [lbStart, setLbStart] = useState(0);

    const [stickyVisible, setStickyVisible] = useState(false);
    const heroRef = useRef(null);

    useScrollReveal();

    // ── Fetch room by id ──────────────────────────────────────────────────────
    useEffect(() => {
        // router.query is empty on the very first render until Next.js hydrates
        // the route — wait for it instead of bouncing to /rooms prematurely.
        if (!router.isReady) return;

        if (!roomId) {
            router.replace("/rooms");
            return;
        }

        let cancelled = false;
        setLoading(true);
        setCurrentPhoto(0);

        fetchRoomByIdAPI(roomId)
            .then((data) => {
                if (cancelled) return;
                setRoom(normaliseRoom(data));
            })
            .catch((err) => {
                if (cancelled) return;
                console.error("[RoomDetail API]", err);
                setError("Unable to load room details. Please try again.");
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => { cancelled = true; };
    }, [router.isReady, roomId]);

    // ── Sticky bar ────────────────────────────────────────────────────────────
    useEffect(() => {
        const handleScroll = () => {
            if (heroRef.current) {
                setStickyVisible(heroRef.current.getBoundingClientRect().bottom < 76);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ── Slideshow ─────────────────────────────────────────────────────────────
    const goToPhoto = useCallback((idx, dir = "next") => {
        if (!room) return;
        const total = room.photos.length;
        const next = (idx + total) % total;
        setImgStyle({ opacity: 0, transform: dir === "next" ? "scale(1.04) translateX(-10px)" : "scale(1.04) translateX(10px)", transition: "opacity .45s ease, transform .45s ease" });
        setTimeout(() => {
            setCurrentPhoto(next);
            setImgStyle({ opacity: 1, transform: "scale(1)", transition: "opacity .45s ease, transform .45s ease" });
        }, 220);
    }, [room]);

    useEffect(() => {
        if (!room) return;
        autoRef.current = setInterval(() => goToPhoto(currentPhoto + 1, "next"), 8000);
        return () => clearInterval(autoRef.current);
    }, [currentPhoto, goToPhoto, room]);

    const pauseAuto = () => clearInterval(autoRef.current);
    const resumeAuto = () => {
        if (!room) return;
        autoRef.current = setInterval(() => goToPhoto(currentPhoto + 1, "next"), 5000);
    };

    const heroTouchX = useRef(0);
    const handleHeroTouchStart = (e) => { heroTouchX.current = e.changedTouches[0].clientX; };
    const handleHeroTouchEnd = (e) => {
        const dx = e.changedTouches[0].clientX - heroTouchX.current;
        if (Math.abs(dx) > 50) dx < 0 ? goToPhoto(currentPhoto + 1, "next") : goToPhoto(currentPhoto - 1, "prev");
    };

    // ── Render states ─────────────────────────────────────────────────────────

    if (loading) return <DetailSkeleton />;

    if (error) {
        return (
            <div style={{ padding: "80px 24px", textAlign: "center" }}>
                <i className="fa fa-triangle-exclamation" style={{ fontSize: 40, color: "var(--gold)", marginBottom: 16 }} />
                <p style={{ marginBottom: 24 }}>{error}</p>
                <button className="btn-gold" onClick={() => router.push("/rooms")}>Back to Rooms</button>
            </div>
        );
    }

    if (!room) return null;

    const R = room;

    // Full-width fallback style so sections stretch even if .detail-layout's
    // CSS still has a 2-column (content + sidebar) grid defined somewhere.
    const fullWidthStyle = { gridColumn: "1 / -1", width: "100%" };

    return (
        <>
            {/* ── ANNOUNCE BAR ── */}
            <div className="announce-bar">
                <strong>Website Exclusive:</strong> Save 20% on direct bookings &nbsp;·&nbsp; Use code <strong>ACASA20</strong> &nbsp;·&nbsp;{" "}
                <a href="https://acasanextapp.netlify.app/">Book Now</a>
            </div>

            {/* ── STICKY BAR ── */}
            {stickyVisible && (
                <div className="sticky-book-bar">
                    <span className="sbb-name">{R.name}</span>
                    <span className="sbb-price">{R.priceDisplay} <small>/ night</small></span>
                    <a href="https://acasanextapp.netlify.app/" className="sbb-btn">Reserve Now</a>
                </div>
            )}

            {/* ── HERO ── */}
            <section
                className="room-hero"
                ref={heroRef}
                onMouseEnter={pauseAuto}
                onMouseLeave={resumeAuto}
                onTouchStart={handleHeroTouchStart}
                onTouchEnd={handleHeroTouchEnd}
            >
                {R.photos[currentPhoto].src ? (
                    <img
                        className="hero-main-img loaded"
                        src={R.photos[currentPhoto].src}
                        alt={R.photos[currentPhoto].alt}
                        style={imgStyle}
                    />
                ) : (
                    <div className="hero-main-img" style={{ background: "#e8e0d8", ...imgStyle }} />
                )}
                <div className="hero-gradient" />

                <div className="hero-nav">
                    <button className="hero-arrow" onClick={() => goToPhoto(currentPhoto - 1, "prev")} aria-label="Previous photo">
                        <i className="fa fa-chevron-left" />
                    </button>
                    <button className="hero-arrow" onClick={() => goToPhoto(currentPhoto + 1, "next")} aria-label="Next photo">
                        <i className="fa fa-chevron-right" />
                    </button>
                </div>

                <div className="hero-counter">
                    {R.photos.map((_, i) => (
                        <div
                            key={i}
                            className={`hero-dot${i === currentPhoto ? " active" : ""}`}
                            onClick={() => goToPhoto(i, i > currentPhoto ? "next" : "prev")}
                        />
                    ))}
                </div>

                <div className="hero-identity">
                    <div>
                        <span className="hi-category">{R.category}</span>
                        <h1 className="hi-title">{R.name}</h1>
                    </div>
                    <div className="hi-right">
                        <div className="hi-price-from">From</div>
                        <div className="hi-price">{R.priceDisplay}</div>
                        <div className="hi-night">per night · all inclusive</div>
                    </div>
                </div>

                {R.photos.length > 1 && (
                    <button className="hero-view-all" onClick={() => { setLbStart(0); setLbOpen(true); }}>
                        <i className="fa fa-images" /> View All Photos
                    </button>
                )}
            </section>

            {/* ── DETAIL LAYOUT (sidebar removed — everything full width) ── */}
            <div className="detail-layout">

                {R.specs.length > 0 && (
                    <div className="dl-specs quick-specs fade-up" style={fullWidthStyle}>
                        {R.specs.map((s, i) => (
                            <div key={i} className="qs-item">
                                <div className="qs-icon"><i className={`fa ${s.icon}`} /></div>
                                <span className="qs-val">{s.val}</span>
                                <div className="qs-lbl">{s.lbl}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="dl-desc dt-section fade-up fd2" style={fullWidthStyle}>
                    <div className="dt-section-title">About This Room</div>
                    {R.lead && <blockquote className="intro-quote">{R.lead}</blockquote>}
                    {R.desc1 && <p className="sec-body">{R.desc1}</p>}
                    {R.desc2 && <p className="sec-body" style={{ marginTop: 14 }}>{R.desc2}</p>}
                </div>

                {R.amenities.length > 0 && (
                    <div className="dl-amenities dt-section fade-up fd2" style={fullWidthStyle}>
                        <div className="dt-section-title">Room Amenities</div>
                        <div className="am-inline-grid">
                            {R.amenities.map((a, i) => (
                                <div key={i} className="am-inline-item">
                                    <i className={`fa ${a.icon}`} />
                                    <span>{a.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="dl-policies dt-section fade-up fd2" style={fullWidthStyle}>
                    <div className="dt-section-title">Policies &amp; Information</div>
                    <div className="policy-grid">
                        {POLICIES.map((p, i) => (
                            <div key={i} className="policy-card">
                                <div className="pc-icon"><i className={`fa ${p.icon}`} /></div>
                                <div className="pc-title">{p.title}</div>
                                <p className="pc-body">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {R.reviews.length > 0 && (
                    <div className="dl-reviews dt-section fade-up fd2" style={fullWidthStyle}>
                        <div className="dt-section-title">Guest Reviews</div>
                        <div className="row" style={{ margin: "0 -12px" }}>
                            {R.reviews.map((rv, i) => (
                                <div key={i} className="col-md-4 col-sm-12" style={{ padding: "0 12px", marginBottom: 16 }}>
                                    <div style={{ border: "1px solid #ede6df", padding: "22px 20px", height: "100%" }}>
                                        <Stars count={rv.stars || rv.rating || 5} />
                                        <p style={{ fontFamily: "var(--serif)", fontSize: 14, fontStyle: "italic", color: "var(--brown)", margin: "12px 0 14px", lineHeight: 1.65 }}>
                                            "{rv.quote || rv.review || rv.content}"
                                        </p>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 11, color: "var(--forest)", fontWeight: 500 }}>
                                            {rv.author || rv.guest_name}
                                        </div>
                                        <div style={{ fontFamily: "var(--sans)", fontSize: 10, color: "var(--grey)", marginTop: 2 }}>
                                            {rv.date || rv.created_at}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="dl-similar dt-section fade-up fd2" style={fullWidthStyle}>
                    <div className="dt-section-title">Explore More</div>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        <Link href="/rooms" className="btn-outline-forest">← View All Rooms &amp; Suites</Link>
                        <a href="https://acasanextapp.netlify.app/" className="btn-forest">Book This Room</a>
                    </div>
                </div>

            </div>

            {lbOpen && (
                <Lightbox photos={R.photos} startIndex={lbStart} onClose={() => setLbOpen(false)} />
            )}
        </>
    );
}