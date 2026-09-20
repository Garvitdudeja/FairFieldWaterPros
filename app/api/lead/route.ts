import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  const source = asString(body.source) || "Not specified";
  const honeypot = asString(body.company);

  // A bot filled the hidden field. Answer 200 so it thinks it succeeded.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required" },
      { status: 400 },
    );
  }

  const lead = {
    name,
    phone,
    source,
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (webhook) {
    try {
      const forwarded = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `New free water test request: ${name}, ${phone} (${source})`,
          ...lead,
        }),
      });

      if (!forwarded.ok) {
        console.error("Lead webhook responded with", forwarded.status, lead);
        return NextResponse.json(
          { ok: false, error: "Could not deliver the request" },
          { status: 502 },
        );
      }
    } catch (err) {
      console.error("Lead webhook failed", err, lead);
      return NextResponse.json(
        { ok: false, error: "Could not deliver the request" },
        { status: 502 },
      );
    }
  } else {
    // No webhook configured yet — the lead still lands in the runtime logs.
    // In Vercel: Project > Logs. Set LEAD_WEBHOOK_URL to get it emailed instead.
    console.log("NEW LEAD", lead);
  }

  return NextResponse.json({ ok: true });
}
