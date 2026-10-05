/**
 * ---------------------------------------------------------------------------
 * Zoho CRM web-to-lead settings.
 *
 * These come straight out of the HTML snippet Zoho generates for the form
 * (Setup > Developer Hub > Webforms). They are not passwords — they are
 * visible in any embedded Zoho form — but they change every time the form is
 * rebuilt, and an old pair sends leads nowhere. After any rebuild, re-paste
 * the two values below.
 *
 * The form posts straight from the visitor's browser to Zoho, the same way
 * Zoho's own snippet does. That matters: the captcha answer is tied to a
 * session cookie that Zoho sets when the browser loads the captcha image, so
 * the submission has to come from that same browser.
 * ---------------------------------------------------------------------------
 */
export const zoho = {
  endpoint: "https://crm.zoho.com/crm/WebToLeadForm",

  /** `xnQsjsdp` in the snippet. */
  formId: "ca7d74c2630e46014488c15e050faf51653b06187099c4dc0593fdfa1d32cd10",

  /** `xmIwtLD` in the snippet. */
  formKey:
    "f5a48764aad8d3f68411804d042ca37590aa7f40d8cdd3ddd7a291814e08a829e3398ab601c36684913bf3f29839c88a",

  /** base64 "Leads" — tells Zoho which module the record belongs to. */
  actionType: "TGVhZHM=",

  /** Set on every lead so you can tell website enquiries from other sources. */
  leadSource: "Website Inquiry",
} as const;

/**
 * The captcha image URL. Note Zoho's parameter names are crossed over from
 * what you'd expect: `formId` takes the form KEY and `grpid` takes the form
 * ID. Copied from the snippet as-is.
 *
 * `nonce` busts the browser cache so "Reload" fetches a fresh puzzle.
 */
export function captchaUrl(nonce: number): string {
  const params = new URLSearchParams({
    formId: zoho.formKey,
    grpid: zoho.formId,
    d: String(nonce),
  });
  return `https://crm.zoho.com/crm/CaptchaServlet?${params}`;
}
