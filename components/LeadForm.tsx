"use client";

import { useId, useState, type FormEvent } from "react";
import { basementTypes, serviceTypes, waterSources } from "@/lib/site";
import { captchaUrl, zoho } from "@/lib/zoho";
import { Check } from "./Icons";

type Status = "idle" | "sending" | "sent" | "error";

/**
 * The quote form, posting straight to Zoho's web-to-lead endpoint from the
 * visitor's browser — the same request Zoho's own snippet makes.
 *
 * It has to be the browser rather than our server: Zoho ties the captcha
 * answer to a session cookie set when the captcha image loads, so only the
 * browser that loaded the image can submit a valid answer.
 *
 * Every `name` below is Zoho's and must match the web form exactly. Change
 * one and that answer arrives blank on the lead, or the lead is rejected.
 */
export default function LeadForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");
  // Bumping this reloads the captcha image with a fresh puzzle.
  const [captchaNonce, setCaptchaNonce] = useState(() => Date.now());

  // Keeps the ids unique if this form ever appears twice on one page.
  const uid = useId();
  const id = (field: string) => `${uid}-${field}`;

  function reloadCaptcha() {
    setCaptchaNonce(Date.now());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const read = (field: string) => String(formData.get(field) ?? "").trim();

    // Bots fill the hidden field. Pretend it worked and send nothing.
    if (read("aG9uZXlwb3Q")) {
      setStatus("sent");
      return;
    }

    const required: ReadonlyArray<readonly [string, string]> = [
      ["First Name", "your first name"],
      ["Last Name", "your last name"],
      ["Email", "an email address"],
      ["Phone", "a phone number"],
      ["Address - City", "your town"],
      ["LEADCF1", "your water source"],
      ["LEADCF9", "your basement type"],
      ["enterdigest", "the characters from the image"],
    ];

    const missing = required.find(([field]) => !read(field));

    if (missing) {
      setStatus("error");
      setError(`Please add ${missing[1]}.`);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(read("Email"))) {
      setStatus("error");
      setError("That email address doesn't look right. Please check it.");
      return;
    }

    setStatus("sending");

    try {
      // No `credentials` option, matching Zoho's own snippet — adding one
      // would fail CORS outright rather than help.
      const response = await fetch(zoho.endpoint, {
        method: "POST",
        body: formData,
        cache: "no-cache",
      });

      const contentType = response.headers.get("Content-Type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();

      const asText = typeof data === "string" ? data : JSON.stringify(data);

      if (/invalidCaptcha|captcha_error/i.test(asText)) {
        setStatus("error");
        setError("That captcha didn't match. Please try the new image.");
        reloadCaptcha();
        form.querySelector<HTMLInputElement>('[name="enterdigest"]')?.focus();
        return;
      }

      if (/error_msg/i.test(asText)) {
        setStatus("error");
        setError("Something went wrong on our end. Please call us instead — we'll pick up.");
        reloadCaptcha();
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong on our end. Please call us instead — we'll pick up.");
      reloadCaptcha();
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
      {/* Zoho's own hidden fields. Without these the lead is rejected. */}
      <input type="hidden" name="xnQsjsdp" value={zoho.formId} readOnly />
      <input type="hidden" name="xmIwtLD" value={zoho.formKey} readOnly />
      <input type="hidden" name="actionType" value={zoho.actionType} readOnly />
      <input type="hidden" name="returnURL" value="null" readOnly />
      <input type="hidden" name="Lead Source" value={zoho.leadSource} readOnly />

      <div className="field-pair">
        <div className="field">
          <label htmlFor={id("firstName")}>First name</label>
          <input
            id={id("firstName")}
            name="First Name"
            type="text"
            autoComplete="given-name"
            maxLength={40}
            required
          />
        </div>

        <div className="field">
          <label htmlFor={id("lastName")}>Last name</label>
          <input
            id={id("lastName")}
            name="Last Name"
            type="text"
            autoComplete="family-name"
            maxLength={80}
            required
          />
        </div>
      </div>

      <div className="field-pair">
        <div className="field">
          <label htmlFor={id("email")}>Email</label>
          <input
            id={id("email")}
            name="Email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={100}
            required
          />
        </div>

        <div className="field">
          <label htmlFor={id("phone")}>Phone</label>
          {/* The placeholder uses the reserved 555-01xx fictional range, so it
              can't be mistaken for the business's own number. */}
          <input
            id={id("phone")}
            name="Phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="(475) 555-0100"
            maxLength={30}
            required
          />
        </div>
      </div>

      <div className="field-pair">
        <div className="field">
          <label htmlFor={id("city")}>Town</label>
          <input
            id={id("city")}
            name="Address - City"
            type="text"
            autoComplete="address-level2"
            placeholder="Shelton"
            maxLength={255}
            required
          />
        </div>

        <div className="field">
          <label htmlFor={id("source")}>Water source</label>
          {/* Required in Zoho, so it opens unanswered rather than defaulting
              to a guess that would land in the CRM as fact. */}
          <select id={id("source")} name="LEADCF1" defaultValue="" required>
            <option value="" disabled>
              Choose one…
            </option>
            {waterSources.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field-pair">
        <div className="field">
          <label htmlFor={id("basementType")}>Basement type</label>
          <select id={id("basementType")} name="LEADCF9" defaultValue="" required>
            <option value="" disabled>
              Choose one…
            </option>
            {basementTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor={id("serviceType")}>
            Interested in <span className="field__opt">optional</span>
          </label>
          <select id={id("serviceType")} name="LEADCF7" defaultValue="-None-">
            <option value="-None-">Not sure yet</option>
            {serviceTypes.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="field captcha">
        <label htmlFor={id("captcha")}>Enter the characters shown</label>
        <div className="captcha__row">
          {/* Loading this image is what gives the browser the Zoho session
              cookie the captcha answer is checked against. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="captcha__img"
            src={captchaUrl(captchaNonce)}
            alt="Captcha characters"
            width={120}
            height={40}
          />
          <button type="button" className="captcha__reload" onClick={reloadCaptcha}>
            Reload
          </button>
        </div>
        <input
          id={id("captcha")}
          name="enterdigest"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          maxLength={10}
          required
        />
      </div>

      {/* Spam trap — Zoho's own honeypot field name. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={id("company")}>Company</label>
        <input
          id={id("company")}
          name="aG9uZXlwb3Q"
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
