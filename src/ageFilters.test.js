import { expect, it } from 'vitest';
import { activities } from './activities.js';
import { ageGroups, matchesAge } from './ageFilters.js';

it('håndterer overlapp, åpne intervaller og eksklusive øvre grenser', () => {
  const toddler = ageGroups.find(group => group.value === 'toddler');
  expect(matchesAge({ ageRange: { minMonths: 0, maxMonths: 12 } }, toddler)).toBe(false);
  expect(matchesAge({ ageRange: { minMonths: 12, maxMonths: 36 } }, toddler)).toBe(true);
  expect(matchesAge({ ageRange: { minMonths: 36, maxMonths: null } }, toddler)).toBe(false);
  expect(matchesAge({ ageRange: { minMonths: 0, maxMonths: null } }, toddler)).toBe(true);
  expect(matchesAge({ ageRange: null }, toddler)).toBe(false);
  expect(matchesAge({ ageRange: null }, ageGroups[0])).toBe(true);
});

it('har eksplisitte og gyldige aldersdata for alle aktiviteter', () => {
  for (const activity of activities) {
    expect(activity).toHaveProperty('ageRange');
    if (activity.ageRange === null) continue;
    expect(activity.ageRange.minMonths).toBeGreaterThanOrEqual(0);
    if (activity.ageRange.maxMonths !== null) {
      expect(activity.ageRange.maxMonths).toBeGreaterThan(activity.ageRange.minMonths);
    }
  }
});
