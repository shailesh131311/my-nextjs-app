import { useEffect } from "react";

const useCustomScripts = () => {
    useEffect(() => {

        /* ── Smooth scroll ── */
        const links = document.querySelectorAll('a[href^="#"]');

        const handleScroll = function (e) {
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        };

        links.forEach((a) => a.addEventListener("click", handleScroll));

        /* ── Scroll Reveal ── */
        const elements = document.querySelectorAll(".fade-up");

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                }
            });
        }, { threshold: 0.12 });

        elements.forEach((el) => observer.observe(el));

        /* ── Hero animation ── */
        const heroAnim = () => {
            document.querySelectorAll(".hero .fade-up").forEach((el) => {
                el.classList.add("in");
            });
        };

        window.addEventListener("load", heroAnim);

        /* ── Date min ── */
        const today = new Date().toISOString().split("T")[0];
        const checkIn = document.getElementById("checkIn");
        const checkOut = document.getElementById("checkOut");

        if (checkIn) checkIn.setAttribute("min", today);
        if (checkOut) checkOut.setAttribute("min", today);

        /* ── Testimonials ── */
        const testis = [
            {
                q: '"An experience that transcends hospitality. The attention to cultural detail made our wedding unforgettable."',
                a: "— Aarav & Priya Mehta",
            },
            {
                q: '"Acasa redefines luxury in Marathwada. Every detail speaks of care."',
                a: "— Rajeev Sharma",
            },
            {
                q: '"The Heritage Suite is not just a room — it is a sanctuary."',
                a: "— Ananya Kapoor",
            },
        ];

        let tIdx = 0;

        const goTesti = (i) => {
            const qEl = document.getElementById("testiQuote");
            const aEl = document.getElementById("testiAuthor");

            if (!qEl || !aEl) return;

            qEl.style.opacity = "0";
            aEl.style.opacity = "0";

            setTimeout(() => {
                qEl.innerHTML = testis[i].q;
                aEl.innerHTML = testis[i].a;
                qEl.style.opacity = "1";
                aEl.style.opacity = "1";
            }, 300);

            document.querySelectorAll(".testi-dot").forEach((d, idx) => {
                d.classList.toggle("active", idx === i);
            });

            tIdx = i;
        };

        const testiInterval = setInterval(() => {
            goTesti((tIdx + 1) % testis.length);
        }, 5500);

        goTesti(0);

        /* ── Lightbox ── */
        const images = [
            { src: "/assets/images/gal1.jpg", alt: "Hotel Exterior" },
            { src: "/assets/images/gal2.jpg", alt: "Dining" },
            { src: "/assets/images/gal3.jpg", alt: "Pool" },
            { src: "/assets/images/gal4.jpg", alt: "Spa" },
            { src: "/assets/images/gal5.jpg", alt: "Room" },
        ];

        const backdrop = document.getElementById("lbBackdrop");
        const lbImg = document.getElementById("lbImg");
        const lbCap = document.getElementById("lbCaption");
        const lbStage = document.getElementById("lbStage");

        let current = 0;

        const showImage = (idx) => {
            current = (idx + images.length) % images.length;
            if (!lbImg || !lbCap) return;

            lbImg.src = images[current].src;
            lbCap.textContent = images[current].alt;
        };

        const openLightbox = (idx) => {
            if (!backdrop) return;

            showImage(idx);
            backdrop.classList.add("lb-open");
            document.body.style.overflow = "hidden";
        };

        const closeLightbox = () => {
            if (!backdrop) return;

            backdrop.classList.remove("lb-open");
            document.body.style.overflow = "";
        };

        const galItems = document.querySelectorAll(".gal-item[data-lightbox]");

        const handleGalClick = function () {
            openLightbox(parseInt(this.getAttribute("data-lightbox")));
        };

        galItems.forEach((el) => {
            el.addEventListener("click", handleGalClick);
        });

        /* ── Cleanup ── */
        return () => {
            links.forEach((a) => a.removeEventListener("click", handleScroll));
            window.removeEventListener("load", heroAnim);
            observer.disconnect();
            clearInterval(testiInterval);

            galItems.forEach((el) => {
                el.removeEventListener("click", handleGalClick);
            });
        };

    }, []);
};

export default useCustomScripts;