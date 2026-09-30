import { services, site, towns } from "@/lib/site";

/**
 * LocalBusiness schema. This is what puts the phone number, hours, service
 * area and services into Google's local results. Blank fields are dropped
 * rather than published empty — an incomplete listing is better than one
 * containing empty strings.
 */
export default function StructuredData() {
  const { street, locality, region, postalCode } = site.address;

  // Publish whatever parts of the address exist. Locality alone is still
  // worth sending; an address object with empty strings in it is not.
  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressRegion: region,
    addressCountry: "US",
  };
  if (street) address.streetAddress = street;
  if (locality) address.addressLocality = locality;
  if (postalCode) address.postalCode = postalCode;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${site.url}/#business`,
    name: site.name,
    description: site.tagline,
    url: site.url,
    telephone: site.phoneHref,
    email: site.email,
    image: `${site.url}/logo.jpg`,
    logo: `${site.url}/logo.jpg`,
    priceRange: "$$",
    address,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: site.openingHours.days,
        opens: site.openingHours.opens,
        closes: site.openingHours.closes,
      },
    ],
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
          url: `${site.url}/services#${service.id}`,
        },
      })),
    },
  };

  // Ties the site to the business's listings. One of the stronger local
  // signals, but only once real URLs are in lib/site.ts.
  if (site.profiles.length > 0) data.sameAs = site.profiles;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
