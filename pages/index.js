import Head from "next/head";


import ScrollToTopButton from "../components/ScrollToTop";

import HeroSection from "../sections/HeroSection";
import BookingBar from "../sections/BookingBar";
import WhyBookDirect from "../sections/WhyBookDirect";
import AboutSection from "../sections/AboutSection";
import RoomsSection from "../sections/RoomsSection";
import AmenitiesSection from "../sections/AmenitiesSection";
import EventsSection from "../sections/EventsSection";
import QuoteSection from "../sections/QuoteSection";
import GallerySection from "../sections/GallerySection";
import TestimonialsSection from "../sections/TestimonialsSection";
import LocationSection from "../sections/LocationSection";
import CtaStrip from "../sections/CtaStrip";

export default function Home() {
  return (
    <>
      <Head>
        <title>ACASA - The Collective</title>
        <meta
          name="description"
          content="Luxury Hotel in Chhatrapati Sambhajinagar"
        />
      </Head>



      <HeroSection />

      <BookingBar />

      <WhyBookDirect />

      <AboutSection />

      <RoomsSection />

      <AmenitiesSection />

      <EventsSection />

      <QuoteSection />

      <GallerySection />

      <TestimonialsSection />

      <LocationSection />

      <CtaStrip />



      <ScrollToTopButton />
    </>
  );
}