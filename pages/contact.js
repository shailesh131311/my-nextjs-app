/**
 * ContactPage.jsx — ACASA The Collective
 * Converted from contact.html — no Navbar or Footer included.
 * Uses existing assets/css/style.css class names throughout.
 */

import { useState, useEffect, useCallback } from "react";
import BASE_URL from "../services/config";
// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const DEPARTMENTS = [
    {
        key: "reservations",
        label: "Reservations",
        icon: "fa-bed",
        title: "Reservations",
        rows: [
            {
                icon: "fa-phone", label: "Phone",
                value: <><a href="tel:+917798685666">+91 77986 85666</a> &nbsp;·&nbsp; <a href="tel:+918605162448">+91 86051 62448</a></>
            },
            {
                icon: "fa-envelope", label: "Email",
                value: <a href="mailto:info@chrhospitality.com">info@chrhospitality.com</a>
            },
            { icon: "fa-clock", label: "Hours", value: "7:00 AM – 11:00 PM, every day" },
        ],
    },
    {
        key: "events",
        label: "Events",
        icon: "fa-champagne-glasses",
        title: "Events & Banquet",
        rows: [
            {
                icon: "fa-phone", label: "Phone",
                value: <a href="tel:+918806112300">+91 88061 12300</a>
            },
            {
                icon: "fa-envelope", label: "Email",
                value: <a href="mailto:info@chrhospitality.com">info@chrhospitality.com</a>
            },
            { icon: "fa-clock", label: "Hours", value: "9:00 AM – 7:00 PM, Mon – Sat" },
        ],
    },
    {
        key: "concierge",
        label: "Concierge",
        icon: "fa-bell-concierge",
        title: "Concierge & Guest Services",
        rows: [
            {
                icon: "fa-phone", label: "Phone (24/7)",
                value: <a href="tel:+917798685666">+91 77986 85666</a>
            },
            {
                icon: "fa-envelope", label: "Email",
                value: <a href="mailto:info@chrhospitality.com">info@chrhospitality.com</a>
            },
            { icon: "fa-clock", label: "Hours", value: "Available 24 hours, 7 days a week" },
        ],
    },
    {
        key: "management",
        label: "Management",
        icon: "fa-user-tie",
        title: "General Management",
        rows: [
            {
                icon: "fa-phone", label: "Phone",
                value: <a href="tel:+918806112300">+91 88061 12300</a>
            },
            {
                icon: "fa-envelope", label: "Email",
                value: <a href="mailto:info@chrhospitality.com">info@chrhospitality.com</a>
            },
            { icon: "fa-clock", label: "Hours", value: "9:00 AM – 6:00 PM, Mon – Fri" },
        ],
    },
];

const TRAVEL_ITEMS = [
    {
        icon: "fa-plane",
        mode: "By Air",
        distance: "8 km · ~15 min",
        desc: "Aurangabad Airport (IXU) offers daily flights from Mumbai, Delhi, Hyderabad and Bengaluru. Acasa offers airport transfer on request.",
    },
    {
        icon: "fa-train",
        mode: "By Train",
        distance: "5 km · ~10 min",
        desc: "Aurangabad Railway Station connects to all major cities. The Devgiri Express and other trains run daily from Mumbai CST.",
    },
    {
        icon: "fa-car",
        mode: "By Road",
        distance: "NH52 · Beed Bypass",
        desc: "Located on the prominent Beed Bypass Road. Well-connected via NH52 from Pune (~230 km) and Mumbai (~330 km). Valet parking available.",
    },
    {
        icon: "fa-landmark",
        mode: "Heritage Sites",
        distance: "100 km · Ajanta & Ellora",
        desc: "Acasa is the ideal base for exploring Ajanta Caves (100 km) and Ellora Caves (30 km). Our concierge arranges curated day tours.",
    },
];

const FAQS = [
    {
        q: "What are the check-in and check-out times?",
        a: "Check-in is from 2:00 PM and check-out is by 12:00 noon. Early check-in and late check-out are subject to availability and can be requested at the time of booking. Please contact our reservations team to make such arrangements in advance.",
    },
    {
        q: "Is airport transfer available?",
        a: "Yes, Acasa offers complimentary airport transfers for Heritage Suite guests. For all other room categories, airport transfers can be arranged at a nominal charge. Please notify us of your flight details at least 24 hours in advance.",
    },
    {
        q: "Do you have parking facilities?",
        a: "Acasa provides complimentary valet parking for all in-house guests. Our parking facility is monitored 24/7 and accommodates both two-wheelers and four-wheelers.",
    },
    {
        q: "Can I book a room for a day visit or day use?",
        a: "Day use rooms are available subject to availability, typically from 8:00 AM to 6:00 PM. Please contact our reservations team at least 24 hours in advance to confirm availability and rates.",
    },
    {
        q: "What is your cancellation policy?",
        a: "Bookings can be cancelled free of charge up to 48 hours before the check-in date. Cancellations made within 48 hours of arrival will attract a charge equivalent to one night's stay. Special rates and packages may have separate cancellation terms.",
    },
    {
        q: "Are pets allowed at Acasa?",
        a: "Acasa is a pet-friendly property for well-behaved pets in selected room categories. Prior arrangement is necessary — please contact our concierge team before booking. A refundable pet deposit applies.",
    },
    {
        q: "Do you accommodate dietary requirements?",
        a: "Absolutely. Our culinary team is happy to accommodate vegetarian, vegan, Jain, gluten-free, and other dietary requirements. Please inform us of any special requirements at the time of booking so we can prepare accordingly.",
    },
    {
        q: "How do I plan a wedding or event at Acasa?",
        a: "Our dedicated Events team will guide you through every aspect of your celebration — from venue selection and catering to décor and entertainment. Please reach out to info@chrhospitality.com or call +91 88061 12300 to begin your planning journey.",
    },
];

const SOCIAL_LINKS = [
    { href: "https://www.instagram.com/acasa.in", icon: "fa-brands fa-instagram" },
    { href: "", icon: "fa-brands fa-facebook" },

    { href: "https://maps.app.goo.gl/f85Ma2HqDaxaToRZ6", icon: "fa-brands fa-google" },
    { href: "https://wa.me/917798685666", icon: "fa-brands fa-whatsapp" },
];

const EMPTY_FORM = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function PageHero() {
    return (
        <section className="contact-hero">
            <div className="contact-hero-img" />
            <div className="contact-hero-overlay" />
            <div className="contact-hero-content containerWrapper">
                <div className="breadcrumb-bar fade-up in">
                    <a href="index.html">Home</a>
                    <span style={{ margin: "0 10px" }}>·</span>
                    Contact Us
                </div>
                <h1 className="page-hero-title fade-up fd2 in">
                    We Would Love to Hear From You
                </h1>
                <p className="page-hero-sub fade-up fd3 in">
                    Reservations · Events · General Enquiries · Concierge
                </p>
            </div>
        </section>
    );
}

function DepartmentCard({ dept, isActive }) {
    return (
        <div className={`dept-info ci-card fade-up fd3 in${isActive ? " active" : ""}`}>
            <div className="ci-card-header">
                <div className="loc-icon-wrap"><i className={`fa ${dept.icon}`} /></div>
                <div className="ci-title">{dept.title}</div>
            </div>
            {dept.rows.map((row) => (
                <div key={row.label} className="ci-row">
                    <i className={`fa ${row.icon} ci-row-icon`} />
                    <div>
                        <div className="ci-label">{row.label}</div>
                        <div className="ci-value">{row.value}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ContactInfo({ activeDept, onDeptChange }) {
    return (
        <div className="contact-info">
            <span className="sec-label fade-up in">Get In Touch</span>
            <h2 className="sec-title dark fade-up fd2 in" style={{ marginBottom: 24 }}>
                Our <em>Departments</em>
            </h2>

            {/* Department Tabs */}
            <div className="dept-tabs fade-up fd2 in">
                {DEPARTMENTS.map((d) => (
                    <button
                        key={d.key}
                        className={`dept-tab${activeDept === d.key ? " active" : ""}`}
                        onClick={() => onDeptChange(d.key)}
                    >
                        {d.label}
                    </button>
                ))}
            </div>

            {/* Department Cards */}
            {DEPARTMENTS.map((d) => (
                <DepartmentCard key={d.key} dept={d} isActive={activeDept === d.key} />
            ))}

            {/* Address Card */}
            <div className="ci-card fade-up fd3 in" style={{ marginTop: 32 }}>
                <div className="ci-card-header">
                    <div className="loc-icon-wrap"><i className="fa fa-location-dot" /></div>
                    <div className="ci-title">Our Address</div>
                </div>
                <div className="ci-row">
                    <i className="fa fa-map-pin ci-row-icon" />
                    <div>
                        <div className="ci-label">Street Address</div>
                        <div className="ci-value">
                            Plot No. 10, Gut No. 71,<br />
                            Jai Nagari, Beed Bypass Road,<br />
                            PWD Colony,<br />
                            Chhatrapati Sambhajinagar 431001<br />
                            Maharashtra, India
                        </div>
                    </div>
                </div>
                <div className="ci-row">
                    <i className="fa fa-plane ci-row-icon" />
                    <div>
                        <div className="ci-label">Nearest Airport</div>
                        <div className="ci-value">Aurangabad Airport — 8 km (~15 min drive)</div>
                    </div>
                </div>
                <div className="ci-row">
                    <i className="fa fa-train ci-row-icon" />
                    <div>
                        <div className="ci-label">Nearest Railway Station</div>
                        <div className="ci-value">Aurangabad Railway Station — 5 km (~10 min)</div>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="map-embed fade-up fd3 in">
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

            {/* Social */}
            <div className="fade-up fd3 in" style={{ marginTop: 8 }}>
                <div className="ci-label" style={{ marginBottom: 14 }}>Follow Acasa</div>
                <div style={{ display: "flex", gap: 10 }}>
                    {SOCIAL_LINKS.map((s) => (
                        <a
                            key={s.icon}
                            href={s.href}
                            target={s.href.startsWith("http") ? "_blank" : undefined}
                            rel="noreferrer"
                            style={{
                                width: 42, height: 42,
                                border: "1px solid #e8e0d8",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: "var(--grey)", fontSize: 15, transition: "all .25s",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e8e0d8"; e.currentTarget.style.color = "var(--grey)"; }}
                        >
                            <i className={s.icon} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}

function ContactForm() {
    const [form, setForm] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const handleChange = useCallback((field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
    }, []);

    const validate = () => {
        const e = {};
        if (!form.firstName.trim()) e.firstName = "Please enter your first name.";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Please enter a valid email address.";
        if (!form.phone.trim()) e.phone = "Please enter your phone number.";
        if (!form.message.trim()) e.message = "Please enter a message.";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }

        setLoading(true);
        setApiError("");

        try {
            const res = await fetch(`${BASE_URL}/api/contact/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: form.firstName.trim(),
                    last_name: form.lastName.trim(),
                    email: form.email.trim(),
                    mobile: form.phone.trim(),   // ← was "phone", API wants "mobile"
                    subject: form.subject || "General Enquiry",
                    message: form.message.trim(),
                }),
            });

            const data = await res.json();
            console.log("API response:", data);

            if (data.status === true || data.status === "true" || data.success === true) {
                setSubmitted(true);
            } else {
                setApiError(data.message || "Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("API error:", err);
            setApiError("Unable to send your message. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleReset = () => {
        setForm(EMPTY_FORM);
        setErrors({});
        setSubmitted(false);
        setApiError("");
    };

    return (
        <div className="contact-form-wrap fade-up fd2 in">
            {!submitted ? (
                <div id="contactFormInner">
                    <div className="cf-header">
                        <span className="cf-script">Say Hello</span>
                        <div className="cf-title">Send Us a <em>Message</em></div>
                        <p className="cf-sub">
                            Whether it's a booking query, an event enquiry, or simply a kind word — we read every message and respond within 4 hours.
                        </p>
                    </div>

                    <div className="cf-row-2">
                        <div>
                            <label className="cf-label">First Name</label>
                            <input
                                type="text"
                                className="cf-input"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={(e) => handleChange("firstName", e.target.value)}
                            />
                            {errors.firstName && <p style={{ color: "var(--gold)", fontSize: 11, marginTop: 4 }}>{errors.firstName}</p>}
                        </div>
                        <div>
                            <label className="cf-label">Last Name</label>
                            <input
                                type="text"
                                className="cf-input"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={(e) => handleChange("lastName", e.target.value)}
                            />
                        </div>
                    </div>

                    <label className="cf-label">Email Address</label>
                    <input
                        type="email"
                        className="cf-input"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && <p style={{ color: "var(--gold)", fontSize: 11, marginTop: 4 }}>{errors.email}</p>}

                    <label className="cf-label">Phone Number</label>
                    <input
                        type="tel"
                        className="cf-input"
                        placeholder="+91 00000 00000"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    />
                    {errors.phone && <p style={{ color: "var(--gold)", fontSize: 11, marginTop: 4 }}>{errors.phone}</p>}

                    <label className="cf-label">Subject</label>
                    <select
                        className="cf-input"
                        value={form.subject}
                        onChange={(e) => handleChange("subject", e.target.value)}
                    >
                        <option value="">Select a subject...</option>
                        <option>Room Reservation</option>
                        <option>Wedding Enquiry</option>
                        <option>Corporate Event</option>
                        <option>Birthday / Celebration</option>
                        <option>General Information</option>
                        <option>Feedback</option>
                        <option>Other</option>
                    </select>

                    <label className="cf-label">Your Message</label>
                    <textarea
                        className="cf-input"
                        rows={5}
                        placeholder="Tell us how we can help you..."
                        style={{ resize: "vertical" }}
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                    />
                    {errors.message && <p style={{ color: "var(--gold)", fontSize: 11, marginTop: 4 }}>{errors.message}</p>}

                    {/* API-level error */}
                    {apiError && (
                        <p style={{ color: "var(--gold)", fontSize: 12, marginTop: 8, textAlign: "center" }}>
                            {apiError}
                        </p>
                    )}

                    <div className="cf-divider" />
                    <button
                        className="cf-submit"
                        onClick={handleSubmit}
                        disabled={loading}
                        style={loading ? { opacity: 0.7, cursor: "not-allowed" } : {}}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>

                    <p style={{ fontFamily: "var(--sans)", fontSize: 10.5, fontWeight: 300, color: "rgba(244,237,231,.3)", textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>
                        We respond within 4 hours · Your details are kept confidential
                    </p>
                </div>
            ) : (
                <div className="cf-success show">
                    <div className="cf-success-icon"><i className="fa fa-check" /></div>
                    <div className="cf-success-title">Message Received!</div>
                    <p className="cf-success-sub">
                        Thank you for reaching out. A member of our team will be in touch with you within 4 hours.
                    </p>
                    <button
                        className="cf-submit"
                        style={{ marginTop: 24, maxWidth: 200, display: "inline-block" }}
                        onClick={handleReset}
                    >
                        Send Another
                    </button>
                </div>
            )}
        </div>
    );
}

function GettingThere() {
    return (
        <section className="getting-there">
            <div className="containerWrapper">
                <div className="row" style={{ marginBottom: 0, textAlign: "center" }}>
                    <div className="col-sm-12">
                        <span className="sec-label fade-up in">Getting Here</span>
                        <h2 className="sec-title dark fade-up fd2 in">
                            Find Your Way to <em>Acasa</em>
                        </h2>
                        <span className="sec-line center fade-up fd3 in" />
                    </div>
                </div>

                <div className="travel-grid fade-up fd2 in">
                    {TRAVEL_ITEMS.map((item) => (
                        <div key={item.mode} className="travel-item">
                            <div className="travel-icon"><i className={`fa ${item.icon}`} /></div>
                            <div className="travel-mode">{item.mode}</div>
                            <div className="travel-distance">{item.distance}</div>
                            <p className="travel-desc">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqItem({ faq }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={`faq-item fade-up in${open ? " open" : ""}`}>
            <div className="faq-question" onClick={() => setOpen((o) => !o)}>
                <span className="faq-q-text">{faq.q}</span>
                <i className={`fa ${open ? "fa-minus" : "fa-plus"} faq-icon`} />
            </div>
            <div className="faq-answer">
                <p className="faq-a-text">{faq.a}</p>
            </div>
        </div>
    );
}

function FaqSection() {
    return (
        <section className="faq-section">
            <div className="containerWrapper">
                <div className="row" style={{ marginBottom: 52, textAlign: "center" }}>
                    <div className="col-sm-12">
                        <span className="sec-label fade-up in">Quick Answers</span>
                        <h2 className="sec-title dark fade-up fd2 in">
                            Frequently Asked <em>Questions</em>
                        </h2>
                        <span className="sec-line center fade-up fd3 in" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">
                        {FAQS.map((faq) => (
                            <FaqItem key={faq.q} faq={faq} />
                        ))}
                    </div>
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
                        <span className="script fade-up in">Begin Your Story</span>
                        <h2 className="fade-up fd2 in">Reserve Your Stay at <em>Acasa</em></h2>
                        <p className="fade-up fd3 in">
                            Every visit is a chapter in a larger story — one of culture, warmth, and the quiet luxury of feeling truly at home.
                        </p>
                        <div className="cta-btns fade-up fd4 in">
                            <a href="https://bookings.resavenue.com/engine-ibe/search?regCode=TTEC0622" className="btn-forest">Book Direct</a>
                            <a href="tel:+917798685666" className="btn-outline-forest">Call Us Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
    const [activeDept, setActiveDept] = useState("reservations");

    // Scroll reveal
    useEffect(() => {
        const els = document.querySelectorAll(".fade-up:not(.in)");
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
            { threshold: 0.08 }
        );
        els.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <PageHero />

            {/* ═══ MAIN CONTACT SECTION ═══ */}
            <section className="contact-section">
                <div className="containerWrapper">
                    <div className="contact-grid">
                        <ContactInfo activeDept={activeDept} onDeptChange={setActiveDept} />
                        <ContactForm />
                    </div>
                </div>
            </section>

            <GettingThere />
            <FaqSection />
            <CtaStrip />
        </>
    );
}