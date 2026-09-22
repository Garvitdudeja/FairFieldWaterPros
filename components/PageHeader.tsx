import Link from "next/link";

/**
 * The banner at the top of every page except Home. Keeps the inner pages
 * looking like one site rather than three separate templates.
 */
export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro: string;
}) {
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
    </section>
  );
}
