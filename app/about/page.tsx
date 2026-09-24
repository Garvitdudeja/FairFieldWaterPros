import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FinalCta } from "@/components/Footer";
import { ServiceArea, Stats, WhyUs } from "@/components/Sections";
import { about, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.name} — a local family of builders installing water filtration, softeners and drinking water systems across Fairfield County, CT and the surrounding area.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { ownerName, ownerTitle, paragraphs } = about;

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="About Fairfield County Water Pros"
        intro="A local family of builders who got into water treatment — installing filtration, softeners and drinking water systems across Fairfield County and the towns around it."
      />

      <section className="section section--white">
        <div className="container prose">
          <h2 className="h2">Who we are</h2>

          {paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}

          {ownerName && (
            <p className="signature">
              <strong>{ownerName}</strong>
              <br />
              {ownerTitle}, {site.name}
            </p>
          )}
        </div>
      </section>

      <Stats tone="canvas" />
      <WhyUs />
      <ServiceArea tone="canvas" />
      <FinalCta />
    </>
  );
}
