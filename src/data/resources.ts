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
      { title: "How Much Does Well Pump Replacement Cost in Tennessee?", status: "planned" },
      { title: "What Affects the Cost of Well Pump Repair?", status: "planned" },
      { title: "Should You Repair or Replace a Well Pump?", status: "planned" },
      { title: "How Well Depth Can Affect Pump Replacement", status: "planned" },
      { title: "Submersible Pump Versus Jet Pump Replacement", status: "planned" },
      { title: "How Much Does Pressure Tank Replacement Cost?", status: "planned" },
      { title: "Why Pulling a Deep-Well Pump Can Affect Labor", status: "planned" },
      { title: "Does a Well Pump Estimate Include Wiring and Pipe?", status: "planned" },
      { title: "What Information Is Needed for a Pump Replacement Estimate?", status: "planned" },
      { title: "Why Emergency Well Pump Repairs Can Vary in Scope", status: "planned" },
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
      { title: "Why Did My Well Water Suddenly Stop?", status: "planned" },
      { title: "Well Pump Runs but No Water Reaches the House", status: "planned" },
      { title: "Why a Well Pump May Not Turn On", status: "planned" },
      { title: "Why a Well Pump Runs Constantly", status: "planned" },
      { title: "What Causes a Well Pump to Short Cycle?", status: "planned" },
      { title: "Why a Well Pump Breaker Keeps Tripping", status: "planned" },
      { title: "What Causes Air or Sputtering at the Faucets?", status: "planned" },
      { title: "Why Water Stops After a Power Outage", status: "planned" },
      { title: "Signs a Well Pump May Be Failing", status: "planned" },
      { title: "Common Pressure-Switch Problems", status: "planned" },
      { title: "What a Clicking Well System May Indicate", status: "planned" },
      { title: "When a No-Water Problem Requires Immediate Service", status: "planned" },
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
      { title: "What Causes Low Water Pressure on a Private Well?", status: "planned" },
      { title: "Low Pressure Throughout the House Versus One Fixture", status: "planned" },
      { title: "How a Pressure Tank Affects Water Pressure", status: "planned" },
      { title: "Why Water Pressure Drops During Heavy Use", status: "planned" },
      { title: "What Causes Water Pressure to Surge?", status: "planned" },
      { title: "Well Yield Versus Pump Capacity", status: "planned" },
      { title: "How to Read Basic Well-System Pressure Symptoms", status: "planned" },
      { title: "What Is a Constant-Pressure Well System?", status: "planned" },
      { title: "Constant-Pressure Systems Versus Traditional Pressure Tanks", status: "planned" },
      { title: "Can a Larger Pressure Tank Improve Water Pressure?", status: "planned" },
      { title: "Why Multiple Fixtures Can Reduce Well-Water Flow", status: "planned" },
      { title: "When Low Pressure May Indicate a Pump Problem", status: "planned" },
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
      { title: "How Does a Residential Well Pump System Work?", status: "planned" },
      { title: "Submersible Well Pumps Versus Jet Pumps", status: "planned" },
      { title: "What Does a Well Pressure Tank Do?", status: "planned" },
      { title: "How Does a Well Pressure Switch Work?", status: "planned" },
      { title: "What Is a Well Pump Control Box?", status: "planned" },
      { title: "What Does a Well Pump Capacitor Do?", status: "planned" },
      { title: "What Is a Pitless Adapter?", status: "planned" },
      { title: "Why Are Check Valves Used in Well Systems?", status: "planned" },
      { title: "What Are Drop Pipe and Pump Wire?", status: "planned" },
      { title: "What Is the Purpose of a Well Cap or Seal?", status: "planned" },
      { title: "What Does a Well-System Pressure Gauge Show?", status: "planned" },
      { title: "Which Well Components Are Located Inside the House?", status: "planned" },
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
      { title: "What Information Does a Well Pump Technician Need?", status: "planned" },
      { title: "What Photos Should You Send Before Well Pump Service?", status: "planned" },
      { title: "How to Locate the Well Head on Your Property", status: "planned" },
      { title: "How to Prepare Access for a Well Pump Service Truck", status: "planned" },
      { title: "What to Do When a Well Pump Stops Working", status: "planned" },
      { title: "How Long Can Well Pump Replacement Take?", status: "planned" },
      { title: "What Well-System Maintenance Should Homeowners Track?", status: "planned" },
      {
        title: "How to Protect Accessible Well Components During Freezing Weather",
        status: "planned",
      },
      { title: "What to Check After a Storm or Power Outage", status: "planned" },
      { title: "When Should a Pressure Tank Be Evaluated?", status: "planned" },
      { title: "Questions to Ask Before Buying a Home With a Private Well", status: "planned" },
      { title: "What Well-System Records Should a Property Owner Keep?", status: "planned" },
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
      { title: "Well Pump Planning for a Rural Home", status: "planned" },
      { title: "Well-Water Systems for Cabins and Seasonal Properties", status: "planned" },
      { title: "Well Pump Considerations for Farms and Livestock", status: "planned" },
      { title: "Planning Well Water for a New Rural Home", status: "planned" },
      { title: "Supplying Water to a Detached Garage or Workshop", status: "planned" },
      { title: "Well-Pump Considerations for Long Water-Line Runs", status: "planned" },
      { title: "Improving Water Pressure Across a Large Property", status: "planned" },
      { title: "Preparing Remote Property Access for Pump Service", status: "planned" },
      { title: "Backup Water Planning During Power Outages", status: "planned" },
      { title: "Well Houses: Access, Ventilation and Freeze Protection", status: "planned" },
      { title: "Evaluating an Older Well System on Rural Property", status: "planned" },
      { title: "What to Know Before Buying Undeveloped Land With a Well", status: "planned" },
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
      {
        title: "Private Well and Pump Guide for Upper Cumberland Property Owners",
        status: "planned",
      },
      { title: "Common Well Pump Problems Around Cookeville", status: "planned" },
      { title: "Preparing a Rural Well System for Freezing Weather", status: "planned" },
      { title: "How Power Outages Can Affect Private Well Systems", status: "planned" },
      { title: "Well Pump Service on Steep or Hard-to-Access Property", status: "planned" },
      {
        title: "Evaluating a Private Well Before Buying Rural Tennessee Property",
        status: "planned",
      },
      { title: "Well-System Considerations for Cabins and Seasonal Homes", status: "planned" },
      { title: "Planning Water Service Across Large Rural Acreage", status: "planned" },
      { title: "Questions to Ask About an Existing Well System", status: "planned" },
      { title: "What Well-System Records Should Transfer With a Property?", status: "planned" },
      { title: "Preparing a Well System for Increased Household Demand", status: "planned" },
      { title: "When Rural Property Access Can Affect Pump Service", status: "planned" },
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
