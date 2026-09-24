import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FinalCta } from "@/components/Footer";
import { Process, ServicesDetailed, Symptoms } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Water Treatment Services",
  description:
    "Whole home water filtration, reverse osmosis drinking water, well water treatment, water softeners, carbon filtration and city water treatment systems across Fairfield County, CT and the surrounding area.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Water Treatment Services"
        intro="Whole home filtration, softeners, carbon systems and reverse osmosis drinking water — for private wells and city water across Fairfield County and the surrounding towns."
      />
      <ServicesDetailed />
      <Symptoms />
      <Process tone="white" />
      <FinalCta />
    </>
  );
}
