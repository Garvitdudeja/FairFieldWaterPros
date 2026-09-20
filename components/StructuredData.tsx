import { services, site, towns } from "@/lib/site";

/**
 * LocalBusiness schema. This is what puts the phone number, service area and
 * services into Google's local results. Blank fields are dropped rather than
 * published empty.
 */
export default function StructuredData() {
  const { street, locality, region, postalCode } = site.address;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Plumber",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.tagline,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/logo.jpg`,
    logo: `${site.url}/logo.jpg`,
    priceRange: "$$",
    areaServed: towns.map((town) => ({
      "@type": "City",
      name: town,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "Fairfield County, Connecticut",
      },
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Water treatment services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.body,
        },
      })),
    },
  };

  if (street && locality) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: locality,
      addressRegion: region,
      postalCode,
      addressCountry: "US",
    };
  } else {
    data.address = {
      "@type": "PostalAddress",
      addressRegion: region,
      addressCountry: "US",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
