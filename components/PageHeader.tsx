import Link from "next/link";
import { site } from "@/lib/site";

/**
 * The banner at the top of every page except Home. Keeps the inner pages
 * looking like one site rather than three separate templates, and emits the
 * breadcrumb markup Google uses to show a path instead of a bare URL in
 * search results.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
  path,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  /** This page's URL path, e.g. "/services". Used for breadcrumb markup. */
  path: string;
}) {
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${site.url}${path}`,
      },
    ],
  };

  return (
    <section className="pagehead">
      <div className="container">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <p className="eyebrow mt-16">{eyebrow}</p>
        <h1 className="h1 mt-12">{title}</h1>
        <p className="lead mt-16 max-ch">{intro}</p>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
    </section>
  );
}
