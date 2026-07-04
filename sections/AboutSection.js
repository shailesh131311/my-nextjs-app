import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFadeUp } from "../hooks/useFadeUp";

export default function AboutSection() {
  const ref = useRef(null);
  useFadeUp(ref);

  return (
    <section className="section" id="about" ref={ref}>
      <div className="containerWrapper">
        <div className="row intro-row">

          {/* Image */}
          <div className="col-md-6 col-sm-12 intro-img-col">
            <div className="intro-img fade-up">
              <Image
                src="/images/aboutimg.jpg"
                alt="About Acasa"
                width={700}
                height={550}
                className="img-responsive"
              />

              <div className="intro-badge">
                <div className="ib-num">5★</div>
                <div className="ib-label">
                  Luxury
                  <br />
                  Hotel
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="col-md-6 col-sm-12 intro-text-col">
            <span className="sec-label fade-up">Our Heritage</span>

            <h2 className="sec-title dark fade-up fd2">
              A Home Away
              <br />
              From <em>Home</em>
            </h2>

            <span className="sec-line fade-up fd3"></span>

            <blockquote className="intro-quote fade-up fd3">
              "The fort arch, reimagined — a modern icon that nods to India's architectural heritage without being bound by it."
            </blockquote>

            <p className="sec-body fade-up fd4">
              Acasa — The Collective is a luxury hospitality destination
              nestled in the cultural heart of Chhatrapati Sambhajinagar.
              Our property is a thoughtful blend of modern comfort and the
              timeless aesthetic of Marathwada's rich heritage.
            </p>

            <p
              className="sec-body fade-up fd4"
              style={{ marginTop: "14px" }}
            >
              Whether you are visiting Ajanta and Ellora, attending a
              corporate event, or celebrating a wedding, Acasa offers an
              experience that feels as personal as it does prestigious.
            </p>

            <div className="intro-stats fade-up fd5">
              <div>
                <div className="is-num">
                  5<em>★</em>
                </div>
                <div className="is-lbl">Luxury Standard</div>
              </div>

              <div>
                <div className="is-num">
                  200<em>+</em>
                </div>
                <div className="is-lbl">Guest Capacity</div>
              </div>

              <div>
                <div className="is-num">
                  6<em>+</em>
                </div>
                <div className="is-lbl">Event Venues</div>
              </div>
            </div>

            <div
              style={{ marginTop: "32px" }}
              className="fade-up fd5"
            >
              <Link href="/about" className="sec-link">
                Discover Our Story
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}