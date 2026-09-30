import { NextResponse } from "next/server";
import { basementTypes, serviceTypes, waterSources } from "@/lib/site";

export const runtime = "nodejs";

/**
 * ---------------------------------------------------------------------------
 * Leads from the website go into Zoho CRM, via its Web-to-Lead endpoint.
 *
 * The two long values below come from the form Zoho generated for this
 * account (`xnQsjsdp` and `xmIwtLD` in Zoho's HTML snippet). They decide
 * which CRM account the lead lands in. They are not passwords — they are
 * visible in any embedded Zoho form — but if you ever regenerate the form in
 * Zoho, paste the new values here, or set them as environment variables.
 *
 * We post from the server rather than the browser so that ad blockers and
 * cross-origin rules can't quietly drop a customer's request.
 * ---------------------------------------------------------------------------
 */
const ZOHO_ENDPOINT = "https://crm.zoho.com/crm/WebToLeadForm";

/** Blank counts as unset — an environment variable that exists but is empty
 *  would otherwise send Zoho an empty form id and lose every lead. */
function envOr(raw: string | undefined, fallback: string): string {
  const value = raw?.trim();
  return value ? value : fallback;
}

// Regenerated in Zoho on 2026-10-01 (second revision that day). Every earlier
// pair is dead — a lead sent with old values goes nowhere, and the visitor
// still sees a success message. Re-paste these whenever the form is rebuilt.
const ZOHO_FORM_ID = envOr(
  process.env.ZOHO_FORM_ID,
  "ca60b984109afc78e4978d886a2205f8e04492a50deef679671f679e2c11ce3f",
);

const ZOHO_FORM_KEY = envOr(
  process.env.ZOHO_FORM_KEY,
  "c9e24b4e7b903951c904e19988acf1d5776a5e91fec37cf6b39ce2bde275f838df2bde629215104e64c00f4a479d1232",
);

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  source?: unknown;
  location?: unknown;
  serviceType?: unknown;
  basementType?: unknown;
  company?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

/**
 * Zoho picklists reject values they don't know, so anything unexpected is
 * sent as "-None-" rather than risking the whole lead.
 */
function asChoice(value: unknown, allowed: readonly string[]): string {
  const candidate = asString(value);
  return allowed.includes(candidate) ? candidate : "-None-";
}

export async function POST(request: Request) {
  let body: LeadPayload;

  try {
    body = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const name = asString(body.name);
  const phone = asString(body.phone);
  const honeypot = asString(body.company);

  const source = asChoice(body.source, waterSources);
  const serviceType = asChoice(body.serviceType, serviceTypes);
  const basementType = asChoice(body.basementType, basementTypes);

  // Free text. Zoho's own field caps at 255 characters, so trim to match
  // rather than have it reject the lead.
  const location = asString(body.location).slice(0, 255);

  // A bot filled the hidden field. Answer 200 so it thinks it succeeded,
  // and don't waste a CRM record on it.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required" },
      { status: 400 },
    );
  }

  // Field names are Zoho's, not ours — they must be spelled exactly like this.
  const zohoFields = new URLSearchParams({
    xnQsjsdp: ZOHO_FORM_ID,
    xmIwtLD: ZOHO_FORM_KEY,
    actionType: "TGVhZHM=", // base64 "Leads"
    returnURL: "null",
    "Last Name": name,
    Phone: phone,
    LEADCF1: source, // Water Source
    LEADCF7: serviceType, // Service Type
    LEADCF8: location, // Location
    LEADCF9: basementType, // Basement type
    "Lead Source": "Website Inquiry",
  });

  const lead = {
    name,
    phone,
    source,
    location,
    serviceType,
    basementType,
    receivedAt: new Date().toISOString(),
  };

  try {
    const zoho = await fetch(ZOHO_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: zohoFields,
      // Zoho answers a successful submission with a redirect. That is a
      // success, not something to follow.
      redirect: "manual",
      cache: "no-store",
    });

    const accepted = zoho.ok || (zoho.status >= 300 && zoho.status < 400);

    if (!accepted) {
      // Log the lead so a Zoho outage never loses a customer outright.
      console.error("Zoho rejected lead with status", zoho.status, lead);
      return NextResponse.json(
        { ok: false, error: "Could not deliver the request" },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("Zoho submission failed", err, lead);
    return NextResponse.json(
      { ok: false, error: "Could not deliver the request" },
      { status: 502 },
    );
  }

  // Optional second copy of the lead — a Slack or email webhook, so you hear
  // about it without opening the CRM. Never fails the customer's request:
  // the lead is already safely in Zoho by this point.
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New quote request: ${name}, ${phone} — ${source}${
            location ? `, ${location}` : ""
          }`,
          ...lead,
        }),
      });
    } catch (err) {
      console.error("Lead notification webhook failed", err, lead);
    }
  }

  return NextResponse.json({ ok: true });
}
