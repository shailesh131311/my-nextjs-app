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

export default function PrivacyPolicyPage() {
    useScrollReveal();

    return (
        <>
            {/* ── PAGE HERO ── */}
            <section className="page-hero" style={{ minHeight: 320 }}>
                <div className="page-hero-img" style={{ backgroundImage: "url('../../images/slider1.jpg')" }} />
                <div className="page-hero-overlay" />
                <div className="page-hero-content containerWrapper">
                    <div className="breadcrumb-bar fade-up">
                        <a href="/">Home</a><span>·</span>Privacy Policy
                    </div>
                    <h1 className="page-hero-title fade-up fd2">
                        Privacy <em>Policy</em>
                    </h1>
                    <p className="page-hero-sub fade-up fd3">
                        How we collect, use, and protect your information
                    </p>
                </div>
            </section>

            {/* ── CONTENT ── */}
            <section style={{ padding: "72px 0", background: "#fff" }}>
                <div className="containerWrapper">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 col-sm-10 col-sm-offset-1 col-xs-12">

                            <p style={{ color: "#888", fontFamily: "var(--sans)", fontSize: 13, marginBottom: 40 }}>
                                Last updated: June 2026
                            </p>

                            {/* ── SECTION 1 ── */}
                            <div className="pp-section fade-up">
                                <h2 className="pp-heading">1. Introduction</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 2 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">2. Information We Collect</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 3 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">3. How We Use Your Information</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 4 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">4. Sharing of Information</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 5 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">5. Cookies</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 6 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">6. Data Security</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 7 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">7. Your Rights</h2>
                                <p className="pp-body">
                                    {/* Add your content here */}
                                </p>
                            </div>

                            {/* ── SECTION 8 ── */}
                            <div className="pp-section fade-up fd2">
                                <h2 className="pp-heading">8. Contact Us</h2>
                                <p className="pp-body">
                                    For any privacy-related queries, please contact us at{' '}
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