import { brands, processSteps, reviews, services, stats, symptoms, towns } from "@/lib/site";
import { ICONS, Arrow } from "./Icons";

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

export function Stats() {
  const shown = stats.filter((stat) => stat.value.trim() !== "");
  if (shown.length === 0) return null;

  return (
    <section className="section section--canvas" style={{ paddingBlock: "48px" }}>
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

export function Services() {
  return (
    <section className="section section--white" id="services">
      <div className="container">
        <p className="eyebrow">What we do</p>
        <h2 className="h2 mt-12">Every water problem a Fairfield County home actually has</h2>
        <p className="lead mt-16 max-ch">
          Bedrock well or city line, the fix starts with a test. Here is what that test
          usually leads to.
        </p>

        <div className="grid-3 mt-40">
          {services.map((service) => {
            const Icon = ICONS[service.icon];
            return (
              <article className="card" id={service.id} key={service.id}>
                <span className="card__icon">
                  <Icon />
                </span>
                <h3 className="h3 card__title">{service.title}</h3>
                <p className="card__body">{service.body}</p>
                <a className="card__link" href="#free-water-test">
                  Book a test
                  <Arrow />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section className="section section--canvas" id="process">
      <div className="container">
        <p className="eyebrow">How it works</p>
        <h2 className="h2 mt-12">Three steps, no pressure pitch</h2>

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

export function Symptoms() {
  return (
    <section className="section section--canvas" id="symptoms">
      <div className="container">
        <p className="eyebrow">Symptoms and causes</p>
        <h2 className="h2 mt-12">What you&rsquo;re noticing, and why</h2>

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

export function Reviews() {
  // Nothing ships until real reviews are pasted into lib/site.ts.
  if (reviews.length === 0) return null;

  return (
    <section className="section section--white" id="reviews">
      <div className="container">
        <p className="eyebrow">Reviews</p>
        <h2 className="h2 mt-12">What neighbors say</h2>

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

export function ServiceArea() {
  return (
    <section className="section section--white" id="service-area">
      <div className="container">
        <h2 className="h2">Where we work</h2>
        <p className="lead mt-12 max-ch">
          All of Fairfield County, Connecticut — from Greenwich up to Sherman.
        </p>

        <ul
          className="towns"
          style={{ listStyle: "none", padding: 0, margin: "24px 0 0" }}
        >
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
