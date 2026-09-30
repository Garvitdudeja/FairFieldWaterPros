"use client";

import { useId, useState, type FormEvent } from "react";
import { basementTypes, serviceTypes, waterSources } from "@/lib/site";
import { Check } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The quote form. Posts to /api/lead, which forwards it into Zoho CRM.
 *
 * `compact` drops the two qualifying dropdowns (service type, basement type).
 * The hero uses it so the form stays short where someone has only just landed;
 * the Contact page asks everything. Both are optional in Zoho, so a compact
 * submission is a complete lead either way.
 */
export default function LeadForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  // Keeps the ids unique if this form ever appears twice on one page.
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const formData = new FormData(event.currentTarget);
    const read = (field: string) => String(formData.get(field) ?? "").trim();

    const payload = {
      name: read("name"),
      phone: read("phone"),
      source: read("source"),
      location: read("location"),
      serviceType: read("serviceType"),
      basementType: read("basementType"),
      // Honeypot: real people leave this empty because they never see it.
      company: read("company"),
    };

    if (!payload.name || !payload.phone) {
      setStatus("error");
      setError("Please add your name and a phone number so we can call you back.");
      return;
    }

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Request failed");

      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong on our end. Please call us instead — we'll pick up.");
    }
  }

  if (status === "sent") {
    return (
      <div className="form__success">
        <span className="card__icon" style={{ margin: "0 auto" }}>
          <Check />
        </span>
        <h3 className="h3">Request received</h3>
        <p>
          We&rsquo;ll call you back to talk through the options, usually the same business
          day.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor={id("name")}>Name</label>
        <input id={id("name")} name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor={id("phone")}>Phone</label>
        {/* The placeholder uses the reserved 555-01xx fictional range, so it
            can't be mistaken for the business's own number. */}
        <input
          id={id("phone")}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(475) 555-0100"
          required
        />
      </div>

      <div className="field">
        <label htmlFor={id("location")}>Town</label>
        <input
          id={id("location")}
          name="location"
          type="text"
          autoComplete="address-level2"
          placeholder="Shelton"
          maxLength={255}
        />
      </div>

      <div className="field">
        <label htmlFor={id("source")}>Water source</label>
        <select id={id("source")} name="source" defaultValue={waterSources[0]}>
          {waterSources.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {!compact && (
        <>
          <div className="field">
            <label htmlFor={id("serviceType")}>What are you after?</label>
            {/* An empty value reaches Zoho as "-None-", so nobody has to
                guess at a system before they've spoken to anyone. */}
            <select id={id("serviceType")} name="serviceType" defaultValue="">
              <option value="">Not sure yet</option>
              {serviceTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor={id("basementType")}>Basement type</label>
            <select id={id("basementType")} name="basementType" defaultValue="">
              <option value="">Not sure</option>
              {basementTypes.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </>
      )}

      {/* Spam trap — hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        className="btn btn--primary btn--block"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Request a quote"}
      </button>

      {status === "error" && (
        <p className="form__error" role="alert">
          {error}
        </p>
      )}

      <p className="form__note">
        We&rsquo;ll call you back to talk it through. No automated sales calls.
      </p>
    </form>
  );
}
