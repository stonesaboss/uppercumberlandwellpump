export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  children?: NavLink[];
}

export const WELL_PUMP_SERVICES: NavLink[] = [
  { label: "Well Pump Repair", href: "/well-pump-repair-cookeville-tn/" },
  { label: "Emergency No-Water Requests", href: "/emergency-no-water-well-service/" },
  { label: "Well Pump Replacement", href: "/well-pump-replacement/" },
  { label: "Pressure Tank Replacement", href: "/pressure-tank-replacement/" },
  { label: "Low Water Pressure", href: "/low-water-pressure-from-well/" },
  { label: "Well Pump Installation", href: "/well-pump-installation/" },
  { label: "Constant-Pressure Systems", href: "/constant-pressure-well-pump-systems/" },
];

export const WATER_WELL_SERVICES: NavLink[] = [
  { label: "Water Well Drilling", href: "/water-well-drilling/" },
  { label: "Well Inspections", href: "/well-inspection/" },
  { label: "Water Treatment & Filtration", href: "/well-water-treatment-filtration/" },
  { label: "Existing Well Evaluation", href: "/well-inspection/#existing-well-evaluation" },
];

export const SERVICE_AREAS_NAV: NavLink[] = [
  { label: "Cookeville", href: "/well-pump-repair-cookeville-tn/" },
  { label: "Crossville", href: "/well-pump-repair-crossville-tn/" },
  { label: "Livingston", href: "/well-pump-repair-livingston-tn/" },
  { label: "Sparta", href: "/service-area/#sparta" },
  { label: "Upper Cumberland Service Area", href: "/service-area/" },
];

export const PRIMARY_NAV: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "Well Pump Services", children: WELL_PUMP_SERVICES },
  { label: "Common Problems", href: "/common-well-problems/" },
  { label: "Water Well Services", children: WATER_WELL_SERVICES },
  { label: "Service Areas", children: SERVICE_AREAS_NAV },
  { label: "FAQs", href: "/#faqs" },
  { label: "About This Service", href: "/about-this-service/" },
];

export const FOOTER_SERVICES: NavLink[] = [
  { label: "Well Pump Repair in Cookeville", href: "/well-pump-repair-cookeville-tn/" },
  { label: "Emergency No-Water Requests", href: "/emergency-no-water-well-service/" },
  { label: "Well Pump Replacement", href: "/well-pump-replacement/" },
  { label: "Pressure Tank Replacement", href: "/pressure-tank-replacement/" },
  { label: "Low Water Pressure Help", href: "/low-water-pressure-from-well/" },
  { label: "Well Pump Installation", href: "/well-pump-installation/" },
  { label: "Water Well Drilling", href: "/water-well-drilling/" },
  { label: "Well Inspections", href: "/well-inspection/" },
  { label: "Water Treatment & Filtration", href: "/well-water-treatment-filtration/" },
  { label: "Constant-Pressure Systems", href: "/constant-pressure-well-pump-systems/" },
];

export const FOOTER_AREAS: NavLink[] = [
  { label: "Cookeville & Putnam County", href: "/well-pump-repair-cookeville-tn/" },
  { label: "Crossville & Cumberland County", href: "/well-pump-repair-crossville-tn/" },
  { label: "Livingston & Overton County", href: "/well-pump-repair-livingston-tn/" },
  { label: "Sparta & White County", href: "/service-area/#sparta" },
  { label: "Full Service Area", href: "/service-area/" },
];

export const FOOTER_RESOURCES: NavLink[] = [
  { label: "Common Well Problems", href: "/common-well-problems/" },
  { label: "About This Service", href: "/about-this-service/" },
  { label: "How Referrals Work", href: "/how-referrals-work/" },
  { label: "Tennessee Licensing Information", href: "/licensing-information/" },
  { label: "Referral Disclosure", href: "/referral-disclosure/" },
  { label: "Contact", href: "/contact/" },
];

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Use", href: "/terms/" },
  { label: "Accessibility", href: "/accessibility/" },
];
