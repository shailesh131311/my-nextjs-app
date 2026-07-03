"use client";

import { useEffect } from "react";

function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".fade-up");
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in"); }),
            { threshold: 0.1 }
        );
        els.forEach((el) => io.observe(el));
        document.querySelectorAll(".page-hero .fade-up").forEach((el) => el.classList.add("in"));
        return () => io.disconnect();
    }, []);
}

export default function TermsPage() {
    useScrollReveal();

    return (
        <>
            {/* ── PAGE HERO ── */}
            <section className="page-hero" style={{ minHeight: 320 }}>
                <div className="page-hero-img" style={{ backgroundImage: "url('../../images/slider1.jpg')" }} />
                <div className="page-hero-overlay" />
                <div className="page-hero-content containerWrapper">
                    <div className="breadcrumb-bar fade-up">
                        <a href="/">Home</a><span>·</span>Terms & Conditions
                    </div>
                    <h1 className="page-hero-title fade-up fd2">
                        Terms & <em>Conditions</em>
                    </h1>
                    <p className="page-hero-sub fade-up fd3">
                        The rules and guidelines for using our site and services
                    </p>
                </div>
            </section>

            {/* ── CONTENT ── */}
            <section style={{ padding: "72px 0", background: "#fff" }}>
                <div className="containerWrapper">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">

                            <p style={{ color: "#888", fontFamily: "var(--sans)", fontSize: 13, marginBottom: 16 }}>
                                Last updated: June 2026
                            </p>

                            {/* ── PLACEHOLDER NOTICE ── */}
                            <div
                                className="pp-section fade-up"
                                style={{
                                    background: "#fff8ec",
                                    border: "1px solid #f0dfb8",
                                    borderRadius: 6,
                                    padding: "16px 20px",
                                    marginBottom: 40,
                                }}
                            >
                                <p className="pp-body" style={{ margin: 0, fontStyle: "italic" }}>
                                    These are placeholder Terms &amp; Conditions for preview purposes only.
                                    The final version is being prepared and will be updated soon.
                                </p>
                            </div>

                            {/* ── SECTION 1 ── */}
                            <div className="pp-section fade-up">
                                <h2 className="pp-heading">1. Introduction</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 2 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">2. Use of the Site</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 3 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">3. Bookings & Payments</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 4 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">4. Cancellations & Refunds</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 5 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">5. User Responsibilities</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 6 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">6. Intellectual Property</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 7 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">7. Limitation of Liability</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 8 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">8. Governing Law</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 9 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">9. Changes to These Terms</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 10 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">10. Contact Us</h2>
                                <p className="pp-body">
                                    For any queries regarding these terms, please contact us at{' '}
                                    <a href="mailto:info@chrhospitality.com" style={{ color: "var(--forest)" }}>
                                        info@chrhospitality.com
                                    </a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}