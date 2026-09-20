import { sampleReport, site } from "@/lib/site";
import { Arrow, Check, Phone } from "./Icons";

function SampleReport() {
  return (
    <div className="report">
      <div className="report__head">
        <span>Sample water report</span>
        <span className="report__loc mono">{sampleReport.location}</span>
      </div>

      <div className="mt-16">
        {sampleReport.rows.map((row) => (
          <div className="report__row" key={row.label}>
            <span className="report__label">{row.label}</span>
            <span className="report__vals">
              <span className="report__value mono">{row.value}</span>
              <span
                className={row.severity === "warn" ? "chip chip--warn" : "chip chip--info"}
              >
                {row.flag}
              </span>
            </span>
          </div>
        ))}
      </div>

      <p className="report__rec">
        <Check />
        <span>
          <strong style={{ color: "var(--navy)", fontWeight: 600 }}>Recommended:</strong>{" "}
          {sampleReport.recommendation}
        </span>
      </p>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="section section--canvas" id="top">
      <div className="container hero">
        <div>
          <p className="hero__flag">
            <span className="dot" />
            <span className="eyebrow">
              Serving all of Fairfield County, {site.address.region}
            </span>
          </p>

          <h1 className="h1 mt-16">Water worth drinking, from every tap.</h1>

          <p className="lead mt-24 max-ch">
            Whole-home filtration, softeners, radon removal and well pump service — sized to
            what your water test actually says, not to what we have on the truck.
          </p>

          <div className="btn-row mt-32">
            <a className="btn btn--primary" href="#free-water-test">
              Book a free water test
              <Arrow />
            </a>
            <a className="btn btn--secondary" href={`tel:${site.phoneHref}`}>
              <Phone />
              Call {site.phone}
            </a>
          </div>

          <p className="hero__trust mt-32">
            <span>Licensed &amp; insured</span>
            <span className="sep" aria-hidden="true" />
            <span>CT-certified water treatment</span>
            <span className="sep" aria-hidden="true" />
            <span>Same-day pump service</span>
          </p>
        </div>

        <SampleReport />
      </div>
    </section>
  );
}
