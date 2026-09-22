import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FinalCta } from "@/components/Footer";
import { Process, ServicesDetailed, Symptoms } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Water Treatment Services",
  description:
    "Well water treatment, water softeners, reverse osmosis, radon removal, city water filtration and well pump service across Fairfield County, CT.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Water Treatment Services"
        intro="Whole-home filtration, softeners, drinking water systems, radon removal and well pump work — for private bedrock wells and municipal supply across Fairfield County."
      />
      <ServicesDetailed />
      <Symptoms />
      <Process />
      <FinalCta />
    </>
  );
}
