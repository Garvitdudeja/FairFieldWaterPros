import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import LeadForm from "@/components/LeadForm";
import { ServiceArea } from "@/components/Sections";
import { Clock, Mail, Phone, Pin } from "@/components/Icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Request a free water test or book well pump service with ${site.name}. Serving all 23 towns in Fairfield County, Connecticut.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { street, locality, region, postalCode } = site.address;
  const hasAddress = Boolean(street && locality);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Contact Us"
        intro="Tell us what you're seeing in your water and we'll arrange a test. If you have no water right now, call rather than filling in the form — that gets to us faster."
      />

      <section className="section section--white">
        <div className="container contact">
          <div>
            <h2 className="h2">Get in touch</h2>

            <ul className="contact__list mt-24">
              <li>
                <span className="contact__icon">
                  <Phone />
                </span>
                <span>
                  <span className="contact__label">Phone</span>
                  <a className="contact__value" href={`tel:${site.phoneHref}`}>
                    {site.phone}
                  </a>
                </span>
              </li>

              <li>
                <span className="contact__icon">
                  <Mail />
                </span>
                <span>
                  <span className="contact__label">Email</span>
                  <a className="contact__value" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                </span>
              </li>

              {site.hours && (
                <li>
                  <span className="contact__icon">
                    <Clock />
                  </span>
                  <span>
                    <span className="contact__label">Hours</span>
                    <span className="contact__value">{site.hours}</span>
                  </span>
                </li>
              )}

              <li>
                <span className="contact__icon">
                  <Pin />
                </span>
                <span>
                  <span className="contact__label">Service area</span>
                  <span className="contact__value">
                    {hasAddress ? (
                      <>
                        {street}
                        <br />
                        {locality}, {region} {postalCode}
                      </>
                    ) : (
                      <>All of Fairfield County, {region}</>
                    )}
                  </span>
                </span>
              </li>
            </ul>

            {site.emergencyNote && (
              <p className="notice mt-32">{site.emergencyNote}</p>
            )}

            {site.license && (
              <p className="form__note mt-16">CT license #{site.license}</p>
            )}
          </div>

          <div className="contact__form">
            <h2 className="h3">Request a water test</h2>
            <p className="card__body">
              We&rsquo;ll call to confirm a time, usually the same business day.
            </p>
            <div className="mt-24">
              <LeadForm />
            </div>
          </div>
        </div>
      </section>

      <ServiceArea tone="canvas" />
    </>
  );
}
