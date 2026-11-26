export const participationTypes = {
  planned: { view: "courses" },
  open: { view: "experiences" },
  booking: { view: "experiences", booking: "Sjekk med arrangøren" },
  bookingOptional: { view: "experiences", booking: "Valgfri" },
  bookingRequired: { view: "experiences", booking: "Kreves" },
  bookingSession: { view: "experiences", booking: "Bestill time hos arrangøren" },
  course: { view: "courses", registration: "Kreves" },
  signup: { view: "courses", registration: "Kreves" },
  ticketed: { view: "courses", ticket: "Kreves" },
  check: { view: "courses", registration: "Sjekk med arrangøren" },
};

export const activityViews = [
  { value: "all", label: "Alle aktiviteter" },
  { value: "experiences", label: "Opplevelser" },
  { value: "courses", label: "Kurs og påmelding" },
];

export function matchesView(activity, view) {
  const activityView = activity.category === "Trening med baby" && activity.id !== "barselklatring-haugalandsveggen"
    ? "courses"
    : participationTypes[activity.participation].view;
  return view === "all" || activityView === view;
}
