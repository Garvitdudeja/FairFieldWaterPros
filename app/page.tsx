import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Footer, { FinalCta } from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import {
  BrandStrip,
  Process,
  Reviews,
  ServiceArea,
  Services,
  Stats,
  Symptoms,
} from "@/components/Sections";

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <Header />
      <main id="main">
        <Hero />
        <BrandStrip />
        <Stats />
        <Services />
        <Process />
        <Offer />
        <Symptoms />
        <Reviews />
        <ServiceArea />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
