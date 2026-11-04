export const ageGroups = [
  { value: "all", label: "Alle aldre", minMonths: 0, maxMonths: Infinity },
  { value: "baby", label: "Under 1 år", minMonths: 0, maxMonths: 12 },
  { value: "toddler", label: "1–2 år", minMonths: 12, maxMonths: 36 },
  { value: "preschool", label: "3–5 år", minMonths: 36, maxMonths: 72 },
  { value: "school", label: "6–9 år", minMonths: 72, maxMonths: 120 },
  { value: "older", label: "10 år og eldre", minMonths: 120, maxMonths: Infinity },
];

export function matchesAge(activity, group) {
  if (group.value === "all") return true;
  if (!activity.ageRange) return false;
  return activity.ageRange.minMonths < group.maxMonths &&
    (activity.ageRange.maxMonths ?? Infinity) > group.minMonths;
}

export function isAllAges(activity) {
  return activity.ageRange?.minMonths === 0 && activity.ageRange.maxMonths === null;
}
