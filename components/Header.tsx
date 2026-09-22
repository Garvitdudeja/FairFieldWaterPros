"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/public/logo.jpg";
import { nav, site } from "@/lib/site";
import { Arrow, Phone } from "./Icons";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="header__inner">
        <Link href="/" className="brand" aria-label={`${site.name} — home`}>
          <span className="brand__badge">
            <Image src={logo} alt="" width={44} height={44} priority />
          </span>
          <span>
            <span className="brand__top">{site.wordmarkTop}</span>
            <span className="brand__bottom">{site.wordmarkBottom}</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {nav.map((link) => {
            // "/" should only light up on the home page itself; the others
            // also match their sub-pages.
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "is-active" : undefined}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
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
          <Link className="btn btn--primary header__cta" href="/contact">
            Request a quote
            <Arrow />
          </Link>
        </div>
      </div>
    </header>
  );
}
