import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import { FinalCta } from "@/components/Footer";
import {
  BrandStrip,
  Faq,
  Process,
  Reviews,
  ServiceArea,
  Services,
  WhyUs,
} from "@/components/Sections";

/**
 * Section backgrounds alternate white / canvas down the page. Reviews is the
 * one section that disappears when `reviews` in lib/site.ts is empty, so it
 * sits where its absence doesn't leave two canvas sections touching.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Services />
      <Process />
      <WhyUs />
      <Offer />
      <ServiceArea />
      <Faq tone="canvas" />
      <Reviews tone="white" />
      <FinalCta />
    </>
  );
}
