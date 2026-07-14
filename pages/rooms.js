import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import BASE_URL from '../services/config'
import Link from "next/link";
async function fetchRoomsAPI() {
    const res = await fetch(`${BASE_URL}/api/rooms/`);
    const json = await res.json();
    if (!json.status) throw new Error(json.message || "Failed to fetch rooms");
    return json.data;
}

async function checkAvailabilityAPI(payload) {
    console.log("[API] checkAvailability →", payload);
    return { available: true };
}

const formatPrice = (val) =>
    val ? `₹${parseFloat(val).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : null;

function normaliseRoom(r, index) {
    const details = r.room_details || {};
    const images = r.images || [];
    const amenities = r.amenities || [];

    const category = r.room_type
        ? r.room_type.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "")
        : `room_${r.id}`;

    const normalisedAmenities = amenities.map((a) => ({
        icon: a.icon ? a.icon.replace(/fa-solid\s+|fa-regular\s+|fa-brands\s+/g, "") : "fa-star",
        text: a.name?.trim() || "",
    }));

    const specs = [
        details.room_size && { icon: "fa-ruler-combined", val: details.room_size.trim(), lbl: "Room Size" },
        details.bed_type && { icon: "fa-bed", val: details.bed_type.trim(), lbl: "Bed Type" },
        details.max_occupancy && { icon: "fa-user", val: details.max_occupancy.trim(), lbl: "Occupancy" },
    ].filter(Boolean);

    const priceDisplay = formatPrice(r.selling_price) || formatPrice(r.mrp) || "—";
    const mrpDisplay = formatPrice(r.mrp);
    const sellingDisplay = formatPrice(r.selling_price);

    return {
        id: String(r.id),
        category,
        num: String(index + 1).padStart(2, "0"),
        badge: index === 0 ? "Most Popular" : r.room_type?.trim() || "Room",
        name: r.room_type?.trim() || "Room",
        tagline: r.title?.trim() || "",
        desc: r.description?.trim() || "",
        img: images[0]?.image || "",
        images,
        priceDisplay,
        mrpDisplay,
        sellingDisplay,
        sqft: details.room_size?.trim() || "",
        bed: details.bed_type?.trim() || "King",
        guests: details.max_occupancy?.trim() || "1–2",
        reverse: index % 2 !== 0,
        amenityTags: normalisedAmenities.map((a) => a.text),
        modalTag: r.room_type?.trim() || "Room",
        modalDesc: r.description?.trim() || "",
        specs,
        amenities: normalisedAmenities,
        mrp: r.mrp,
        selling_price: r.selling_price,
        rawData: r,  // ← store raw API data for instant detail page load
    };
}

const ACASA_PROMISE = [
    "Complimentary high-speed Wi-Fi",
    "Daily housekeeping & turndown",
    "Valet parking",
    "24/7 concierge service",
    "Fitness centre & pool access",
];

function today() { return new Date().toISOString().split("T")[0]; }

function AnnounceBanner() {
    return (
        <div className="announce-bar">
            <strong>Website Exclusive:</strong> Save 20% on direct bookings
            &nbsp;·&nbsp; Use code <strong>ACASA20</strong> &nbsp;·&nbsp;
            <a href="#booking-section">Book Now</a>
        </div>
    );
}

function PageHero() {
    return (
        <section className="page-hero">
            <div className="page-hero-img" />
            <div className="page-hero-overlay" />
            <div className="page-hero-content containerWrapper">
                <div className="breadcrumb-bar fade-up in">
                    <Link href="/">Home</Link><span>·</span>Rooms &amp; Suites
                </div>
                <h1 className="page-hero-title fade-up fd2 in">
                    Spaces Designed<br />for Deeper Rest
                </h1>
                <p className="page-hero-sub fade-up fd3 in">
                    Four room categories · Heritage-inspired interiors · Marathwada craftsmanship
                </p>
            </div>
        </section>
    );
}

function FilterBar({ activeFilter, onFilter, filterTabs, totalShown }) {
    return (
        <div className="filter-bar" id="filterBar">
            <div className="filter-inner">
                <div className="filter-tabs">
                    {filterTabs.map((t) => (
                        <button
                            key={t.key}
                            className={`filter-tab${activeFilter === t.key ? " active" : ""}`}
                            data-filter={t.key}
                            onClick={() => onFilter(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
                <div className="filter-count">
                    <em>{totalShown}</em> room {totalShown === 1 ? "category" : "categories"} available
                </div>
            </div>
        </div>
    );
}

function RoomFeatured({ room, onViewDetails, onBookRoom }) {
    const hasMrpDiscount = room.mrpDisplay && room.sellingDisplay &&
        parseFloat(room.mrp) !== parseFloat(room.selling_price);

    return (
        <div
            className={`room-featured fade-up in${room.reverse ? " reverse" : ""}`}
            data-category={room.category}
        >
            <div className="rf-photo">
                <img src={room.img} alt={room.name} />
                <span className="rf-tag">{room.badge}</span>
                <div className="rf-price-badge">
                    {hasMrpDiscount && (
                        <div className="rfpb-mrp"><s>{room.mrpDisplay}</s></div>
                    )}

                    <div className="rfpb-price">{room.priceDisplay}</div>
                    <div className="rfpb-night">per night</div>
                </div>
            </div>
            <div className="rf-body">
                <span className="rf-num">{room.num}</span>
                <h2 className="rf-name">{room.name}</h2>
                <div className="rf-tagline">{room.tagline}</div>
                <p className="rf-desc">{room.desc}</p>
                <div className="rf-specs">
                    {room.sqft && (
                        <div className="rf-spec">
                            <div className="rf-spec-icon"><i className="fa fa-ruler-combined" /></div>
                            <span className="rf-spec-val">{room.sqft}</span>
                        </div>
                    )}
                    {room.bed && (
                        <div className="rf-spec">
                            <div className="rf-spec-icon"><i className="fa fa-bed" /></div>
                            <span className="rf-spec-val">{room.bed}</span>
                            <div className="rf-spec-lbl">Bed Type</div>
                        </div>
                    )}
                    {room.guests && (
                        <div className="rf-spec">
                            <div className="rf-spec-icon"><i className="fa fa-user" /></div>
                            <span className="rf-spec-val">{room.guests}</span>
                            <div className="rf-spec-lbl">Guests</div>
                        </div>
                    )}
                </div>
                <div className="rf-amenities">
                    {room.amenityTags.map((a) => (
                        <span key={a} className="rf-amenity">{a}</span>
                    ))}
                </div>
                <div className="rf-actions">
                    <button className="btn-outline-forest" onClick={() => onViewDetails(room.id)}>
                        View Details
                    </button>
                    <button className="btn-outline-forest" onClick={() => onBookRoom(room.id)}>
                        Know More
                    </button>
                    <button
                        className="btn-outline-forest"
                        onClick={() =>
                            window.location.href =
                            "https://bookings.resavenue.com/engine-ibe/search?regCode=TTEC0622"
                        }
                    >
                        Book This Room
                    </button>
                </div>
            </div>
        </div>
    );
}

function SectionDivider() {
    return <div className="section-divider"><span>✦</span></div>;
}

function PerksBar() {
    return (
        <div className="perks-bar">
            <div className="containerWrapper">
                <div className="perks-inner">
                    <div className="perk-item">
                        <i className="fa fa-tag" />
                        <div>
                            <div className="perk-title">Best Rate Guarantee</div>
                            <div className="perk-sub">Lowest price on direct bookings</div>
                        </div>
                    </div>
                    <div className="perk-item">
                        <i className="fa fa-clock" />
                        <div>
                            <div className="perk-title">Flexible Check-in</div>
                            <div className="perk-sub">Early arrival, late departure available</div>
                        </div>
                    </div>
                    <div className="perk-item">
                        <i className="fa fa-shield-halved" />
                        <div>
                            <div className="perk-title">No Hidden Charges</div>
                            <div className="perk-sub">Transparent, all-inclusive pricing</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ComparisonTable({ rooms }) {
    if (!rooms.length) return null;

    const amenityMap = new Map();
    rooms.forEach((r) => {
        r.amenities.forEach((a) => {
            const key = a.text.toLowerCase().trim();
            if (!amenityMap.has(key)) amenityMap.set(key, a.text.trim());
        });
    });

    const compRows = [
        { label: "Room Size", values: rooms.map((r) => r.sqft || "—") },
        { label: "Bed Type", values: rooms.map((r) => r.bed || "—") },
        { label: "Max Occupancy", values: rooms.map((r) => r.guests || "—") },
        { label: "Price / Night", values: rooms.map((r) => r.priceDisplay) },
        ...[...amenityMap.entries()].map(([key, displayText]) => ({
            label: displayText,
            values: rooms.map((r) =>
                r.amenities.some((a) => a.text.toLowerCase().trim() === key)
            ),
        })),
    ];

    return (
        <section className="comparison-section">
            <div className="containerWrapper">
                <div className="row">
                    <div className="col-sm-12">
                        <span className="sec-label fade-up in">Compare</span>
                        <h2 className="sec-title dark fade-up in fd2">Find Your <em>Perfect Room</em></h2>
                        <span className="sec-line center fade-up in fd3" />
                    </div>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table className="compare-table fade-up in">
                        <thead>
                            <tr>
                                <th style={{ width: "22%" }} />
                                {rooms.map((r, i) => (
                                    <th key={r.id} className={i === 0 ? "col-highlight" : ""}>{r.name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {compRows.map((row) => (
                                <tr key={row.label}>
                                    <td>{row.label}</td>
                                    {row.values.map((v, i) => (
                                        <td key={i} className={i === 0 ? "col-highlight" : ""}>
                                            {typeof v === "boolean" ? (
                                                v
                                                    ? <i className="fa fa-check ct-check" />
                                                    : <i className="fa fa-xmark ct-cross" />
                                            ) : (
                                                <span className="ct-val">{v}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}



function CtaSection() {
    return (
        <section className="rooms-cta">
            <div className="containerWrapper">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12 text-center">
                        <span className="script fade-up in">Your Sanctuary Awaits</span>
                        <h2 className="fade-up in fd2">Reserve the <em>Perfect Room</em></h2>
                        <p className="fade-up in fd3">
                            Every room is a world unto itself — a thoughtful interplay of heritage and comfort, waiting to become yours.
                        </p>
                        <div className="cta-btns fade-up in fd4">
                            <a href="tel:+918446995333" className="btn-gold">Call to Reserve</a>
                            <Link href="https://bookings.resavenue.com/engine-ibe/search?regCode=TTEC0622" legacyBehavior>
                                <a className="btn-gold-outline">Book Online</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function RoomModal({ roomId, rooms, onClose, onBookRoom }) {
    const room = rooms.find((r) => r.id === roomId);
    const [activeImg, setActiveImg] = useState(0);

    useEffect(() => {
        setActiveImg(0);
        if (roomId) document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, [roomId]);

    useEffect(() => {
        const handler = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!roomId || !room) return null;

    return (
        <>
            <div
                className="modal-backdrop-custom open"
                id="modalBackdrop"
                onClick={onClose}
                style={{ zIndex: 9098 }}
            />
            <div
                className="room-modal open"
                id="roomModal"
                style={{
                    top: "50%", right: "auto", bottom: "auto", left: "50%",
                    transform: "translate(-50%, -50%)",
                    maxHeight: "90vh", zIndex: 9099,
                }}
            >
                <button className="modal-close" id="modalClose" onClick={onClose}>
                    <i className="fa fa-xmark" />
                </button>
                <div className="modal-gallery">
                    <img id="modalImg" src={room.images[activeImg]?.image || room.img} alt={room.name} />
                    {room.images.length > 1 && (
                        <div className="modal-gallery-nav" id="modalGalleryNav">
                            {room.images.map((img, i) => (
                                <button
                                    key={img.id || i}
                                    className={`modal-thumb${i === activeImg ? " active" : ""}`}
                                    onClick={() => setActiveImg(i)}
                                >
                                    <img src={img.image} alt={`${room.name} ${i + 1}`} />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                <div className="modal-body">
                    <span className="modal-room-tag" id="modalTag">{room.modalTag}</span>
                    <h2 className="modal-room-name" id="modalName">{room.name}</h2>
                    <p className="modal-room-desc" id="modalDesc">{room.modalDesc}</p>
                    <div className="modal-specs" id="modalSpecs">
                        {room.specs.map((sp) => (
                            <div key={sp.lbl} className="modal-spec">
                                <i className={`fa ${sp.icon}`} />
                                <span className="modal-spec-val">{sp.val}</span>
                                <div className="modal-spec-lbl">{sp.lbl}</div>
                            </div>
                        ))}
                    </div>
                    <div className="modal-section-title">Room Amenities</div>
                    <div className="modal-amenities-grid" id="modalAmenities">
                        {room.amenities.map((a) => (
                            <div key={a.text} className="modal-amenity-item">
                                <i className={`fa ${a.icon}`} />
                                <span>{a.text}</span>
                            </div>
                        ))}
                    </div>
                    <div className="modal-price-row">
                        <div className="mpr-price-block">
                            {room.mrpDisplay && room.sellingDisplay && room.mrp !== room.selling_price && (
                                <div className="mpr-mrp"><s>{room.mrpDisplay}</s></div>
                            )}

                            <div className="mpr-price" id="modalPrice">{room.priceDisplay}</div>
                            <div className="mpr-night">per night · taxes inclusive</div>
                        </div>
                        <button
                            className="btn-outline-forest"
                            id="modalBookBtn"
                            onClick={() => { onClose(); onBookRoom(room.id); }}
                        >
                            Know More
                        </button>
                        <button
                            className="btn-forest"
                            onClick={() =>
                                window.location.href =
                                "https://bookings.resavenue.com/engine-ibe/search?regCode=TTEC0622"
                            }
                        >
                            Book This Room
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

function RoomsLoadingSkeleton() {
    return (
        <section className="rooms-section">
            <div className="containerWrapper">
                {[1, 2].map((n) => (
                    <div key={n} className="room-featured skeleton-room fade-up in">
                        <div className="rf-photo skeleton-box" />
                        <div className="rf-body">
                            <div className="skeleton-line skeleton-line--short" />
                            <div className="skeleton-line" />
                            <div className="skeleton-line skeleton-line--med" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function RoomsPage() {
    const router = useRouter();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("all");
    const [modalRoomId, setModalRoomId] = useState(null);
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingForm, setBookingForm] = useState({
        checkIn: "", checkOut: "", guests: "2 Guests", roomType: "",
    });

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        fetchRoomsAPI()
            .then((data) => { if (cancelled) return; setRooms(data.map(normaliseRoom)); })
            .catch((err) => { if (cancelled) return; console.error("[Rooms API]", err); setError("Unable to load rooms. Please try again later."); })
            .finally(() => { if (!cancelled) setLoading(false); });
        return () => { cancelled = true; };
    }, []);

    useEffect(() => {
        const els = document.querySelectorAll(".fade-up:not(.in)");
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
            { threshold: 0.08 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [activeFilter, rooms]);

    // ✅ Pass rawData so detail page loads instantly
    const handleBookRoom = useCallback((roomId) => {
        const room = rooms.find((r) => r.id === String(roomId));

        // Optional: keep if you'll use room later
        if (!room) return;

        router.push(`/rooms/${roomId}`);
    }, [router, rooms]);

    const filterTabs = [
        { key: "all", label: "All Rooms" },
        ...rooms.map((r) => ({ key: r.category, label: r.name })),
    ];
    const visibleRooms = activeFilter === "all" ? rooms : rooms.filter((r) => r.category === activeFilter);
    const roomNames = rooms.map((r) => r.name);

    const handleBookingChange = useCallback((field, value) => {
        setBookingForm((prev) => ({ ...prev, [field]: value }));
    }, []);

    const handleCheckAvailability = useCallback(async () => {
        setBookingLoading(true);
        try {
            const result = await checkAvailabilityAPI(bookingForm);
            console.log("Availability result:", result);
        } catch (err) {
            console.error("Availability check failed:", err);
        } finally {
            setBookingLoading(false);
        }
    }, [bookingForm]);

    return (
        <>
            <AnnounceBanner />
            <PageHero />

            {!loading && !error && (
                <FilterBar
                    activeFilter={activeFilter}
                    onFilter={setActiveFilter}
                    filterTabs={filterTabs}
                    totalShown={visibleRooms.length}
                />
            )}

            {loading && <RoomsLoadingSkeleton />}

            {error && (
                <section className="rooms-section">
                    <div className="containerWrapper">
                        <div className="rooms-error-state">
                            <i className="fa fa-triangle-exclamation" />
                            <p>{error}</p>
                            <button className="btn-gold" onClick={() => window.location.reload()}>
                                Try Again
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {!loading && !error && (
                <>
                    <section className="rooms-section">
                        <div className="containerWrapper">
                            {visibleRooms.map((room, i) => (
                                <div key={room.id}>
                                    <RoomFeatured
                                        room={room}
                                        onViewDetails={setModalRoomId}
                                        onBookRoom={handleBookRoom}
                                    />
                                    {i < visibleRooms.length - 1 && <SectionDivider />}
                                </div>
                            ))}
                            {visibleRooms.length === 0 && (
                                <p className="rooms-empty-msg">No rooms found for this category.</p>
                            )}
                        </div>
                    </section>

                    <PerksBar />
                    <ComparisonTable rooms={rooms} />

                    <CtaSection />

                    <RoomModal
                        roomId={modalRoomId}
                        rooms={rooms}
                        onClose={() => setModalRoomId(null)}
                        onBookRoom={handleBookRoom}
                    />
                </>
            )}
        </>
    );
}