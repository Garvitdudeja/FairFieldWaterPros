/**
 * ---------------------------------------------------------------------------
 * EDIT THIS FILE FIRST.
 *
 * Almost everything you will want to change about the site lives here:
 * phone number, address, services, towns, reviews, FAQs. Change a value,
 * save, and the pages update. You should not need to touch the components.
 *
 * Anything marked TODO is a blank you need to fill in. Blanks are hidden
 * on the live site rather than shown as empty boxes, so it is safe to
 * deploy before you have filled them all in.
 *
 * One rule worth keeping: don't fill a blank with something you can't back
 * up. Years in business, job counts and reviews are the first things a
 * competitor or a customer will check.
 * ---------------------------------------------------------------------------
 */

export type Service = {
  id: string;
  title: string;
  /** One or two sentences. Used on the service cards. */
  body: string;
  /** Bullet points shown on the Services page under each service. */
  includes: string[];
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

export type Faq = {
  question: string;
  answer: string;
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

  /** Set to "" if you don't actually offer after-hours service. */
  emergencyNote: "Emergency well pump service available same day.",

  /** Set NEXT_PUBLIC_SITE_URL in Vercel once you have a domain. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.fairfieldcountywaterpros.com",
} as const;

/** The main navigation, in order. Used by the header and the footer. */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

/**
 * The "Water source" choices in the contact form.
 *
 * These must match the options on the "Water Source" field in Zoho CRM
 * word for word. If they don't, the answer arrives blank on the lead.
 */
export const waterSources = ["Private well", "City water", "Not sure"] as const;

export const services: Service[] = [
  {
    id: "well-water",
    title: "Well Water Treatment",
    body: "Iron, sulfur odor, sediment, staining and low pH are the usual findings on a Fairfield County bedrock well. The system is built around your well's test numbers.",
    includes: [
      "Air-injection iron and manganese filters",
      "Catalytic carbon and aeration for sulfur odor",
      "Acid neutralizers for low pH and copper pitting",
      "Sediment filtration and UV disinfection",
    ],
    icon: "droplet",
  },
  {
    id: "softeners",
    title: "Water Softeners",
    body: "Calcium and magnesium scale fixtures, dull laundry and shorten the life of a water heater. A correctly sized softener removes them at the point of entry.",
    includes: [
      "Sizing based on measured hardness and household use",
      "Metered regeneration, so you buy less salt",
      "Salt-efficient and twin-tank options",
      "Existing softener service, repair and rebuild",
    ],
    icon: "funnel",
  },
  {
    id: "reverse-osmosis",
    title: "Reverse Osmosis Drinking Water",
    body: "An under-sink system for the water you drink and cook with, filtered down to the dissolved solids that whole-home equipment is not designed to catch.",
    includes: [
      "Under-sink installation with a dedicated faucet",
      "Refrigerator and ice maker connections",
      "Remineralization options for taste",
      "Annual filter changes and membrane replacement",
    ],
    icon: "flask",
  },
  {
    id: "radon",
    title: "Radon in Water Removal",
    body: "Radon travels through bedrock into well water and leaves it as vapor during showers and laundry. It has no taste, smell or color, so a lab test is the only way to find it.",
    includes: [
      "Lab testing for radon in water",
      "Aeration systems for higher concentrations",
      "Granular activated carbon (GAC) for lower ones",
      "Retesting after installation to confirm the result",
    ],
    icon: "shield",
  },
  {
    id: "city-water",
    title: "City Water Treatment",
    body: "Public water arrives treated, but still carries chlorine or chloramine, sediment and hardness. Carbon filtration and a softener address all three where the line enters the house.",
    includes: [
      "Whole-home carbon for chlorine and chloramine taste",
      "Sediment pre-filtration",
      "Softening for scale and appliance life",
      "Point-of-use drinking water systems",
    ],
    icon: "house",
  },
  {
    id: "pumps",
    title: "Well Pumps & Pressure Tanks",
    body: "No water, pressure that surges or drops out, or a pump that short-cycles. We diagnose the cause rather than replacing parts in sequence.",
    includes: [
      "Submersible and jet pump diagnosis and replacement",
      "Pressure tank replacement and re-charging",
      "Pressure switch, wiring and control box repair",
      "Same-day service for a house with no water",
    ],
    icon: "gauge",
  },
];

/** The "How it works" steps. Named `processSteps`, not `process`, so it does
 *  not shadow Node's global `process` inside this module. */
export const processSteps = [
  {
    step: "01",
    title: "We test your water",
    body: "On site, at your kitchen sink: hardness, iron, pH, sulfur and TDS, plus a look at whatever equipment is already installed. Free, with no obligation to buy.",
  },
  {
    step: "02",
    title: "We size the right system",
    body: "You get the options, the sizing and the price in writing — including what each one costs to run per year in salt, media and filters.",
  },
  {
    step: "03",
    title: "We install it properly",
    body: "Most whole-home installs finish in a day. We flush the lines, set the system up with you, retest at the tap and take the old equipment away.",
  },
];

/**
 * The "Why homeowners choose us" points, used on the Home and About pages.
 *
 * Keep these to things you can actually demonstrate on every job. A claim
 * you can't meet is worse than no claim.
 */
export const whyUs = [
  {
    title: "We test before we recommend",
    body: "Every recommendation starts with your water's actual numbers, not a package chosen before we arrive.",
  },
  {
    title: "Pricing in writing",
    body: "You see the equipment, the installed price and the annual running cost before anything is ordered.",
  },
  {
    title: "Systems sized to your house",
    body: "Sizing follows measured hardness, iron and household demand, so the system isn't over- or under-built.",
  },
  {
    title: "Local to Fairfield County",
    body: "We work on the same bedrock wells and the same municipal supplies every day, across all 23 towns.",
  },
  {
    title: "Licensed and insured",
    body: "Connecticut licensed and fully insured, with the paperwork available before we start.",
  },
  {
    title: "We service what we install",
    body: "Filter changes, salt, media and repairs afterwards — including equipment other companies installed.",
  },
];

/**
 * The About page copy.
 *
 * TODO: this is deliberately written without a founding year, owner name or
 * job count, because those have to be yours. Fill in `since` and `ownerName`
 * and the extra lines appear; leave them blank and they stay off the page.
 */
export const about = {
  /** TODO: e.g. "2011". Blank hides the sentence that uses it. */
  since: "",
  /** TODO: e.g. "Matt Reynolds". Blank hides the signature line. */
  ownerName: "",
  /** TODO: e.g. "Owner" or "Owner & Lead Technician". */
  ownerTitle: "Owner",

  paragraphs: [
    "Fairfield County Water Pros treats water for homes across Fairfield County, Connecticut — private bedrock wells and municipal supply alike. We install and service whole-home filtration, water softeners, acid neutralizers, reverse osmosis drinking water systems, radon removal, and well pumps and pressure tanks.",
    "Water here varies street by street. Two houses on the same road can draw from fractures at different depths and test nothing alike — one with iron staining and a sulfur smell, the next with hard water and radon and no taste at all. That is why we test at your tap before recommending anything, and why we give you the numbers rather than a summary.",
    "The result is equipment sized to your household's water and your household's demand, priced in writing before it is ordered, and serviced by the same company afterwards. If what you need is a filter change or a repair on a system somebody else installed, we do that too.",
  ],
};

/**
 * The numbers on the About page. A stat with an empty value disappears,
 * so nothing unverified ever ships.
 */
export const stats: Stat[] = [
  { value: "23", label: "Fairfield County towns served" },
  { value: "Free", label: "On-site water testing" },
  // TODO: e.g. { value: "15", label: "Years in business" }
  { value: "", label: "Years in business" },
  // TODO: e.g. { value: "1,200+", label: "Systems installed" }
  { value: "", label: "Systems installed" },
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
 * TODO: check these against your own practice and Connecticut DPH guidance
 * before launch — particularly the testing intervals in the third answer.
 * They are written to be accurate and uncontroversial, but they are your
 * statements once they are on your website.
 */
export const faqs: Faq[] = [
  {
    question: "How do I know whether I need water treatment?",
    answer:
      "Staining, scale, a sulfur smell or a chlorine taste are the obvious signs. The less obvious case matters more: radon, arsenic and uranium are all common in Connecticut bedrock and none of them can be tasted, smelled or seen. A test is the only way to rule them out.",
  },
  {
    question: "Do you test the water before recommending a system?",
    answer:
      "Yes. We test at your tap for hardness, iron, pH, sulfur and total dissolved solids, and look at any equipment already installed. Radon, arsenic, uranium and bacteria need a certified lab, which we can arrange. You get the results either way, whether or not you buy anything.",
  },
  {
    question: "How often should a private well be tested?",
    answer:
      "Annually for bacteria and nitrate, and every few years for the broader panel including metals and radon. Test sooner if the taste, smell or color changes, after any work on the well itself, or after flooding nearby.",
  },
  {
    question: "Is radon in water actually a concern in Fairfield County?",
    answer:
      "It can be. Radon moves through the same bedrock fractures that supply many wells here, and it leaves the water as vapor during showers and laundry, which adds to the radon in your indoor air. Levels vary sharply between neighboring properties, so a test on your own well is the only reliable answer.",
  },
  {
    question: "How long does an installation take?",
    answer:
      "Most whole-home systems are installed in a day. Radon aeration and more involved multi-stage systems can run longer. We tell you which applies before scheduling, not on the morning of the install.",
  },
  {
    question: "Will you service equipment another company installed?",
    answer:
      "Yes — filter and media changes, softener repairs, pressure tanks and pump work on most major brands. You do not have to replace a working system to become a customer.",
  },
  {
    question: "What does a system cost to run each year?",
    answer:
      "It depends on the equipment, but it is a real number and you should have it before you buy. Our written quotes include the annual cost of salt, media and filters alongside the installed price.",
  },
  {
    question: "Do you handle emergencies when a house has no water?",
    answer:
      "Pump and pressure tank failures are the usual cause, and those are same-day calls for us wherever the schedule allows. Call rather than using the form if you have no water right now.",
  },
];

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
    { label: "Radon in water", value: "8,400 pCi/L", flag: "Elevated", severity: "warn" as const },
    { label: "pH", value: "5.9", flag: "Acidic", severity: "info" as const },
  ],
  recommendation:
    "radon aeration first, then iron filter, neutralizer and softener — in that order.",
};
