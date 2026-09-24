"use client";

import { useState, type FormEvent } from "react";
import { waterSources } from "@/lib/site";
import { Check } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      source: String(formData.get("source") ?? "").trim(),
      // Honeypot: real people leave this empty because they never see it.
      company: String(formData.get("company") ?? "").trim(),
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
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="field">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(203) 000-0000"
          required
        />
      </div>

      <div className="field">
        <label htmlFor="source">Water source</label>
        <select id="source" name="source" defaultValue={waterSources[0]}>
          {waterSources.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>

      {/* Spam trap — hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="btn btn--primary btn--block" type="submit" disabled={status === "sending"}>
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
