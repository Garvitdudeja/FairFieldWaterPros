/**
 * ---------------------------------------------------------------------------
 * EDIT THIS FILE FIRST.
 *
 * Almost everything you will want to change about the site lives here:
 * phone number, address, services, towns, reviews. Change a value, save,
 * and the page updates. You should not need to touch the components.
 *
 * Anything marked TODO is a blank you need to fill in. Blanks are hidden
 * on the live site rather than shown as empty boxes, so it is safe to
 * deploy before you have filled them all in.
 * ---------------------------------------------------------------------------
 */

export type Service = {
  id: string;
  title: string;
  body: string;
  /** Key into the ICONS map in components/Icons.tsx */
  icon: "droplet" | "funnel" | "flask" | "shield" | "house" | "gauge";
};

export type Stat = {
  /** Leave the value as an empty string and the whole stat is hidden. */
  value: string;
  label: string;
};

export type Review = {
  quote: string;
  name: string;
  town: string;
  service: string;
};

export type SymptomRow = {
  notice: string;
  cause: string;
  fix: string;
};

export const site = {
  name: "Fairfield County Water Pros",
  /** Shown next to the badge in the header and footer. */
  wordmarkTop: "Fairfield County",
  wordmarkBottom: "Water Pros",

  tagline:
    "Whole-home water filtration, radon removal and well pump service across Fairfield County, Connecticut.",

  // TODO: your real phone number.
  // `phone` is what people read. `phoneHref` is what the link dials —
  // it must be digits only, with +1 in front, no spaces or brackets.
  phone: "(203) 000-0000",
  phoneHref: "+12030000000",

  // TODO: your real email address.
  email: "hello@fairfieldcountywaterpros.com",

  // TODO: your real business address. Leave blank and it is hidden.
  address: {
    street: "",
    locality: "",
    region: "CT",
    postalCode: "",
  },

  // TODO: your hours and CT license number. Blank values are hidden.
  hours: "Mon–Sat, 7am–7pm",
  license: "",

  /** Set NEXT_PUBLIC_SITE_URL in Vercel once you have a domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fairfieldcountywaterpros.com",
} as const;

/**
 * The numbers under the hero. A stat with an empty value disappears,
 * so nothing unverified ever ships. Fill these in when you have them.
 */
export const stats: Stat[] = [
  { value: "Free", label: "On-site water testing" },
  { value: "1 day", label: "Typical whole-home install" },
  { value: "Same day", label: "Emergency pump service" },
  // TODO: e.g. { value: "1,200+", label: "Systems installed" }
  { value: "", label: "Systems installed" },
];

export const services: Service[] = [
  {
    id: "well-water",
    title: "Well water treatment",
    body: "Iron, sulfur odor, sediment, staining and low pH — handled with a system built around your well's numbers, not a package deal.",
    icon: "droplet",
  },
  {
    id: "softeners",
    title: "Water softeners",
    body: "Cut the calcium and magnesium that scale fixtures, dull laundry, dry out skin and quietly shorten the life of the water heater.",
    icon: "funnel",
  },
  {
    id: "reverse-osmosis",
    title: "Reverse osmosis",
    body: "Under-sink drinking water filtered down to the dissolved solids — for coffee, cooking, ice and the kids' glasses.",
    icon: "flask",
  },
  {
    id: "radon",
    title: "Radon in water",
    body: "Our bedrock wells carry it, and it leaves the water as you shower. A lab test is the only way to find it; aeration or GAC takes it out.",
    icon: "shield",
  },
  {
    id: "city-water",
    title: "City water treatment",
    body: "On the public line, the water still arrives with chlorine, sediment and hardness. Carbon and a softener deal with all three where it comes in.",
    icon: "house",
  },
  {
    id: "pumps",
    title: "Well pumps & pressure tanks",
    body: "No water, pressure that drops out, or a pump that short-cycles — diagnosed and replaced, usually the same day you call.",
    icon: "gauge",
  },
];

export const process = [
  {
    step: "01",
    title: "We test your water",
    body: "On site, at your kitchen sink: hardness, iron, pH, sulfur and TDS, plus a look at whatever equipment is already down there. Free, and no obligation.",
  },
  {
    step: "02",
    title: "We size the right system",
    body: "You get the options, the sizing and the price in writing — including what it costs to run each year in salt, media and service.",
  },
  {
    step: "03",
    title: "We install it properly",
    body: "Most whole-home installs finish in a day. We flush the lines, set it up with you, retest at the tap and haul the old gear away.",
  },
];

export const symptoms: SymptomRow[] = [
  {
    notice: "Orange-brown staining in sinks and tubs",
    cause: "Dissolved iron in well water",
    fix: "Air-injection iron filter",
  },
  {
    notice: "Rotten-egg smell, worse from hot taps",
    cause: "Hydrogen sulfide",
    fix: "Catalytic carbon or aeration",
  },
  {
    notice: "Scale on fixtures, dull laundry, dry skin",
    cause: "Calcium and magnesium hardness",
    fix: "Ion-exchange softener",
  },
  {
    notice: "Nothing at all — no taste, smell or color",
    cause: "Radon, arsenic or uranium from bedrock",
    fix: "Lab test, then aeration or GAC",
  },
  {
    notice: "Chlorine taste, pool smell in the shower",
    cause: "Chlorine or chloramine in city supply",
    fix: "Whole-home carbon filter",
  },
  {
    notice: "Blue-green stains, pinholes in copper",
    cause: "Low pH, acidic water",
    fix: "Acid neutralizer",
  },
  {
    notice: "Pressure that surges or drops out",
    cause: "Failing pump or waterlogged tank",
    fix: "Pump and pressure tank service",
  },
];

/**
 * The sample report card in the hero. These are illustrative numbers for a
 * typical Fairfield County bedrock well — the card is labelled "Sample report"
 * on the page so nobody mistakes it for a specific customer's results.
 */
export const sampleReport = {
  location: "bedrock well · Ridgefield",
  rows: [
    { label: "Hardness", value: "14.2 gpg", flag: "Very hard", severity: "warn" as const },
    { label: "Iron", value: "1.8 ppm", flag: "Staining", severity: "warn" as const },
    { label: "Radon in water", value: "8,400 pCi/L", flag: "Above CT action level", severity: "warn" as const },
    { label: "pH", value: "5.9", flag: "Acidic", severity: "info" as const },
  ],
  recommendation:
    "radon aeration first, then iron filter, neutralizer and softener — in that order.",
};

/**
 * TODO: paste real reviews from Google or Yelp, in the customer's own words.
 *
 * While this array is empty the whole reviews section is left off the page.
 * Never invent these — made-up testimonials are both illegal to publish as
 * genuine and the easiest thing for a neighbor to catch.
 */
export const reviews: Review[] = [
  // {
  //   quote: "Matt tested our well, found iron and radon, and had the system in the next week. No hard sell at all.",
  //   name: "Sarah K.",
  //   town: "Ridgefield",
  //   service: "Iron filter + radon aeration",
  // },
];

/** All 23 towns in Fairfield County. Trim to the ones you actually cover. */
export const towns = [
  "Bethel",
  "Bridgeport",
  "Brookfield",
  "Danbury",
  "Darien",
  "Easton",
  "Fairfield",
  "Greenwich",
  "Monroe",
  "New Canaan",
  "New Fairfield",
  "Newtown",
  "Norwalk",
  "Redding",
  "Ridgefield",
  "Shelton",
  "Sherman",
  "Stamford",
  "Stratford",
  "Trumbull",
  "Weston",
  "Westport",
  "Wilton",
];

/** Equipment brands you carry. Empty by default so no logo row ships blank. */
export const brands: string[] = [
  // "Kinetico",
  // "Fleck",
  // "Pentair",
];
