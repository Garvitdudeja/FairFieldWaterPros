import Hero from "@/components/Hero";
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
 * Process comes first after the hero — that's the running order the client
 * liked on raleighwaterpros.com, and it explains the phone-first sales
 * process before asking anyone to commit to anything.
 *
 * Section backgrounds alternate white / canvas down the page. Reviews is the
 * one section that disappears when `reviews` in lib/site.ts is empty, so it
 * sits where its absence doesn't leave two canvas sections touching.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <BrandStrip />
      <Process tone="white" />
      <Services tone="canvas" />
      <WhyUs tone="white" />
      <ServiceArea tone="canvas" />
      <Faq tone="white" />
      <Reviews tone="canvas" />
      <FinalCta />
    </>
  );
}
