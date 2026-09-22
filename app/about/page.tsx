import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FinalCta } from "@/components/Footer";
import { ServiceArea, Stats, WhyUs } from "@/components/Sections";
import { about, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: `About ${site.name} — water treatment, filtration and well pump service for homes across Fairfield County, Connecticut.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { since, ownerName, ownerTitle, paragraphs } = about;

  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="About Fairfield County Water Pros"
        intro="Water treatment built around what your water actually tests at — for wells and city supply across all 23 towns in the county."
      />

      <section className="section section--white">
        <div className="container prose">
          <h2 className="h2">Who we are</h2>

          {since && (
            <p className="lead mt-16">
              Serving Fairfield County homeowners since {since}.
            </p>
          )}

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
