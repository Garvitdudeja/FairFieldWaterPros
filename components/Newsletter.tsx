"use client";

import Script from "next/script";

// Zoho Campaigns web opt-in form, restyled to match the site. Zoho's
// optin.min.js finds the form by these exact ids and hidden fields and
// handles validation and submission itself, so keep them as-is — only the
// classes and visible copy are ours. Regenerate the embed in Zoho and copy
// the new values over if the list or form changes.
const FORM_ID =
  "sf3z76555f63656fab0a9a630e09f18c8d5678083c8a08c62ef819c6d951c45f5d7b";

declare global {
  interface Window {
    setupSF?: (...args: unknown[]) => void;
    [key: `runOnFormSubmit_${string}`]: unknown;
  }
}

export default function Newsletter() {
  return (
    <div className="newsletter" {...{ name: "signupFormContainer" }}>
      <Script
        src="https://ma.zoho.com/js/optin.min.js"
        // onReady, not onLoad: it also re-runs after client-side navigation,
        // when the script is already loaded but the form is freshly mounted.
        onReady={() => {
          window[`runOnFormSubmit_${FORM_ID}`] = () => {};
          window.setupSF?.(
            FORM_ID,
            "ZCFORMVIEW",
            false,
            "light",
            false,
            "undefined",
          );
        }}
      />

      <input type="hidden" id="signupTmplName" value="quick_form_11" />
      <input type="hidden" id="recapThemeOptin" value="0" />
      <input type="hidden" id="orgNameFull" value="fairfieldcountywaterpros" />
      <input type="hidden" id="signupFormType" value="QuickForm_Horizontal" />

      <div id={FORM_ID} data-type="signupform">
        <div id="customForm">
          {/* setupSF requires the first div in #customForm to be named
              SIGNUP_BODY; without it the script throws and the button is
              never wired up. */}
          <div className="newsletter__inner" {...{ name: "SIGNUP_BODY" }}>
            <div className="newsletter__copy">
              <span className="footer__colTitle" id="SIGNUP_HEADING">
                Join our newsletter
              </span>
              <p>
                Water quality tips and seasonal maintenance reminders. No spam.
              </p>
            </div>

            <div>
              <form
                method="POST"
                id="zcampaignOptinForm"
                className="newsletter__form"
                action="https://ywps-zngp.maillist-manage.com/weboptin.zc"
                target="_zcSignup"
              >
                {/* Must sit inside the form: on success Zoho looks for it
                    here, and if it's missing it clones the message's parent
                    element into the form instead. */}
                <div
                  id="Zc_SignupSuccess"
                  className="newsletter__success"
                  style={{ display: "none" }}
                >
                  <span id="signupSuccessMsg">Thank you for signing up.</span>
                </div>

                <div
                  id="errorMsgDiv"
                  className="newsletter__error"
                  style={{ display: "none" }}
                >
                  Please correct the marked field(s) below.
                </div>

                {/* type="text", not "email": Zoho's post-submit reset only
                    clears text inputs. inputMode still brings up the email
                    keyboard on phones. */}
                <input
                  type="text"
                  inputMode="email"
                  name="CONTACT_EMAIL"
                  id="EMBED_FORM_EMAIL_LABEL"
                  placeholder="Email"
                  aria-label="Email"
                  autoComplete="email"
                  {...{ changeitem: "SIGNUP_FORM_FIELD" }}
                />
                <input
                  type="text"
                  name="LASTNAME"
                  id="EMBED_FORM_NAME_LABEL"
                  placeholder="Name"
                  aria-label="Name"
                  autoComplete="name"
                  {...{ changeitem: "SIGNUP_FORM_FIELD" }}
                />
                <input
                  type="button"
                  className="btn btn--onDark"
                  name="SIGNUP_SUBMIT_BUTTON"
                  id="zcWebOptin"
                  value="Join now"
                />

                <input type="hidden" id="fieldBorder" value="" />
                <input
                  type="hidden"
                  id="submitType"
                  name="submitType"
                  value="optinCustomView"
                />
                <input
                  type="hidden"
                  id="emailReportId"
                  name="emailReportId"
                  value=""
                />
                <input
                  type="hidden"
                  id="formType"
                  name="formType"
                  value="QuickForm"
                />
                <input type="hidden" name="zx" id="cmpZuid" value="138024296" />
                <input type="hidden" name="zcvers" value="3.0" />
                <input
                  type="hidden"
                  name="oldListIds"
                  id="allCheckedListIds"
                  value=""
                />
                <input
                  type="hidden"
                  id="mode"
                  name="mode"
                  value="OptinCreateView"
                />
                <input
                  type="hidden"
                  id="zcld"
                  name="zcld"
                  value="117c7ff66bf5d3205"
                />
                <input
                  type="hidden"
                  id="zctd"
                  name="zctd"
                  value="117c7ff66bf5cef71"
                />
                <input type="hidden" id="document_domain" value="" />
                <input
                  type="hidden"
                  id="zc_Url"
                  value="ywps-zngp.maillist-manage.com"
                />
                <input type="hidden" id="new_optin_response_in" value="0" />
                <input
                  type="hidden"
                  id="duplicate_optin_response_in"
                  value="0"
                />
                <input
                  type="hidden"
                  name="zc_trackCode"
                  id="zc_trackCode"
                  value="ZCFORMVIEW"
                />
                <input
                  type="hidden"
                  id="zc_formIx"
                  name="zc_formIx"
                  value="3z76555f63656fab0a9a630e09f18c8d5678083c8a08c62ef819c6d951c45f5d7b"
                />
                <input type="hidden" id="viewFrom" value="URL_ACTION" />
                <span hidden id="dt_CONTACT_EMAIL">
                  1,true,6,Contact Email,2
                </span>
                <span hidden id="dt_FIRSTNAME">
                  1,false,1,First Name,2
                </span>
                <span hidden id="dt_LASTNAME">
                  1,false,1,Last Name,2
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Zoho's script toggles these if the form is set to confirm in a popup. */}
      <div id="zcOptinOverLay" style={{ display: "none" }} />
      <div
        id="zcOptinSuccessPopup"
        className="newsletter__popup"
        style={{ display: "none" }}
      >
        <div id="zcOptinSuccessPanel" />
      </div>
    </div>
  );
}
