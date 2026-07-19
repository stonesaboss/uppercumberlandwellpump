/**
 * Central configuration for the Well Pump Resources knowledge center.
 *
 * Everything the resource pages render — routes, metadata, copy, planned
 * guide titles, related links, breadcrumbs and image slots — lives here so
 * future researched articles can be added without rebuilding navigation,
 * cards, breadcrumbs or metadata by hand.
 *
 * Planned guide titles are architectural candidates only. Final article
 * selection, titles, slugs and priority will come from keyword/SERP
 * research; revise them here when that research lands.
 */

export interface PlannedGuide {
  title: string;
  description?: string;
  /** Set to a real route ONLY once the article is published. */
  href?: string;
  /** "published" guides render as links; anything else renders non-clickable. */
  status: "planned" | "published";
}

export interface ResourceImage {
  /** Final expected asset path (pending until the real image is produced). */
  assetPath: string;
  /**
   * Temporary fallback: an existing site photo when one genuinely fits,
   * otherwise empty — the ResourceFeaturedImage component then renders a
   * polished branded band (never a gray placeholder box).
   */
  fallbackPath: string;
  /** Icon name (see Icon.astro) used by the non-photo fallback band. */
  fallbackIcon: string;
  alt: string;
  aspectRatio: "16:9";
  recommendedWidth: number;
  recommendedHeight: number;
  recommendedSubject: string;
  status: "pending" | "available";
}

export interface RelatedLink {
  label: string;
  href: string;
}

export interface ResourceHub {
  slug: string;
  route: string;
  displayOrder: number;
  /** SEO <title> */
  title: string;
  metaDescription: string;
  h1: string;
  breadcrumbLabel: string;
  /** Category-card presentation on the main Resources page. */
  cardTitle: string;
  cardDescription: string;
  cardIcon: string;
  /** Introductory paragraphs rendered under the H1. */
  intro: string[];
  /** Short list of factors that shape this topic (keeps hubs substantive). */
  factors: string[];
  plannedGuidesHeading: string;
  plannedGuides: PlannedGuide[];
  relatedServicesHeading: string;
  relatedServices: RelatedLink[];
  /** Slugs of one or two related hubs. */
  relatedHubs: string[];
  image: ResourceImage;
}

const IMAGE_DIR = "/images/resources/";

export const RESOURCES_INDEX = {
  route: "/resources/",
  title: "Well Pump Resources | Upper Cumberland Well Pump",
  metaDescription:
    "Explore practical guides covering well pump costs, no-water problems, low pressure, pressure tanks, system components, maintenance and rural well systems in Tennessee.",
  h1: "Upper Cumberland Well Pump Knowledge Center",
  breadcrumbLabel: "Well Pump Resources",
  intro: [
    "A private well system includes more than the pump itself. Pump type, well depth, available water, pressure-tank condition, electrical controls, piping, household demand and property access can all affect how a system performs and what may be required when something goes wrong.",
    "Explore practical resources covering well pump repair and replacement, no-water problems, low pressure, system components, service preparation and private-well considerations for rural properties across Tennessee's Upper Cumberland region.",
  ],
  image: {
    assetPath: IMAGE_DIR + "resources-well-pump-knowledge-center.webp",
    fallbackPath: "/images/hero/well-pump-rural-service-desktop.webp",
    fallbackIcon: "drop",
    alt: "Well pump service equipment beside a private well on rural Tennessee property",
    aspectRatio: "16:9",
    recommendedWidth: 1600,
    recommendedHeight: 900,
    recommendedSubject:
      "A professional, photorealistic overview of a private-well service setting on rural Tennessee property, showing a visible well head and appropriate service equipment without posing workers or branding.",
    status: "pending",
  } satisfies ResourceImage,
} as const;

export const RESOURCE_HUBS: ResourceHub[] = [
  {
    slug: "well-pump-costs",
    route: "/resources/well-pump-costs/",
    displayOrder: 1,
    title: "Well Pump Cost Guides | Upper Cumberland Well Pump",
    metaDescription:
      "Learn what affects well pump repair and replacement costs in Tennessee, including pump type, well depth, access, wiring, pressure tanks and system condition.",
    h1: "Well Pump Costs and Replacement",
    breadcrumbLabel: "Well Pump Costs and Replacement",
    cardTitle: "Understand Pump Costs",
    cardDescription:
      "Learn which system conditions can affect well pump repair and replacement estimates, including pump type, well depth, access, wiring, pressure tanks, piping and the work required to retrieve the existing pump.",
    cardIcon: "clipboard",
    intro: [
      "The cost of repairing or replacing a well pump cannot be determined from one symptom alone. The type of pump, well depth, pump setting, system accessibility, electrical condition, pressure-tank condition and equipment required to retrieve the existing pump can all influence the scope of work.",
      "This resource section will help Tennessee property owners understand the information used to evaluate a well pump project and the difference between a limited repair and a larger system replacement.",
    ],
    factors: [
      "Pump type — submersible, jet or constant-pressure equipment involve different parts and labor",
      "Well depth and pump setting — deeper pumps mean more drop pipe, wire and retrieval work",
      "Site access — how close equipment can get to the well head",
      "Electrical and control condition — wiring, splices, control boxes and switches",
      "Pressure-tank condition — a failing tank can shorten the life of new equipment",
      "Whether the well itself remains usable — a separate question from the pump",
    ],
    plannedGuidesHeading: "Planned Cost Guides",
    plannedGuides: [
      { title: "How Much Does Well Pump Replacement Cost in Tennessee?", description: "Why one number can't answer it — and the system factors that actually shape a replacement estimate.", href: "/resources/guides/how-much-does-well-pump-replacement-cost-in-tennessee/", status: "published" },
      { title: "What Affects the Cost of Well Pump Repair?", description: "Why a repair can be small or major — and why diagnosis always comes first.", href: "/resources/guides/what-affects-the-cost-of-well-pump-repair/", status: "published" },
      { title: "Should You Repair or Replace a Well Pump?", description: "How to weigh a repair against a full replacement without guessing.", href: "/resources/guides/should-you-repair-or-replace-a-well-pump/", status: "published" },
      { title: "How Well Depth Can Affect Pump Replacement", description: "Why the depth a pump hangs at drives so much of a replacement job.", href: "/resources/guides/how-well-depth-can-affect-pump-replacement/", status: "published" },
      { title: "Submersible Pump Versus Jet Pump Replacement", description: "Why the two pump types make for very different replacement jobs.", href: "/resources/guides/submersible-pump-versus-jet-pump-replacement/", status: "published" },
      { title: "How Much Does Pressure Tank Replacement Cost?", description: "What shapes a pressure-tank job — and why a failing tank is worth addressing.", href: "/resources/guides/how-much-does-pressure-tank-replacement-cost/", status: "published" },
      { title: "Why Pulling a Deep-Well Pump Can Affect Labor", description: "Why getting the old pump out is often the biggest part of the work.", href: "/resources/guides/why-pulling-a-deep-well-pump-can-affect-labor/", status: "published" },
      { title: "Does a Well Pump Estimate Include Wiring and Pipe?", description: "Why 'replace the pump' often means more than the pump — and what to confirm.", href: "/resources/guides/does-a-well-pump-estimate-include-wiring-and-pipe/", status: "published" },
      { title: "What Information Is Needed for a Pump Replacement Estimate?", description: "The details that turn a service request into an accurate estimate.", href: "/resources/guides/what-information-is-needed-for-a-pump-replacement-estimate/", status: "published" },
      { title: "Why Emergency Well Pump Repairs Can Vary in Scope", description: "Why 'no water right now' can mean a small fix or a major job until it's diagnosed.", href: "/resources/guides/why-emergency-well-pump-repairs-can-vary-in-scope/", status: "published" },
    ],
    relatedServicesHeading: "Related Well Pump Services",
    relatedServices: [
      { label: "Well Pump Repair in Cookeville", href: "/well-pump-repair-cookeville-tn/" },
      { label: "Well Pump Replacement", href: "/well-pump-replacement/" },
      { label: "Pressure Tank Replacement", href: "/pressure-tank-replacement/" },
      { label: "Well Pump Installation", href: "/well-pump-installation/" },
      { label: "Request Well Pump Service", href: "/request-service/" },
    ],
    relatedHubs: ["well-pump-problems", "well-system-components"],
    image: {
      assetPath: IMAGE_DIR + "resources-well-pump-costs.webp",
      fallbackPath: "",
      fallbackIcon: "clipboard",
      alt: "Technician preparing equipment to evaluate a residential well pump system on rural property",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A technician or service setup preparing to inspect or retrieve a residential pump, emphasizing the equipment and property access factors involved in estimating work.",
      status: "pending",
    },
  },
  {
    slug: "well-pump-problems",
    route: "/resources/well-pump-problems/",
    displayOrder: 2,
    title: "Well Pump Problems and Troubleshooting Guides",
    metaDescription:
      "Learn what can cause no water, short cycling, constant running, breaker trips, sputtering faucets and other private-well system problems.",
    h1: "Well Pump Problems and Troubleshooting",
    breadcrumbLabel: "Well Pump Problems and Troubleshooting",
    cardTitle: "Diagnose Common Pump Problems",
    cardDescription:
      "Explore possible causes of no water, constant running, short cycling, breaker trips, sputtering faucets and other symptoms that may require professional diagnosis.",
    cardIcon: "alert",
    intro: [
      "A loss of water does not always mean the pump itself has failed. Electrical controls, pressure switches, pressure tanks, wiring, piping, check valves, low water conditions and other parts of the system can produce similar symptoms.",
      "These resources will help property owners document what is happening, recognize signs that require prompt attention and understand what a technician may evaluate. They are not a substitute for an onsite diagnosis.",
    ],
    factors: [
      "The same symptom can have several causes — no water may be electrical, mechanical or the well itself",
      "When the symptom started and how it developed narrows the possibilities",
      "What can safely be observed: pump sounds, breaker positions, gauge readings",
      "Recent events — storms, power outages or heavy water use — often matter",
      "Symptoms that come and go still deserve evaluation before they become outages",
    ],
    plannedGuidesHeading: "Planned Troubleshooting Guides",
    plannedGuides: [
      { title: "Why Did My Well Water Suddenly Stop?", description: "The common causes of a sudden no-water situation — and what you can safely check first.", href: "/resources/guides/why-did-my-well-water-suddenly-stop/", status: "published" },
      { title: "Well Pump Runs but No Water Reaches the House", description: "When the pump is clearly running but nothing comes out of the taps.", href: "/resources/guides/well-pump-runs-but-no-water-reaches-the-house/", status: "published" },
      { title: "Why a Well Pump May Not Turn On", description: "Why a silent pump is often an electrical or control issue before it's the pump itself.", href: "/resources/guides/why-a-well-pump-may-not-turn-on/", status: "published" },
      { title: "Why a Well Pump Runs Constantly", description: "Why a pump that never shuts off is a problem worth acting on quickly.", href: "/resources/guides/why-a-well-pump-runs-constantly/", status: "published" },
      { title: "What Causes a Well Pump to Short Cycle?", description: "Why rapid on-off cycling usually points to the pressure tank — and harms the pump.", href: "/resources/guides/what-causes-a-well-pump-to-short-cycle/", status: "published" },
      { title: "Why a Well Pump Breaker Keeps Tripping", description: "Why a repeatedly tripping breaker is a warning — not something to keep resetting.", href: "/resources/guides/why-a-well-pump-breaker-keeps-tripping/", status: "published" },
      { title: "What Causes Air or Sputtering at the Faucets?", description: "Why faucets spit and sputter on a well — and what the air is telling you.", href: "/resources/guides/what-causes-air-or-sputtering-at-the-faucets/", status: "published" },
      { title: "Why Water Stops After a Power Outage", description: "Why wells lose water in an outage — and why it sometimes doesn't come back on its own.", href: "/resources/guides/why-water-stops-after-a-power-outage/", status: "published" },
      { title: "Signs a Well Pump May Be Failing", description: "The warning signs that a pump is wearing out — before it leaves you without water.", href: "/resources/guides/signs-a-well-pump-may-be-failing/", status: "published" },
      { title: "Common Pressure-Switch Problems", description: "The small control that starts and stops your pump — and what goes wrong with it.", href: "/resources/guides/common-pressure-switch-problems/", status: "published" },
      { title: "What a Clicking Well System May Indicate", description: "When the clicking you hear is normal — and when it's the system asking for help.", href: "/resources/guides/what-a-clicking-well-system-may-indicate/", status: "published" },
      { title: "When a No-Water Problem Requires Immediate Service", description: "How to tell an urgent no-water situation from one that can wait for a scheduled visit.", href: "/resources/guides/when-a-no-water-problem-requires-immediate-service/", status: "published" },
    ],
    relatedServicesHeading: "Related Problem & Repair Services",
    relatedServices: [
      { label: "Emergency No-Water Requests", href: "/emergency-no-water-well-service/" },
      { label: "Well Pump Repair in Cookeville", href: "/well-pump-repair-cookeville-tn/" },
      { label: "Pressure Tank Replacement", href: "/pressure-tank-replacement/" },
      { label: "Common Well Problems Guide", href: "/common-well-problems/" },
      { label: "Request Well Pump Service", href: "/request-service/" },
    ],
    relatedHubs: ["water-pressure", "maintenance-and-planning"],
    image: {
      assetPath: IMAGE_DIR + "resources-well-pump-problems.webp",
      fallbackPath: "",
      fallbackIcon: "alert",
      alt: "Private well head and service equipment being inspected after a residential no-water problem",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A professional inspection of an above-ground well head or accessible pump-system components during a no-water diagnosis.",
      status: "pending",
    },
  },
  {
    slug: "water-pressure",
    route: "/resources/water-pressure/",
    displayOrder: 3,
    title: "Well Water Pressure and Flow Guides",
    metaDescription:
      "Learn how pumps, pressure tanks, switches, well yield and household demand can affect water pressure and flow in a private well system.",
    h1: "Water Pressure and Flow",
    breadcrumbLabel: "Water Pressure and Flow",
    cardTitle: "Evaluate Water Pressure",
    cardDescription:
      "Understand how pumps, pressure tanks, switches, well yield, plumbing demand and system configuration can affect water pressure and flow.",
    cardIcon: "gauge",
    intro: [
      "Low or inconsistent water pressure can originate in several parts of a private-well system. The pump, pressure tank, pressure switch, piping, filters, well yield and the amount of water being used at one time may all influence what occupants experience inside the home.",
      "Use these resources to understand the difference between pressure, flow and available water before requesting a system evaluation. No single adjustment or component is guaranteed to solve every pressure problem — the cause has to be identified first.",
    ],
    factors: [
      "Pressure and flow are different things — strong pressure can still come with limited flow",
      "The pressure tank and switch define the pressure range the household feels",
      "Filters and treatment equipment add pressure drop as they load up",
      "Well yield limits how much water is available during sustained use",
      "Simultaneous demand — laundry, showers, irrigation — reveals system limits",
    ],
    plannedGuidesHeading: "Planned Pressure & Flow Guides",
    plannedGuides: [
      { title: "What Causes Low Water Pressure on a Private Well?", description: "An overview of the most common reasons a private well delivers weak water pressure throughout the home.", href: "/resources/guides/what-causes-low-water-pressure-on-a-private-well/", status: "published" },
      { title: "Low Pressure Throughout the House Versus One Fixture", description: "How the pattern of low pressure, whole-house or a single tap, helps point toward the likely cause.", href: "/resources/guides/low-pressure-throughout-the-house-versus-one-fixture/", status: "published" },
      { title: "How a Pressure Tank Affects Water Pressure", description: "How the pressure tank stores water, controls pump cycling, and shapes the pressure you feel at every tap.", href: "/resources/guides/how-a-pressure-tank-affects-water-pressure/", status: "published" },
      { title: "Why Water Pressure Drops During Heavy Use", description: "Why pressure fades when several fixtures run at once and what that says about your well system's capacity.", href: "/resources/guides/why-water-pressure-drops-during-heavy-use/", status: "published" },
      { title: "What Causes Water Pressure to Surge?", description: "Why pressure pulses strong then weak at the tap and what that surging pattern usually points toward.", href: "/resources/guides/what-causes-water-pressure-to-surge/", status: "published" },
      { title: "Well Yield Versus Pump Capacity", description: "The difference between how fast a well produces water and how fast a pump can move it, and why the two must match.", href: "/resources/guides/well-yield-versus-pump-capacity/", status: "published" },
      { title: "How to Read Basic Well-System Pressure Symptoms", description: "A practical guide to observing and interpreting the pressure symptoms your well system shows.", href: "/resources/guides/how-to-read-basic-well-system-pressure-symptoms/", status: "published" },
      { title: "What Is a Constant-Pressure Well System?", description: "An introduction to constant-pressure well systems and how variable-speed pumps keep pressure steady.", href: "/resources/guides/what-is-a-constant-pressure-well-system/", status: "published" },
      { title: "Constant-Pressure Systems Versus Traditional Pressure Tanks", description: "A side-by-side comparison of constant-pressure systems and traditional pressure-tank setups.", href: "/resources/guides/constant-pressure-systems-versus-traditional-pressure-tanks/", status: "published" },
      { title: "Can a Larger Pressure Tank Improve Water Pressure?", description: "What a larger pressure tank actually changes, and the common misconception about tank size and pressure.", href: "/resources/guides/can-a-larger-pressure-tank-improve-water-pressure/", status: "published" },
      { title: "Why Multiple Fixtures Can Reduce Well-Water Flow", description: "Why opening several taps at once divides the available flow, and what that reveals about your system.", href: "/resources/guides/why-multiple-fixtures-can-reduce-well-water-flow/", status: "published" },
      { title: "When Low Pressure May Indicate a Pump Problem", description: "The low-pressure patterns that point toward the pump rather than the tank, plumbing, or well.", href: "/resources/guides/when-low-pressure-may-indicate-a-pump-problem/", status: "published" },
    ],
    relatedServicesHeading: "Related Pressure Services",
    relatedServices: [
      { label: "Low Water Pressure From a Well", href: "/low-water-pressure-from-well/" },
      { label: "Pressure Tank Replacement", href: "/pressure-tank-replacement/" },
      { label: "Constant-Pressure Systems", href: "/constant-pressure-well-pump-systems/" },
      { label: "Well Pump Repair in Cookeville", href: "/well-pump-repair-cookeville-tn/" },
      { label: "Well Pump Replacement", href: "/well-pump-replacement/" },
    ],
    relatedHubs: ["well-system-components", "well-pump-problems"],
    image: {
      assetPath: IMAGE_DIR + "resources-water-pressure.webp",
      fallbackPath: "",
      fallbackIcon: "gauge",
      alt: "Residential pressure tank, pressure gauge and well-system piping in a clean utility area",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A clean pressure-tank and pressure-gauge installation with visible piping in a utility room, basement or well house.",
      status: "pending",
    },
  },
  {
    slug: "well-system-components",
    route: "/resources/well-system-components/",
    displayOrder: 4,
    title: "Well Pump System Components Explained",
    metaDescription:
      "Understand submersible pumps, jet pumps, pressure tanks, switches, control boxes, well caps, check valves and other private-well components.",
    h1: "Well Pump System Components",
    breadcrumbLabel: "Well Pump System Components",
    cardTitle: "Understand Well-System Components",
    cardDescription:
      "Learn what submersible pumps, jet pumps, pressure tanks, switches, control boxes, well caps, check valves and other components do.",
    cardIcon: "tank",
    intro: [
      "A private-well water system depends on several components working together. The pump moves water, while pressure controls, storage components, piping and electrical equipment regulate how that water reaches the building.",
      "These resources will explain the purpose of common well-system components, typical symptoms associated with them and why an accurate diagnosis should consider the complete system.",
    ],
    factors: [
      "The pump is one component among many — controls, tank, switch and piping share the work",
      "Some components live down the well, some at the well head, some inside the house",
      "A failure in one component often shows up as symptoms somewhere else",
      "Component age and compatibility matter when part of a system is replaced",
      "Electrical components should be evaluated by professionals, not opened by owners",
    ],
    plannedGuidesHeading: "Planned Component Guides",
    plannedGuides: [
      { title: "How Does a Residential Well Pump System Work?", description: "A clear overview of how the parts of a private well system work together to deliver water to your home.", href: "/resources/guides/how-residential-well-pump-system-works/", status: "published" },
      { title: "Submersible Well Pumps Versus Jet Pumps", description: "A side-by-side explanation of the two main well pump types and how they differ in placement and operation.", href: "/resources/guides/submersible-well-pumps-vs-jet-pumps/", status: "published" },
      { title: "What Does a Well Pressure Tank Do?", description: "An explanation of how the pressure tank stores water and protects your pump from constant cycling.", href: "/resources/guides/what-a-well-pressure-tank-does/", status: "published" },
      { title: "How Does a Well Pressure Switch Work?", description: "An explanation of the small switch that automatically starts and stops your well pump.", href: "/resources/guides/how-a-well-pressure-switch-works/", status: "published" },
      { title: "What Is a Well Pump Control Box?", description: "An explanation of the control box that helps start certain submersible well pumps.", href: "/resources/guides/what-is-a-well-pump-control-box/", status: "published" },
      { title: "What Does a Well Pump Capacitor Do?", description: "An explanation of the capacitor that helps a well pump motor start and run.", href: "/resources/guides/what-a-well-pump-capacitor-does/", status: "published" },
      { title: "What Is a Pitless Adapter?", description: "An explanation of the fitting that carries well water underground and below the frost line.", href: "/resources/guides/what-is-a-pitless-adapter/", status: "published" },
      { title: "Why Are Check Valves Used in Well Systems?", description: "An explanation of the one-way valves that keep water from flowing backward in a well system.", href: "/resources/guides/why-check-valves-are-used-in-well-systems/", status: "published" },
      { title: "What Are Drop Pipe and Pump Wire?", description: "An explanation of the pipe and wiring that connect a submersible pump to the surface.", href: "/resources/guides/what-are-drop-pipe-and-pump-wire/", status: "published" },
      { title: "What Is the Purpose of a Well Cap or Seal?", description: "An explanation of the cap that protects the top of your well from contamination.", href: "/resources/guides/purpose-of-a-well-cap-or-seal/", status: "published" },
      { title: "What Does a Well-System Pressure Gauge Show?", description: "An explanation of the gauge that lets you read your well system's water pressure at a glance.", href: "/resources/guides/what-a-well-system-pressure-gauge-shows/", status: "published" },
      { title: "Which Well Components Are Located Inside the House?", description: "A guide to which parts of a well system you will find indoors versus out at the wellhead.", href: "/resources/guides/which-well-components-are-inside-the-house/", status: "published" },
    ],
    relatedServicesHeading: "Related Component Services",
    relatedServices: [
      { label: "Well Pump Installation", href: "/well-pump-installation/" },
      { label: "Well Pump Replacement", href: "/well-pump-replacement/" },
      { label: "Pressure Tank Replacement", href: "/pressure-tank-replacement/" },
      { label: "Well Inspections", href: "/well-inspection/" },
    ],
    relatedHubs: ["water-pressure", "well-pump-costs"],
    image: {
      assetPath: IMAGE_DIR + "resources-well-system-components.webp",
      fallbackPath: "",
      fallbackIcon: "tank",
      alt: "Organized private-well system components including a pressure tank, controls and connected piping",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A realistic installed well-system scene showing the relationship among a pressure tank, controls, gauge, piping and related components.",
      status: "pending",
    },
  },
  {
    slug: "maintenance-and-planning",
    route: "/resources/maintenance-and-planning/",
    displayOrder: 5,
    title: "Well Pump Maintenance and Service Planning",
    metaDescription:
      "Learn how to prepare for well pump service, maintain system access, document symptoms and plan repairs or replacement.",
    h1: "Well Pump Maintenance and Service Planning",
    breadcrumbLabel: "Maintenance and Service Planning",
    cardTitle: "Plan Maintenance and Service",
    cardDescription:
      "Learn what symptoms, photographs, property details and access information to gather before scheduling well pump service.",
    cardIcon: "check",
    intro: [
      "Clear information can make a well pump service request easier to evaluate. The location of the well head, recent symptoms, visible equipment, property access, electrical events and changes in water pressure can all help establish where a technician should begin.",
      "These resources will explain how to document a problem, prepare the property for service and recognize changes that should not be ignored. Observation stops at what is safely visible — never open electrical panels, enter well pits or remove sealed components.",
    ],
    factors: [
      "A clear symptom timeline is one of the most useful things an owner can provide",
      "Photos of visible equipment — tank, gauge, well cap — help a technician prepare",
      "Knowing where the well head is (and keeping it accessible) saves service time",
      "Records — well logs, prior service, equipment labels — carry real value",
      "Seasonal factors like freezing weather and storms deserve advance planning",
    ],
    plannedGuidesHeading: "Planned Maintenance & Planning Guides",
    plannedGuides: [
      { title: "What Information Does a Well Pump Technician Need?", description: "The details to gather so a provider can plan the right visit for your well.", href: "/resources/guides/what-information-does-a-well-pump-technician-need/", status: "published" },
      { title: "What Photos Should You Send Before Well Pump Service?", description: "The photos that help a provider plan before arriving at your well.", href: "/resources/guides/what-photos-should-you-send-before-well-pump-service/", status: "published" },
      { title: "How to Locate the Well Head on Your Property", description: "Simple, safe ways to find where your well head sits on the property.", href: "/resources/guides/how-to-locate-the-well-head-on-your-property/", status: "published" },
      { title: "How to Prepare Access for a Well Pump Service Truck", description: "How to clear a safe path so a service truck can reach your well.", href: "/resources/guides/how-to-prepare-access-for-a-well-pump-service-truck/", status: "published" },
      { title: "What to Do When a Well Pump Stops Working", description: "Calm, safe first steps to take when you suddenly lose water.", href: "/resources/guides/what-to-do-when-a-well-pump-stops-working/", status: "published" },
      { title: "How Long Can Well Pump Replacement Take?", description: "The factors that make a pump replacement quicker or more involved.", href: "/resources/guides/how-long-can-well-pump-replacement-take/", status: "published" },
      { title: "What Well-System Maintenance Should Homeowners Track?", description: "What to observe and log so small well issues surface early.", href: "/resources/guides/what-well-system-maintenance-should-homeowners-track/", status: "published" },
      { title: "How to Protect Accessible Well Components During Freezing Weather", description: "Safe measures to shield above-ground well parts from a hard freeze.", href: "/resources/guides/how-to-protect-accessible-well-components-during-freezing-weather/", status: "published" },
      { title: "What to Check After a Storm or Power Outage", description: "Safe checks to run on your well after storms and outages.", href: "/resources/guides/what-to-check-after-a-storm-or-power-outage/", status: "published" },
      { title: "When Should a Pressure Tank Be Evaluated?", description: "The signs that a pressure tank may need a provider's attention.", href: "/resources/guides/when-should-a-pressure-tank-be-evaluated/", status: "published" },
      { title: "Questions to Ask Before Buying a Home With a Private Well", description: "The questions to ask before closing on a home served by a private well.", href: "/resources/guides/questions-to-ask-before-buying-a-home-with-a-private-well/", status: "published" },
      { title: "What Well-System Records Should a Property Owner Keep?", description: "The records to keep so your well's history is always at hand.", href: "/resources/guides/what-well-system-records-should-a-property-owner-keep/", status: "published" },
    ],
    relatedServicesHeading: "Related Planning Services",
    relatedServices: [
      { label: "Request Well Pump Service", href: "/request-service/" },
      { label: "Well Inspections", href: "/well-inspection/" },
      { label: "Emergency No-Water Requests", href: "/emergency-no-water-well-service/" },
    ],
    relatedHubs: ["well-pump-problems", "well-pump-costs"],
    image: {
      assetPath: IMAGE_DIR + "resources-maintenance-planning.webp",
      fallbackPath: "",
      fallbackIcon: "check",
      alt: "Accessible residential well head and surrounding work area prepared for professional pump service",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A well head with a clean, accessible service area and a rural residence softly visible in the background.",
      status: "pending",
    },
  },
  {
    slug: "rural-well-projects",
    route: "/resources/rural-well-projects/",
    displayOrder: 6,
    title: "Rural Well and Pump Project Guides | Tennessee",
    metaDescription:
      "Explore well-pump considerations for rural homes, farms, cabins, new construction, long water lines and hard-to-access Tennessee properties.",
    h1: "Rural Well and Pump Projects",
    breadcrumbLabel: "Rural Well and Pump Projects",
    cardTitle: "Plan Rural Well Projects",
    cardDescription:
      "Explore well-pump considerations for rural homes, farms, cabins, new construction, long water lines and hard-to-access properties.",
    cardIcon: "house",
    intro: [
      "Private-well systems on rural properties may need to serve more than a typical residence. Farms, workshops, livestock areas, cabins, detached buildings and long water-line runs can introduce different pressure, flow, access and equipment considerations.",
      "These resources will focus on planning well-pump systems and service work for rural Tennessee properties without assuming that one system design is appropriate for every property. System sizing always depends on property-specific information.",
    ],
    factors: [
      "Total demand — house, barn, livestock, irrigation — shapes what the system must deliver",
      "Distance and elevation between the well and the buildings it serves",
      "Access for service equipment on long drives, gates and rough terrain",
      "Power availability and behavior during outages",
      "Seasonal or part-time occupancy changes how systems fail and are discovered",
    ],
    plannedGuidesHeading: "Planned Rural Project Guides",
    plannedGuides: [
      { title: "Well Pump Planning for a Rural Home", description: "How to think through pump sizing, terrain and water use before starting a rural well project.", href: "/resources/guides/rural-home-well-pump-planning/", status: "published" },
      { title: "Well-Water Systems for Cabins and Seasonal Properties", description: "What to consider when a well serves a cabin or property that sits unused for stretches of the year.", href: "/resources/guides/cabin-seasonal-well-water-systems/", status: "published" },
      { title: "Well Pump Considerations for Farms and Livestock", description: "Planning water capacity and reliability for farms, stock tanks and livestock across rural acreage.", href: "/resources/guides/farm-livestock-well-pump-considerations/", status: "published" },
      { title: "Planning Well Water for a New Rural Home", description: "How to sequence well drilling, pump selection and water infrastructure when building on rural land.", href: "/resources/guides/new-rural-home-well-water-planning/", status: "published" },
      { title: "Supplying Water to a Detached Garage or Workshop", description: "Planning a water-line extension to reach a detached garage, shop or outbuilding on your property.", href: "/resources/guides/water-supply-detached-garage-workshop/", status: "published" },
      { title: "Well-Pump Considerations for Long Water-Line Runs", description: "How distance between the well and the home affects pressure, pump sizing and line design.", href: "/resources/guides/long-water-line-run-well-pump/", status: "published" },
      { title: "Improving Water Pressure Across a Large Property", description: "Common causes of weak or uneven pressure on acreage and the planning options that can help.", href: "/resources/guides/improving-water-pressure-large-property/", status: "published" },
      { title: "Preparing Remote Property Access for Pump Service", description: "How to prepare driveways, gates and wellhead access so service and equipment can reach your property.", href: "/resources/guides/remote-property-access-pump-service/", status: "published" },
      { title: "Backup Water Planning During Power Outages", description: "Why well water stops during outages and the planning options that keep water available when power fails.", href: "/resources/guides/backup-water-power-outage-planning/", status: "published" },
      { title: "Well Houses: Access, Ventilation and Freeze Protection", description: "What a well house is for and how to plan access, ventilation and freeze protection into it.", href: "/resources/guides/well-house-access-ventilation-freeze-protection/", status: "published" },
      { title: "Evaluating an Older Well System on Rural Property", description: "What to observe and assess when a well and pump are aging or newly inherited on rural land.", href: "/resources/guides/evaluating-older-well-system-rural/", status: "published" },
      { title: "What to Know Before Buying Undeveloped Land With a Well", description: "Key water questions to answer before purchasing undeveloped rural land that already has a well.", href: "/resources/guides/buying-undeveloped-land-with-well/", status: "published" },
    ],
    relatedServicesHeading: "Related Rural Services",
    relatedServices: [
      { label: "Well Pump Installation", href: "/well-pump-installation/" },
      { label: "Water Well Drilling", href: "/water-well-drilling/" },
      { label: "Constant-Pressure Systems", href: "/constant-pressure-well-pump-systems/" },
      { label: "Well Inspections", href: "/well-inspection/" },
    ],
    relatedHubs: ["upper-cumberland-well-guide", "water-pressure"],
    image: {
      assetPath: IMAGE_DIR + "resources-rural-well-projects.webp",
      fallbackPath: "/images/hero/well-pump-rural-service-mobile.webp",
      fallbackIcon: "house",
      alt: "Private well system serving a rural Tennessee home, outbuilding and surrounding acreage",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A rural residence, barn, workshop or similar property context served by a private-well system.",
      status: "pending",
    },
  },
  {
    slug: "upper-cumberland-well-guide",
    route: "/resources/upper-cumberland-well-guide/",
    displayOrder: 7,
    title: "Upper Cumberland Private Well Guide",
    metaDescription:
      "Explore well-pump and private-well considerations for rural properties across Tennessee's Upper Cumberland region.",
    h1: "Upper Cumberland Private Well Guide",
    breadcrumbLabel: "Upper Cumberland Private Well Guide",
    cardTitle: "Explore Local Well Considerations",
    cardDescription:
      "Learn about access, weather, terrain, power interruptions and rural property conditions that can affect private-well systems in Tennessee's Upper Cumberland region.",
    cardIcon: "mountain",
    intro: [
      "Private-well systems across the Upper Cumberland serve properties with different access conditions, elevations, terrain, building layouts and water demands. Weather events, freezing temperatures, power interruptions and the distance between the well and the structures it serves may also affect system planning and service access.",
      "This section will provide useful regional information without replacing an onsite system evaluation. Each future local guide will contain genuinely distinct regional information rather than repeating one article with place names changed.",
    ],
    factors: [
      "Coverage in the region is provider-dependent — see the service area for how requests are routed",
      "Rural road access, gates and terrain affect how service equipment reaches a well",
      "Freezing weather and storm-related power interruptions are recurring regional realities",
      "Seasonal and part-time properties around the lakes and plateau fail differently than full-time homes",
      "Older systems with sparse records are common on long-held family land",
    ],
    plannedGuidesHeading: "Planned Regional Guides",
    plannedGuides: [
      { title: "Private Well and Pump Guide for Upper Cumberland Property Owners", description: "How private wells and pumps work across the Upper Cumberland, and what local terrain and climate mean for owners.", href: "/resources/guides/private-well-pump-guide-upper-cumberland/", status: "published" },
      { title: "Common Well Pump Problems Around Cookeville", description: "The pump and pressure problems that most often show up around Cookeville, and what their symptoms can point to.", href: "/resources/guides/common-well-pump-problems-cookeville/", status: "published" },
      { title: "Preparing a Rural Well System for Freezing Weather", description: "Practical, safe steps to help a rural Upper Cumberland well system get through hard freezes and winter storms.", href: "/resources/guides/preparing-rural-well-freezing-weather/", status: "published" },
      { title: "How Power Outages Can Affect Private Well Systems", description: "Why storms and outages stop a private well pump, and how Upper Cumberland owners can plan for it safely.", href: "/resources/guides/power-outages-private-well-systems/", status: "published" },
      { title: "Well Pump Service on Steep or Hard-to-Access Property", description: "How steep, wooded lots and long driveways affect well pump service, and how to plan access on Upper Cumberland property.", href: "/resources/guides/well-pump-service-steep-hard-access-property/", status: "published" },
      { title: "Evaluating a Private Well Before Buying Rural Tennessee Property", description: "What to check about a private well before buying rural Upper Cumberland property, from records to water quality to access.", href: "/resources/guides/evaluating-private-well-before-buying-rural-tennessee/", status: "published" },
      { title: "Well-System Considerations for Cabins and Seasonal Homes", description: "What owners of Upper Cumberland cabins and seasonal homes should know about wells that sit idle and face hard winters.", href: "/resources/guides/well-system-cabins-seasonal-homes/", status: "published" },
      { title: "Planning Water Service Across Large Rural Acreage", description: "Considerations for delivering well water across large Upper Cumberland acreage to homes, barns, and distant outbuildings.", href: "/resources/guides/planning-water-service-large-rural-acreage/", status: "published" },
      { title: "Questions to Ask About an Existing Well System", description: "The questions that reveal the most about an existing well system, for buyers and current owners across the Upper Cumberland.", href: "/resources/guides/questions-to-ask-existing-well-system/", status: "published" },
      { title: "What Well-System Records Should Transfer With a Property?", description: "The well-system records worth gathering and passing on when Upper Cumberland property changes hands.", href: "/resources/guides/well-system-records-transfer-with-property/", status: "published" },
      { title: "Preparing a Well System for Increased Household Demand", description: "What changes when household water demand grows, and how Upper Cumberland owners can plan their well system for it.", href: "/resources/guides/preparing-well-system-increased-household-demand/", status: "published" },
      { title: "When Rural Property Access Can Affect Pump Service", description: "How driveways, gates, weather, and remoteness can shape well pump service across the rural Upper Cumberland.", href: "/resources/guides/rural-property-access-pump-service/", status: "published" },
    ],
    relatedServicesHeading: "Related Regional Pages",
    relatedServices: [
      { label: "Upper Cumberland Service Area", href: "/service-area/" },
      { label: "Well Pump Repair in Crossville", href: "/well-pump-repair-crossville-tn/" },
      { label: "Well Pump Repair in Livingston", href: "/well-pump-repair-livingston-tn/" },
      { label: "Well Inspections", href: "/well-inspection/" },
    ],
    relatedHubs: ["rural-well-projects", "maintenance-and-planning"],
    image: {
      assetPath: IMAGE_DIR + "resources-upper-cumberland-well-guide.webp",
      fallbackPath: "/images/other/well-service-ridge-background.webp",
      fallbackIcon: "mountain",
      alt: "Rolling rural landscape and private home representative of Tennessee's Upper Cumberland region",
      aspectRatio: "16:9",
      recommendedWidth: 1600,
      recommendedHeight: 900,
      recommendedSubject:
        "A rolling, wooded rural landscape representative of Tennessee's Upper Cumberland region, with a residence or private-well context where appropriate.",
      status: "pending",
    },
  },
];

export function getHub(slug: string): ResourceHub | undefined {
  return RESOURCE_HUBS.find((h) => h.slug === slug);
}

export const SORTED_HUBS = [...RESOURCE_HUBS].sort((a, b) => a.displayOrder - b.displayOrder);
