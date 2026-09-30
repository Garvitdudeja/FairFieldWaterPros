import type { Metadata, Viewport } from "next";
import { Schibsted_Grotesk } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { site } from "@/lib/site";
import "./globals.css";

// A variable font, so no `weight` is passed — Next pulls the whole 400–700
// range we use and self-hosts it, which kills the layout shift you get from
// a Google Fonts <link>.
//
// This is the only webfont on the site. A second one (JetBrains Mono) used to
// be loaded to set three two-digit step numbers; that wasn't worth a font
// download, so `.mono` now falls back to the system monospace stack.
const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const title = `${site.name} — Water Filtration, Softeners & Reverse Osmosis`;
const description =
  "Whole home water filtration, water softeners, carbon filtration and reverse osmosis drinking water systems for well and city water across Fairfield County, CT and the surrounding area. Written pricing, most installs in a day.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s | ${site.name}`,
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1b3a63",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sans.variable}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <StructuredData />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
