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
 *
 * What this company does NOT do, so nothing here should imply otherwise:
 * no water testing, no radon removal, no well pump or pressure tank work.
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
  icon: "droplet" | "funnel" | "flask" | "house" | "layers" | "building";
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
    "Whole-home water filtration, softeners and reverse osmosis drinking water systems for homes across Fairfield County and the surrounding area.",

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

  /** Shown on the Contact page. Set to "" to hide it. */
  phoneNote:
    "Most questions get settled in one call — including what a system would cost.",

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
    id: "whole-home-filtration",
    title: "Whole Home Water Filtration",
    body: "Treatment where the water enters the house, so every tap, shower and appliance runs on the same filtered water rather than one filter at one sink.",
    includes: [
      "Installed at the main line into the house",
      "Sized to your household's water use",
      "Sediment, taste and odor filtration",
      "Filter and media changes on schedule afterwards",
    ],
    icon: "house",
  },
  {
    id: "reverse-osmosis",
    title: "Reverse Osmosis Drinking Water Systems",
    body: "An under-sink system for the water you drink and cook with, filtered down to the dissolved solids that whole-home equipment is not designed to catch.",
    includes: [
      "Under-sink installation with a dedicated faucet",
      "Refrigerator and ice maker connections",
      "Remineralization options for taste",
      "Annual filter and membrane replacement",
    ],
    icon: "flask",
  },
  {
    id: "well-water",
    title: "Well Water Treatment Systems",
    body: "Private wells in this area commonly bring iron staining, sediment, hardness, low pH and a sulfur smell. The system is built around what you're seeing at the tap.",
    includes: [
      "Iron and manganese filtration for orange staining",
      "Acid neutralizers for low pH and copper pitting",
      "Sediment filtration for grit and cloudiness",
      "Softening and carbon staged on the same line",
    ],
    icon: "droplet",
  },
  {
    id: "softeners",
    title: "Water Softener Systems",
    body: "Calcium and magnesium scale fixtures, spot the glassware, dull laundry and shorten the life of a water heater. A correctly sized softener removes them at the point of entry.",
    includes: [
      "Sizing based on your hardness and household use",
      "Metered regeneration, so you buy less salt",
      "Salt-efficient and twin-tank options",
      "Service, repair and rebuilds on existing softeners",
    ],
    icon: "funnel",
  },
  {
    id: "carbon-filtration",
    title: "Carbon Filtration Systems",
    body: "Carbon is what takes out chlorine and chloramine taste, the sulfur smell from a well, and most of what makes water unpleasant to drink or shower in.",
    includes: [
      "Whole-home carbon for chlorine and chloramine",
      "Catalytic carbon for hydrogen sulfide odor",
      "Backwashing and cartridge-style configurations",
      "Media replacement before performance drops off",
    ],
    icon: "layers",
  },
  {
    id: "city-water",
    title: "City Water Treatment Systems",
    body: "Public water arrives treated, but still carries chlorine or chloramine, some sediment, and whatever hardness the source has. All three are handled where the line enters the house.",
    includes: [
      "Carbon filtration for chlorine taste and smell",
      "Softening for scale and appliance life",
      "Sediment pre-filtration",
      "Drinking water systems at the kitchen sink",
    ],
    icon: "building",
  },
];

/**
 * The "How it works" steps, shown high on the Home page.
 *
 * Named `processSteps`, not `process`, so it does not shadow Node's global
 * `process` inside this module.
 */
export const processSteps = [
  {
    step: "01",
    title: "Tell us about your water",
    body: "A phone call is usually enough. You describe what you're seeing — staining, scale, a taste or a smell — plus whether you're on a well or city water and how big the household is. If you already have a test report, send it over and we'll read it with you.",
  },
  {
    step: "02",
    title: "We recommend the right system",
    body: "You get the options, the sizing and the installed price, along with what each one costs to run per year in salt, media and filters. In writing, before anything is ordered.",
  },
  {
    step: "03",
    title: "We install it properly",
    body: "Most whole-home systems go in within a day. We flush the lines, set the system up with you, and take the old equipment away.",
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
    title: "Builders before we were water people",
    body: "Twenty years building homes in this area. We know how a house is plumbed before anyone opens a wall.",
  },
  {
    title: "Straight answers on the phone",
    body: "Most of this gets settled in one call. We don't book an appointment just to tell you a price.",
  },
  {
    title: "Pricing in writing",
    body: "The installed price and the annual running cost, both before anything is ordered.",
  },
  {
    title: "Systems sized to your house",
    body: "Sizing follows your water and your household's real demand, so the system isn't over- or under-built.",
  },
  {
    title: "Local and licensed",
    body: "Fairfield County and the surrounding towns, fully insured, with the paperwork available up front.",
  },
  {
    title: "We service what we install",
    body: "Filters, salt, media and repairs afterwards — including equipment another company put in.",
  },
];

/**
 * The About page copy.
 *
 * TODO: the "more than twenty years" in the first paragraph is the one
 * number here. Update it as that changes. `ownerName` is blank until you
 * fill it in, and the signature line stays off the page until you do.
 */
export const about = {
  /** TODO: e.g. "Matt Reynolds". Blank hides the signature line. */
  ownerName: "",
  /** TODO: e.g. "Owner" or "Owner & Lead Installer". */
  ownerTitle: "Owner",

  paragraphs: [
    "We're a local family of builders. For more than twenty years we've been building homes across Fairfield County and the towns around it, and in that time we've seen a lot of what comes out of the taps here — well water and city water both.",
    "Water treatment wasn't the plan. We got into it because it kept mattering. Clean drinking water isn't a luxury item in a house, and too many of our neighbors were living with staining, scale, or water they didn't want to drink — usually because nobody had explained the options, or because the price never arrived with an explanation attached.",
    "So that's how we work now. Tell us what you're seeing at the tap — the orange staining, the smell, the scale on the kettle, the drinking water nobody likes — and a bit about the house, and we can usually narrow it to one or two systems over the phone. We don't sell water tests. If you already have a test report, send it and we'll go through it with you.",
    "You get the sizing, the installed price and the annual running cost in writing before anything is ordered. We install it, set it up with you, and service it afterwards — including equipment another company put in.",
  ],
};

/**
 * The numbers on the About page. A stat with an empty value disappears,
 * so nothing unverified ever ships.
 */
export const stats: Stat[] = [
  { value: "20+", label: "Years building homes in the area" },
  { value: "Family", label: "Owned and operated" },
  // TODO: e.g. { value: "8", label: "Years in water treatment" }
  { value: "", label: "Years in water treatment" },
  // TODO: e.g. { value: "600+", label: "Systems installed" }
  { value: "", label: "Systems installed" },
];

/** Where we work. The towns list below is the core of it. */
export const serviceArea = {
  heading: "Fairfield County and the surrounding towns",
  intro:
    "We cover all of Fairfield County, Connecticut, and the neighboring towns just past the county line. If you're nearby and don't see your town here, call and ask — the answer is usually yes.",
};

export const symptoms: SymptomRow[] = [
  {
    notice: "Orange-brown staining in sinks and tubs",
    cause: "Dissolved iron in well water",
    fix: "Iron filtration",
  },
  {
    notice: "Rotten-egg smell, worse from hot taps",
    cause: "Hydrogen sulfide",
    fix: "Catalytic carbon filtration",
  },
  {
    notice: "Scale on fixtures, dull laundry, dry skin",
    cause: "Calcium and magnesium hardness",
    fix: "Ion-exchange softener",
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
    notice: "Cloudy or gritty water, clogged aerators",
    cause: "Sediment from the well or the line",
    fix: "Sediment filtration",
  },
  {
    notice: "Drinking water nobody in the house likes",
    cause: "Dissolved solids and taste compounds",
    fix: "Reverse osmosis at the kitchen sink",
  },
];

export const faqs: Faq[] = [
  {
    question: "How do I know which system I need?",
    answer:
      "Start with what you're seeing: orange staining, scale on the fixtures, a chlorine taste, a sulfur smell, or drinking water nobody likes. Tell us that, plus whether you're on a well or city water and how big the household is, and we can usually narrow it to one or two options on the phone.",
  },
  {
    question: "Do you test my water first?",
    answer:
      "We don't sell water testing. If you already have a recent test — from a lab, a home inspection, or your town's annual water quality report — send it over and we'll read it with you. If you don't have one, what you're seeing at the tap plus the details of the house is usually enough to size the right system.",
  },
  {
    question: "What's the difference between a filter and a softener?",
    answer:
      "A softener removes the calcium and magnesium that cause scale, spotting and dull laundry. A filter removes things like chlorine, sediment, iron and the compounds behind a bad taste or smell. Plenty of homes need both, and they're installed together on the same line.",
  },
  {
    question: "Will a water softener make my water taste salty?",
    answer:
      "No. The salt regenerates the resin inside the softener and is rinsed to the drain — it doesn't end up in the water you drink. If taste is your main concern, a reverse osmosis system at the kitchen sink is the usual answer.",
  },
  {
    question: "I'm on city water. Do I still need treatment?",
    answer:
      "Often, yes. Municipal water is treated to be safe to drink, but it still arrives with chlorine or chloramine, some sediment, and whatever hardness the source has. Carbon filtration handles the taste and smell; a softener handles the scale.",
  },
  {
    question: "How long does installation take?",
    answer:
      "Most whole-home systems are installed in a day. An under-sink reverse osmosis system is a few hours. We'll tell you which applies before anything is scheduled.",
  },
  {
    question: "Will you service equipment another company installed?",
    answer:
      "Yes — filter and media changes, softener repairs and rebuilds on most major brands. You don't have to replace a working system to become a customer.",
  },
  {
    question: "What does a system cost to run each year?",
    answer:
      "It depends on the equipment, but it's a real number and you should have it before you buy. Our quotes include the annual cost of salt, media and filters alongside the installed price.",
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
  //   quote: "They talked me through it on the phone, quoted the softener and the carbon filter together, and had it in the following week.",
  //   name: "Sarah K.",
  //   town: "Ridgefield",
  //   service: "Softener + whole-home carbon",
  // },
];

/**
 * All 23 towns in Fairfield County, plus room for the surrounding ones.
 *
 * TODO: add the towns you cover outside the county — Oxford, Seymour,
 * Naugatuck, Woodbury and so on — and trim any Fairfield County town you
 * don't actually travel to.
 */
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
