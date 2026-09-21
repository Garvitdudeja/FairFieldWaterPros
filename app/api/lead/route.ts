import { NextResponse } from "next/server";
import { waterSources } from "@/lib/site";

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

const ZOHO_FORM_ID =
  process.env.ZOHO_FORM_ID ??
  "b61cb58c9e4cbc0c81b4a6a57976c78a62bfd1a17467a4f31769cbac912a4f22";

const ZOHO_FORM_KEY =
  process.env.ZOHO_FORM_KEY ??
  "791bcbde901b8c767acb96dd5946f14481c894e9f30a2ae2b113b7041aed7ad758e719e0db80acc2e23e3b0db217e744";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  source?: unknown;
  company?: unknown;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
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

  // Anything Zoho doesn't recognise would be rejected by the picklist.
  const candidate = asString(body.source);
  const source = (waterSources as readonly string[]).includes(candidate)
    ? candidate
    : "-None-";

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
    "Lead Source": "Website Inquiry",
  });

  const lead = { name, phone, source, receivedAt: new Date().toISOString() };

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
          text: `New free water test request: ${name}, ${phone} (${source})`,
          ...lead,
        }),
      });
    } catch (err) {
      console.error("Lead notification webhook failed", err, lead);
    }
  }

  return NextResponse.json({ ok: true });
}
