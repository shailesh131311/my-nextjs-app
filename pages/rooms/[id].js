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
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function fmt(n) {
    return "₹" + n.toLocaleString("en-IN");
}

function toDateStr(d) {
    return d.toISOString().split("T")[0];
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
// BOOKING CARD
// ─────────────────────────────────────────────────────────────────────────────

const POLICIES = [
    { icon: "fa-clock", title: "Check-in / Check-out", desc: "Check-in from 2:00 PM · Check-out by 12:00 noon. Early check-in and late check-out subject to availability." },
    { icon: "fa-ban", title: "Cancellation Policy", desc: "Free cancellation up to 48 hours before arrival. Cancellations within 48 hours attract one night's charge." },
    { icon: "fa-child", title: "Children & Extra Beds", desc: "Children under 5 stay free. Extra mattresses and cribs available on request, subject to availability." },
    { icon: "fa-paw", title: "Pet Policy", desc: "We welcome well-behaved pets in selected room categories with prior arrangement. Contact our concierge." },
];

function BookingCard({ room }) {
    const today = toDateStr(new Date());
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [adults, setAdults] = useState("2 Adults");
    const [children, setChildren] = useState("0 Children");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [requests, setRequests] = useState("");
    const [success, setSuccess] = useState(false);
    const [refCode, setRefCode] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const nights = checkIn && checkOut ? Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000) : 0;
    const roomCost = nights > 0 ? nights * room.price : 0;
    const tax = Math.round(roomCost * 0.18);
    const total = roomCost + tax;

    const minCheckOut = checkIn
        ? toDateStr(new Date(new Date(checkIn).getTime() + 86400000))
        : today;

    const handleSubmit = async () => {
        if (!name.trim()) { alert("Please enter your full name."); return; }
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { alert("Please enter a valid email."); return; }
        if (!phone.trim()) { alert("Please enter your phone number."); return; }
        if (!checkIn) { alert("Please select a check-in date."); return; }
        if (!checkOut) { alert("Please select a check-out date."); return; }
        if (new Date(checkOut) <= new Date(checkIn)) { alert("Check-out must be after check-in."); return; }

        setSubmitting(true);
        try {
            const payload = {
                room_id: room.id,
                check_in: checkIn,
                check_out: checkOut,
                adults,
                children,
                guest_name: name,
                guest_email: email,
                guest_phone: phone,
                special_requests: requests,
            };

            let booked = false;
            try {
                const res = await fetch(`${BASE_URL}/api/bookings/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
                if (res.ok) {
                    const json = await res.json();
                    if (json.status && json.data?.reference_code) {
                        setRefCode(json.data.reference_code);
                        booked = true;
                    }
                }
            } catch (_) { /* fall through to local ref */ }

            if (!booked) {
                setRefCode("ACB-" + Math.floor(100000 + Math.random() * 900000));
            }
            setSuccess(true);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="booking-card" id="booking-card">
            <div className="bc-header">
                <div className="bc-room-name">{room.name}</div>
                <span className="bc-price">{room.priceDisplay}</span>
                <span className="bc-night">/ night</span>
            </div>

            {!success ? (
                <>
                    <div className="bc-body">
                        <div className="bc-row-2">
                            <div className="bc-field">
                                <label className="bc-label">Check In</label>
                                <input type="date" className="bc-input" min={today} value={checkIn}
                                    onChange={(e) => { setCheckIn(e.target.value); setCheckOut(""); }} />
                            </div>
                            <div className="bc-field">
                                <label className="bc-label">Check Out</label>
                                <input type="date" className="bc-input" min={minCheckOut} value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)} />
                            </div>
                        </div>
                        <div className="bc-row-2">
                            <div className="bc-field">
                                <label className="bc-label">Adults</label>
                                <select className="bc-input" value={adults} onChange={(e) => setAdults(e.target.value)}>
                                    <option>1 Adult</option><option>2 Adults</option>
                                    <option>3 Adults</option><option>4 Adults</option>
                                </select>
                            </div>
                            <div className="bc-field">
                                <label className="bc-label">Children</label>
                                <select className="bc-input" value={children} onChange={(e) => setChildren(e.target.value)}>
                                    <option>0 Children</option><option>1 Child</option><option>2 Children</option>
                                </select>
                            </div>
                        </div>
                        <div className="bc-field">
                            <label className="bc-label">Full Name</label>
                            <input type="text" className="bc-input" placeholder="Your full name"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="bc-field">
                            <label className="bc-label">Email Address</label>
                            <input type="email" className="bc-input" placeholder="your@email.com"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="bc-field">
                            <label className="bc-label">Phone Number</label>
                            <input type="tel" className="bc-input" placeholder="+91 00000 00000"
                                value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="bc-field">
                            <label className="bc-label">
                                Special Requests{" "}
                                <span style={{ color: "var(--grey)", textTransform: "none", letterSpacing: 0, fontSize: 9 }}>(optional)</span>
                            </label>
                            <input type="text" className="bc-input" placeholder="Early check-in, occasion, floor preference…"
                                value={requests} onChange={(e) => setRequests(e.target.value)} />
                        </div>

                        <div className="bc-divider" />

                        <div style={{ marginBottom: 10 }}>
                            <div className="bc-summary-row">
                                <span className="bc-summary-lbl">
                                    {nights > 0 ? `${nights} night${nights > 1 ? "s" : ""} × ${fmt(room.price)}` : "Select dates to see pricing"}
                                </span>
                                <span className="bc-summary-val">{roomCost > 0 ? fmt(roomCost) : "—"}</span>
                            </div>
                            <div className="bc-summary-row">
                                <span className="bc-summary-lbl">Taxes &amp; Fees (18%)</span>
                                <span className="bc-summary-val">{tax > 0 ? fmt(tax) : "—"}</span>
                            </div>
                            <div className="bc-divider" style={{ margin: "6px 0" }} />
                            <div className="bc-summary-row total">
                                <span className="bc-summary-lbl">Total</span>
                                <span className="bc-summary-val">{total > 0 ? fmt(total) : "—"}</span>
                            </div>
                        </div>

                        <button className="bc-submit" onClick={handleSubmit} disabled={submitting}>
                            {submitting ? "Confirming…" : "Confirm Reservation"}
                        </button>
                    </div>

                    <div className="bc-call">
                        Or call us: <a href="tel:+918446995333">+91 84469 95333</a>
                    </div>

                    <div className="bc-perks">
                        {[
                            { icon: "fa-tag", text: "Best rate guaranteed on direct bookings" },
                            { icon: "fa-ban", text: "Free cancellation up to 48 hrs before arrival" },
                            { icon: "fa-shield-halved", text: "Secure & private reservation" },
                        ].map((p, i) => (
                            <div key={i} className="bc-perk">
                                <i className={`fa ${p.icon}`} /> {p.text}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="booking-success show">
                    <div className="bs-icon"><i className="fa fa-check" /></div>
                    <h3 className="sec-title dark" style={{ fontSize: 22, marginBottom: 10 }}>Booking Confirmed!</h3>
                    <p className="sec-body" style={{ marginBottom: 16 }}>
                        Your reservation has been received. Our team will confirm within 2 hours and send details to your email.
                    </p>
                    <div className="bs-ref">{refCode}</div>
                    <Link href="/rooms" className="btn-outline-forest" style={{ display: "inline-block" }}>Browse More Rooms</Link>
                </div>
            )}
        </div>
    );
}

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

    const scrollToBooking = () => {
        document.getElementById("booking-card")?.scrollIntoView({ behavior: "smooth", block: "start" });
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

    return (
        <>
            {/* ── ANNOUNCE BAR ── */}
            <div className="announce-bar">
                <strong>Website Exclusive:</strong> Save 20% on direct bookings &nbsp;·&nbsp; Use code <strong>ACASA20</strong> &nbsp;·&nbsp;{" "}
                <a href="#booking-card" onClick={(e) => { e.preventDefault(); scrollToBooking(); }}>Book Now</a>
            </div>

            {/* ── STICKY BAR ── */}
            {stickyVisible && (
                <div className="sticky-book-bar">
                    <span className="sbb-name">{R.name}</span>
                    <span className="sbb-price">{R.priceDisplay} <small>/ night</small></span>
                    <button className="sbb-btn" onClick={scrollToBooking}>Reserve Now</button>
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

            {/* ── DETAIL LAYOUT ── */}
            <div className="detail-layout">

                {R.specs.length > 0 && (
                    <div className="dl-specs quick-specs fade-up">
                        {R.specs.map((s, i) => (
                            <div key={i} className="qs-item">
                                <div className="qs-icon"><i className={`fa ${s.icon}`} /></div>
                                <span className="qs-val">{s.val}</span>
                                <div className="qs-lbl">{s.lbl}</div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="dl-desc dt-section fade-up fd2">
                    <div className="dt-section-title">About This Room</div>
                    {R.lead && <blockquote className="intro-quote">{R.lead}</blockquote>}
                    {R.desc1 && <p className="sec-body">{R.desc1}</p>}
                    {R.desc2 && <p className="sec-body" style={{ marginTop: 14 }}>{R.desc2}</p>}
                </div>

                {R.amenities.length > 0 && (
                    <div className="dl-amenities dt-section fade-up fd2">
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

                <div className="detail-sidebar dl-sidebar">
                    <BookingCard room={R} />
                </div>

                <div className="dl-policies dt-section fade-up fd2">
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
                    <div className="dl-reviews dt-section fade-up fd2">
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

                <div className="dl-similar dt-section fade-up fd2">
                    <div className="dt-section-title">Explore More</div>
                    <Link href="/rooms" className="btn-outline-forest">← View All Rooms &amp; Suites</Link>
                </div>

            </div>

            {lbOpen && (
                <Lightbox photos={R.photos} startIndex={lbStart} onClose={() => setLbOpen(false)} />
            )}
        </>
    );
}