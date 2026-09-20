import Image from "next/image";
import logo from "@/public/logo.jpg";
import { site } from "@/lib/site";
import { Arrow } from "./Icons";

export function FinalCta() {
  return (
    <section className="cta">
      <div className="cta__inner">
        <h2>Stop guessing about your water.</h2>
        <p>
          A free test takes about twenty minutes and tells you exactly what, if anything,
          needs fixing.
        </p>
        <div className="btn-row">
          <a className="btn btn--onDark" href="#free-water-test">
            Book a free water test
            <Arrow />
          </a>
          <a className="btn btn--ghostOnDark" href={`tel:${site.phoneHref}`}>
            Call {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Footer() {
  const { street, locality, region, postalCode } = site.address;
  const hasAddress = Boolean(street && locality);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__cols">
          <div>
            <div className="brand">
              <span className="footer__badge">
                <Image src={logo} alt="" width={52} height={52} />
              </span>
              <span>
                <span className="brand__top">{site.wordmarkTop}</span>
                <span className="brand__bottom">{site.wordmarkBottom}</span>
              </span>
            </div>

            <p className="mt-16">{site.tagline}</p>

            {hasAddress && (
              <p className="mt-16">
                {street}
                <br />
                {locality}, {region} {postalCode}
              </p>
            )}
          </div>

          <div>
            <span className="footer__colTitle">Services</span>
            <ul className="footer__list">
              <li>
                <a href="#well-water">Well water treatment</a>
              </li>
              <li>
                <a href="#softeners">Water softeners</a>
              </li>
              <li>
                <a href="#radon">Radon in water</a>
              </li>
              <li>
                <a href="#pumps">Well pumps</a>
              </li>
            </ul>
          </div>

          <div>
            <span className="footer__colTitle">Company</span>
            <ul className="footer__list">
              <li>
                <a href="#process">How it works</a>
              </li>
              <li>
                <a href="#symptoms">Symptoms and causes</a>
              </li>
              <li>
                <a href="#service-area">Service area</a>
              </li>
              <li>
                <a href="#free-water-test">Free water test</a>
              </li>
            </ul>
          </div>

          <div>
            <span className="footer__colTitle">Contact</span>
            <ul className="footer__list">
              <li>
                <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {site.hours && <li><span>{site.hours}</span></li>}
              {site.license && <li><span>CT license #{site.license}</span></li>}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {site.name}. All rights reserved.
          </span>
          <span>Serving Fairfield County, Connecticut</span>
        </div>
      </div>
    </footer>
  );
}
