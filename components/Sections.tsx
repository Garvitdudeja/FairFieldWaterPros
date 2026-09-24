import Link from "next/link";
import {
  brands,
  faqs,
  processSteps,
  reviews,
  serviceArea,
  services,
  stats,
  symptoms,
  towns,
  whyUs,
} from "@/lib/site";
import { ICONS, Arrow, Check } from "./Icons";

export function BrandStrip() {
  if (brands.length === 0) return null;

  return (
    <div className="strip">
      <div className="strip__inner">
        <span className="strip__label">Certified &amp; carried</span>
        {brands.map((brand) => (
          <span className="strip__brand" key={brand}>
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Stats({ tone = "white" }: { tone?: "white" | "canvas" }) {
  const shown = stats.filter((stat) => stat.value.trim() !== "");
  if (shown.length === 0) return null;

  return (
    <section className={`section section--${tone}`}>
      <div className="container stats">
        {shown.map((stat) => (
          <div key={stat.label}>
            <div className="stat__value">{stat.value}</div>
            <div className="stat__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Service cards. Used on the Home page; each links through to Services. */
export function Services({ tone = "white" }: { tone?: "white" | "canvas" }) {
  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">What we do</p>
        <h2 className="h2 mt-12">
          Complete Water Filtration and Softening for Local Homes
        </h2>
        <p className="lead mt-16 max-ch">
          Private well or municipal line, these are the systems that solve it — installed
          together where a house needs more than one.
        </p>

        <div className="grid-3 mt-40">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <article className="card" key={service.id}>
                <span className="card__icon">
                  <Icon />
                </span>
                <h3 className="h3 card__title">{service.title}</h3>
                <p className="card__body">{service.body}</p>
                <Link className="card__link" href={`/services#${service.id}`}>
                  Explore service
                  <Arrow />
                </Link>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/** The long-form version on the Services page: each service with its list. */
export function ServicesDetailed() {
  return (
    <section className="section section--white">
      <div className="container stack-services">
        {services.map((service) => {
          const Icon = ICONS[service.icon];
          return (
            <article className="service" id={service.id} key={service.id}>
              <div className="service__head">
                <span className="card__icon">
                  <Icon />
                </span>
                <h2 className="h2 service__title">{service.title}</h2>
              </div>

              <div className="service__body">
                <p className="lead max-ch">{service.body}</p>

                <ul className="ticks mt-24">
                  {service.includes.map((item) => (
                    <li key={item}>
                      <Check />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function Process({ tone = "canvas" }: { tone?: "white" | "canvas" }) {
  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className="h2 mt-12">From first call to installation in three steps</h2>
        <p className="lead mt-16 max-ch">
          No in-home sales appointment to get a price. Most of this happens on the phone.
        </p>

        <div className="grid-3 mt-40">
          {processSteps.map((item) => (
            <article className="card" key={item.step}>
              <span className="step__num mono">{item.step}</span>
              <h3 className="h3 step__title">{item.title}</h3>
              <p className="card__body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyUs({ tone = "white" }: { tone?: "white" | "canvas" }) {
  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">Why homeowners choose us</p>
        <h2 className="h2 mt-12">A straightforward way to buy water treatment</h2>

        <div className="grid-3 mt-40">
          {whyUs.map((point) => (
            <div className="reason" key={point.title}>
              <h3 className="h3 reason__title">
                <Check />
                {point.title}
              </h3>
              <p className="card__body">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Symptoms({ tone = "canvas" }: { tone?: "white" | "canvas" }) {
  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">Symptoms and causes</p>
        <h2 className="h2 mt-12">What you&rsquo;re noticing, and what causes it</h2>

        <div className="table">
          <div className="table__head">
            <span>What you notice</span>
            <span>Likely cause</span>
            <span>What fixes it</span>
          </div>

          {symptoms.map((row) => (
            <div className="table__row" key={row.notice}>
              <span className="table__cell table__cell--notice">
                <span className="table__cellLabel">What you notice</span>
                {row.notice}
              </span>
              <span className="table__cell table__cell--cause">
                <span className="table__cellLabel">Likely cause</span>
                {row.cause}
              </span>
              <span className="table__cell table__cell--fix">
                <span className="table__cellLabel">What fixes it</span>
                {row.fix}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews({ tone = "white" }: { tone?: "white" | "canvas" }) {
  // Nothing ships until real reviews are pasted into lib/site.ts.
  if (reviews.length === 0) return null;

  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">Reviews</p>
        <h2 className="h2 mt-12">What Fairfield County homeowners say</h2>

        <div className="grid-3 mt-40">
          {reviews.map((review) => (
            <figure className="card" key={review.name + review.quote.slice(0, 12)}>
              <span className="review__stars" aria-label="Five out of five stars">
                ★★★★★
              </span>
              <blockquote className="review__quote">{review.quote}</blockquote>
              <figcaption className="review__who">
                <div className="review__name">{review.name}</div>
                <div className="review__meta">
                  {review.town} · {review.service}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceArea({ tone = "white" }: { tone?: "white" | "canvas" }) {
  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">Service area</p>
        <h2 className="h2 mt-12">{serviceArea.heading}</h2>
        <p className="lead mt-16 max-ch">{serviceArea.intro}</p>

        <ul className="towns">
          {towns.map((town) => (
            <li className="town" key={town}>
              {town}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq({ tone = "white" }: { tone?: "white" | "canvas" }) {
  // Google reads this to build the FAQ result in search listings.
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section className={`section section--${tone}`}>
      <div className="container">
        <p className="eyebrow">Common questions</p>
        <h2 className="h2 mt-12">Frequently asked questions</h2>

        <div className="faq mt-32">
          {faqs.map((faq) => (
            <details className="faq__item" key={faq.question}>
              <summary className="faq__q">
                {faq.question}
                <span className="faq__sign" aria-hidden="true" />
              </summary>
              <p className="faq__a">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
