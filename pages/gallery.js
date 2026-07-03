import React from "react";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
// ─────────────────────────────────────────────────────────────────────────────
// API CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

// Add this instead:
import BASE_URL from "../services/config";

const API_IMAGES = `${BASE_URL}/api/gallery/`;
const API_CATEGORIES = `${BASE_URL}/api/gallery/categories.php`;

// ─────────────────────────────────────────────────────────────────────────────
// AMBIENT SECTION DATA (static — editorial, not from gallery API)
// ─────────────────────────────────────────────────────────────────────────────

const AMBIENT_ITEMS = [
    { src: "../images/about_inner2.jpg", alt: "The Grand Facade", cat: "Exterior", title: "The Grand Facade" },
    { src: "../images/4.jpg", alt: "Heritage Suite", cat: "Rooms", title: "Super Deluxe Room" },
    { src: "../images/terise-lawn.jpg", alt: "Fine Dining", cat: "Dining", title: "Terrace Lawn" },

];

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY — normalise an API image object → internal photo shape
// ─────────────────────────────────────────────────────────────────────────────

function normalisePhoto(item) {


    return {
        id: item.id,
        src: item.image,
        cat: item.category_slug,   // used for filtering
        label: item.category_name,   // human-readable label shown in grid
        title: item.title,
        size: item.layout || "std", // "tall" | "std" (wide) — from your DB
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function AnnounceBanner() {
    return (
        <div className="announce-bar">
            <strong>Website Exclusive:</strong> Save 20% on direct bookings
            &nbsp;·&nbsp; Use code <strong>ACASA20</strong> &nbsp;·&nbsp;
            <a href="index.html#booking-bar">Book Now</a>
        </div>
    );
}

function Hero() {
    return (
        <section className="gal-hero">
            <div className="gal-hero-img" />
            <div className="gal-hero-overlay" />
            <div className="gal-hero-content containerWrapper">
                <div className="breadcrumb-bar fade-up in">
                    <a href="index.html">Home</a>
                    <span style={{ margin: "0 10px" }}>·</span>Gallery
                </div>
                <h1 className="page-hero-title fade-up fd2 in">
                    A Glimpse of Acasa
                </h1>
                <p className="page-hero-sub fade-up fd3 in">
                    Exterior · Rooms · Dining · Events · Wellness · Landscape
                </p>
            </div>
        </section>
    );
}

function FilterBar({ tabs, activeCat, onFilter, count }) {
    return (
        <div className="gal-filter-bar" id="galFilterBar">
            <div className="gal-filter-inner">
                <div className="gal-filter-tabs">
                    {/* "All" tab is always first */}
                    <button
                        className={`gal-tab${activeCat === "all" ? " active" : ""}`}
                        onClick={() => onFilter("all")}
                    >
                        All
                    </button>

                    {tabs.map((t) => (
                        <button
                            key={t.slug}
                            className={`gal-tab${activeCat === t.slug ? " active" : ""}`}
                            onClick={() => onFilter(t.slug)}
                        >
                            {t.name}
                        </button>
                    ))}
                </div>
                <div className="gal-count">
                    <em id="visibleCount">{count}</em> photos
                </div>
            </div>
        </div>
    );
}

function MasonryGrid({ photos, onOpen }) {
    // Staggered fade-in on mount / filter change
    useEffect(() => {
        const timers = [];
        document.querySelectorAll(".masonry-item:not(.in)").forEach((el, i) => {
            timers.push(setTimeout(() => el.classList.add("in"), i * 40));
        });
        return () => timers.forEach(clearTimeout);
    }, [photos]);

    if (photos.length === 0) {
        return (
            <div className="gal-empty show" id="galEmpty">
                <i className="fa fa-images" />
                <p className="sec-body">No photos in this category yet.</p>
            </div>
        );
    }

    return (
        <>
            <div className="masonry-grid" id="masonryGrid">
                {photos.map((p, i) => (
                    <div
                        key={`${p.id}-${i}`}
                        className={`masonry-item ${p.size} fade-up`}
                        data-idx={i}
                        onClick={() => onOpen(i)}
                    >
                        <img src={p.src} alt={p.title} loading="lazy" />
                        <div className="gal-overlay">
                            <i className="fa fa-expand" />
                        </div>
                        <div className="masonry-label">
                            <div className="ml-cat">{p.label}</div>
                            <div className="ml-title">{p.title}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="gal-empty" id="galEmpty" />
        </>
    );
}

/** Skeleton shimmer cards shown while photos are loading */
function MasonrySkeletons() {
    const sizes = ["tall", "std", "std", "std", "tall", "std", "std", "std", "tall", "std", "std", "std"];
    return (
        <div className="masonry-grid" id="masonryGrid">
            {sizes.map((s, i) => (
                <div key={i} className={`masonry-item ${s}`} style={{ background: "#e8e4df", borderRadius: 4, animation: "pulse 1.4s ease-in-out infinite" }} />
            ))}
        </div>
    );
}

function StatsStrip() {
    return (
        <div className="gal-stats">
            <div className="containerWrapper" style={{ padding: "0 30px" }}>
                <div className="gal-stats-inner">
                    <div className="gs-item fade-up">
                        <span className="gs-num">5<em>★</em></span>
                        <div className="gs-lbl">Luxury Standard</div>
                    </div>
                    <div className="gs-item fade-up fd2">
                        <span className="gs-num">12<em>+</em></span>
                        <div className="gs-lbl">Unique Spaces</div>
                    </div>
                    <div className="gs-item fade-up fd3">
                        <span className="gs-num">200<em>+</em></span>
                        <div className="gs-lbl">Guest Capacity</div>
                    </div>
                    <div className="gs-item fade-up fd4">
                        <span className="gs-num">6<em>+</em></span>
                        <div className="gs-lbl">Event Venues</div>
                    </div>
                    <div className="gs-item fade-up fd5">
                        <span className="gs-num">∞</span>
                        <div className="gs-lbl">Memories Made</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AmbientSection() {
    return (
        <section className="ambient-section">
            <div className="containerWrapper">
                <div className="row" style={{ marginBottom: 0, textAlign: "center" }}>
                    <div className="col-sm-12">
                        <span className="sec-label fade-up">Signature Spaces</span>
                        <h2 className="sec-title dark fade-up fd2">
                            The Soul of <em>Acasa</em>
                        </h2>
                        <span className="sec-line center fade-up fd3" />
                        <p className="sec-body fade-up fd3" style={{ maxWidth: 520, margin: "0 auto" }}>
                            Five distinct worlds within one address — each crafted to evoke a mood, a memory, a moment.
                        </p>
                    </div>
                </div>
                <div className="ambient-grid fade-up fd2">
                    {AMBIENT_ITEMS.map((item) => (
                        <div key={item.title} className="amb-item">
                            <img src={item.src} alt={item.alt} />
                            <div className="amb-overlay" />
                            <div className="amb-label">
                                <span className="amb-cat">{item.cat}</span>
                                <div className="amb-title">{item.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CtaStrip() {
    return (
        <section className="cta-strip">
            <div className="containerWrapper">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 text-center">
                        <span className="script fade-up">Experience It In Person</span>
                        <h2 className="fade-up fd2">
                            These Images Tell Half the <em>Story</em>
                        </h2>
                        <p className="fade-up fd3">
                            The warmth, the fragrance, the quiet luxury of Acasa — some things can only be felt. Come and see for yourself.
                        </p>
                        <div className="cta-btns fade-up fd4">
                            <Link href="/#booking-bar" className="btn-forest">Book Your Stay</Link>
                            <Link href="/contact" className="btn-outline-forest">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHTBOX
// ─────────────────────────────────────────────────────────────────────────────

function Lightbox({ photos, currentIdx, onClose, onPrev, onNext }) {
    const stageRef = useRef(null);
    const touchStartX = useRef(0);
    const isOpen = currentIdx !== null;

    // Lock body scroll
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;
        const handler = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isOpen, onClose, onNext, onPrev]);

    if (!isOpen || !photos[currentIdx]) return null;

    const photo = photos[currentIdx];

    const handleTouchStart = (e) => { touchStartX.current = e.changedTouches[0].clientX; };
    const handleTouchEnd = (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev();
    };

    return (
        <div
            className="lb-backdrop lb-open"
            id="lbBackdrop"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <button className="lb-close" id="lbClose" onClick={onClose}>
                <i className="fa fa-xmark" />
            </button>
            <button className="lb-arrow lb-prev" id="lbPrev" onClick={onPrev}>
                <i className="fa fa-chevron-left" />
            </button>
            <button className="lb-arrow lb-next" id="lbNext" onClick={onNext}>
                <i className="fa fa-chevron-right" />
            </button>

            <div
                className="lb-stage"
                id="lbStage"
                ref={stageRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img className="lb-img" id="lbImg" src={photo.src} alt={photo.title} />
            </div>

            <div className="lb-caption" id="lbCaption">{photo.title}</div>
            <div className="lb-counter" id="lbCounter">
                {currentIdx + 1} / {photos.length}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
    const [photos, setPhotos] = useState([]);
    const [tabs, setTabs] = useState([]);   // [{ name, slug }]
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCat, setActiveCat] = useState("all");
    const [lbIndex, setLbIndex] = useState(null);

    // ── Fetch images + categories in parallel ────────────────────────────────
    useEffect(() => {
        let cancelled = false;

        async function load() {
            try {
                setLoading(true);
                setError(null);

                const [imagesRes, catsRes] = await Promise.all([
                    fetch(API_IMAGES),
                    fetch(API_CATEGORIES),
                ]);

                if (!imagesRes.ok) throw new Error(`Images API error: ${imagesRes.status}`);

                const imagesJson = await imagesRes.json();

                // ── Normalise photos ──────────────────────────────────────────
                // API returns { status, count, data: [...] }
                const rawPhotos = (Array.isArray(imagesJson)
                    ? imagesJson
                    : imagesJson.data ?? []
                ).sort((a, b) => Number(a.id) - Number(b.id));

                const normPhotos = rawPhotos.map(normalisePhoto);

                // ── Normalise categories ──────────────────────────────────────
                // If categories API returned an error / 409, fall back to
                // deriving unique categories from the image list itself.
                let normTabs = [];

                if (catsRes.ok) {
                    const catsJson = await catsRes.json();
                    const rawCats = Array.isArray(catsJson)
                        ? catsJson
                        : catsJson.data ?? [];

                    if (rawCats.length > 0) {
                        // Expected shape: [{ id, name, slug }]
                        // Also handle shape: [{ id, category_name, category_slug }]
                        normTabs = rawCats.map((c) => ({
                            name: c.name ?? c.category_name,
                            slug: c.slug ?? c.category_slug,
                        }));
                    }
                }

                // Fallback: derive categories from the photos themselves
                if (normTabs.length === 0) {
                    const seen = new Map();
                    normPhotos.forEach((p) => {
                        if (!seen.has(p.cat)) seen.set(p.cat, p.label);
                    });
                    normTabs = Array.from(seen.entries()).map(([slug, name]) => ({ slug, name }));
                }

                if (!cancelled) {
                    setPhotos(normPhotos);
                    setTabs(normTabs);
                }
            } catch (err) {
                if (!cancelled) setError(err.message);
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        load();
        return () => { cancelled = true; };
    }, []);

    // ── Filtered photo list ──────────────────────────────────────────────────
    const visiblePhotos = activeCat === "all"
        ? photos
        : photos.filter((p) => p.cat === activeCat);

    // ── Scroll-reveal observer ───────────────────────────────────────────────
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
            { threshold: 0.08 }
        );
        document.querySelectorAll(".fade-up:not(.in)").forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [activeCat, loading]);

    const handleOpen = useCallback((idx) => setLbIndex(idx), []);
    const handleClose = useCallback(() => setLbIndex(null), []);
    const handlePrev = useCallback(() =>
        setLbIndex((i) => (i - 1 + visiblePhotos.length) % visiblePhotos.length),
        [visiblePhotos.length]);
    const handleNext = useCallback(() =>
        setLbIndex((i) => (i + 1) % visiblePhotos.length),
        [visiblePhotos.length]);

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <>
            <AnnounceBanner />
            <Hero />

            {/* Filter bar: only rendered once tabs are ready */}
            {!loading && !error && (
                <FilterBar
                    tabs={tabs}
                    activeCat={activeCat}
                    onFilter={setActiveCat}
                    count={visiblePhotos.length}
                />
            )}

            {/* ═══ MASONRY GALLERY ═══ */}
            <section className="gallery-section">
                <div className="containerWrapper">
                    {loading && <MasonrySkeletons />}

                    {error && !loading && (
                        <div className="gal-empty show">
                            <i className="fa fa-circle-exclamation" />
                            <p className="sec-body">
                                Could not load gallery — please try again later.
                                <br />
                                <small style={{ opacity: 0.6 }}>{error}</small>
                            </p>
                        </div>
                    )}

                    {!loading && !error && (
                        <MasonryGrid photos={visiblePhotos} onOpen={handleOpen} />
                    )}
                </div>
            </section>

            <StatsStrip />
            <AmbientSection />
            <CtaStrip />

            {/* ═══ LIGHTBOX ═══ */}
            <Lightbox
                photos={visiblePhotos}
                currentIdx={lbIndex}
                onClose={handleClose}
                onPrev={handlePrev}
                onNext={handleNext}
            />
        </>
    );
}