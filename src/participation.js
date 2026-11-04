export const participationTypes = {
  planned: { label: "Under planlegging", view: "courses" },
  open: { label: "Åpent tilbud", view: "experiences" },
  booking: { label: "Bestill besøk", view: "experiences" },
  bookingSession: { label: "Bestill time", view: "experiences" },
  course: { label: "Kurs med påmelding", view: "courses" },
  signup: { label: "Påmelding", view: "courses" },
  check: { label: "Sjekk påmelding", view: "courses" },
};

export const activityViews = [
  { value: "experiences", label: "Opplevelser og åpne tilbud" },
  { value: "courses", label: "Kurs og påmelding" },
  { value: "all", label: "Alle tilbud" },
];

export function matchesView(activity, view) {
  return view === "all" || participationTypes[activity.participation].view === view;
}
