import Image from "next/image";
import logo from "@/public/logo.jpg";
import { site } from "@/lib/site";
import { Arrow, Phone } from "./Icons";

const links = [
  { href: "#services", label: "Services" },
  { href: "#well-water", label: "Well water" },
  { href: "#radon", label: "Radon" },
  { href: "#process", label: "How it works" },
  { href: "#service-area", label: "Service area" },
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#top" className="brand" aria-label={`${site.name} — home`}>
          <span className="brand__badge">
            <Image src={logo} alt="" width={44} height={44} priority />
          </span>
          <span>
            <span className="brand__top">{site.wordmarkTop}</span>
            <span className="brand__bottom">{site.wordmarkBottom}</span>
          </span>
        </a>

        <nav className="nav" aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${site.phoneHref}`}>
            {site.phone}
          </a>
          <a
            className="header__call"
            href={`tel:${site.phoneHref}`}
            aria-label={`Call ${site.name}`}
          >
            <Phone />
          </a>
          <a className="btn btn--primary header__cta" href="#free-water-test">
            Free water test
            <Arrow />
          </a>
        </div>
      </div>
    </header>
  );
}
