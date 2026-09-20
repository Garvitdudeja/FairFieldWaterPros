import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 20px",
      }}
    >
      <p className="eyebrow">404</p>
      <h1 className="h2 mt-12">That page isn&rsquo;t here</h1>
      <p className="lead mt-16" style={{ maxWidth: "46ch" }}>
        The page you were after has moved or never existed. Head back to the homepage, or
        call us and we&rsquo;ll point you the right way.
      </p>
      <div className="btn-row mt-32">
        <Link className="btn btn--primary" href="/">
          Back to the homepage
        </Link>
        <a className="btn btn--secondary" href={`tel:${site.phoneHref}`}>
          Call {site.phone}
        </a>
      </div>
    </main>
  );
}
