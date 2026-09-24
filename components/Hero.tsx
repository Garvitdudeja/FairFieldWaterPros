import Link from "next/link";
import LeadForm from "./LeadForm";
import { site } from "@/lib/site";
import { Arrow, Phone } from "./Icons";

export default function Hero() {
  return (
    <section className="section section--canvas">
      <div className="container hero">
        <div>
          <p className="hero__flag">
            <span className="dot" />
            <span className="eyebrow">
              Fairfield County, {site.address.region} &amp; surrounding towns
            </span>
          </p>

          <h1 className="h1 mt-16">
            Water Filtration &amp; Softener Systems for Local Homes
          </h1>

          <p className="lead mt-24 max-ch">
            Whole-home filtration, water softeners, carbon systems and reverse osmosis
            drinking water — for private wells and city water alike. Tell us what you&rsquo;re
            seeing at the tap and we&rsquo;ll size the right system, usually over the phone.
          </p>

          <div className="btn-row mt-32">
            <a className="btn btn--primary" href={`tel:${site.phoneHref}`}>
              <Phone />
              Call {site.phone}
            </a>
            <Link className="btn btn--secondary" href="/services">
              See our services
              <Arrow />
            </Link>
          </div>

          <p className="hero__trust mt-32">
            <span>Licensed &amp; insured</span>
            <span className="sep" aria-hidden="true" />
            <span>Wells &amp; city water</span>
            <span className="sep" aria-hidden="true" />
            <span>Family owned</span>
          </p>
        </div>

        <div className="hero__form">
          <h2 className="h3">Get a quote</h2>
          <p className="card__body">
            Send us the basics and we&rsquo;ll call you back, usually the same business day.
          </p>
          <div className="mt-24">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
