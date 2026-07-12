export interface Faq {
  question: string;
  answer: string;
}

/** Homepage FAQs — also emitted as FAQPage structured data (visible on page). */
export const HOME_FAQS: Faq[] = [
  {
    question: "Why does my well suddenly have no water?",
    answer:
      "Possible causes include loss of power, a tripped breaker, control or wiring problems, pressure-switch issues, pressure-tank problems, pump failure, plumbing issues or low well yield. Similar symptoms can have different causes, so an evaluation may be required.",
  },
  {
    question: "How do I know whether the well pump needs repair or replacement?",
    answer:
      "The decision can depend on the failed component, pump condition, repeat breakdowns, system demand, well condition, repair cost and replacement options. Age alone is not enough to determine the answer.",
  },
  {
    question: "What causes low water pressure on a private well?",
    answer:
      "Possible factors include pump performance, pressure settings, pressure-tank condition, plumbing restrictions, clogged filters, leaks, treatment equipment, high demand or well yield.",
  },
  {
    question: "What does a pressure tank do?",
    answer:
      "A pressure tank stores pressurized water, helps reduce pump cycling and supports steadier delivery. Tank type and system design vary.",
  },
  {
    question: "Why does my well pump keep turning on and off?",
    answer:
      "Rapid cycling may involve the pressure tank, pressure settings, leaks, controls or system demand. Frequent cycling can place additional stress on equipment.",
  },
  {
    question: "How much does well-pump repair cost?",
    answer:
      "Cost depends on the cause, pump type, well depth, accessibility, parts, electrical work, pressure equipment, labor, travel and provider pricing. A specific figure can only come from the provider after the system is evaluated.",
  },
  {
    question: "How long does well-pump replacement take?",
    answer:
      "Timing depends on pump type, well depth, equipment availability, access, electrical condition, provider schedule and whether other components require service.",
  },
  {
    question: "Can a well pump be repaired during a no-water emergency?",
    answer:
      "The provider must determine whether repair, component replacement, pump replacement or another solution is appropriate. Urgent availability varies.",
  },
  {
    question: "Do I need a new well if the pump stops working?",
    answer:
      "Not necessarily. A pump, control, electrical, pressure or plumbing problem may occur even when the well itself remains usable.",
  },
  {
    question: "Who is allowed to repair or install well pumps in Tennessee?",
    answer:
      "Tennessee regulates water-well drillers, pump installers and water-treatment device installers. Confirm the provider's current applicable license before work begins.",
  },
  {
    question: "Can the website guarantee that a provider is available?",
    answer:
      "No. Coverage and availability depend on the provider, location, service type, schedule and project requirements.",
  },
  {
    question: "Can water color, odor or taste identify the problem?",
    answer:
      "No. Changes can have multiple causes. Appropriate water testing and professional evaluation may be needed.",
  },
];
