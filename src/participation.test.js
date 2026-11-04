import { expect, it } from 'vitest';
import { activities } from './activities.js';
import { matchesView, participationTypes } from './participation.js';

it('fordeler alle tilbud i én visning og beholder alle i samlet oversikt', () => {
  for (const activity of activities) {
    expect(participationTypes).toHaveProperty(activity.participation);
    expect(matchesView(activity, 'all')).toBe(true);
    expect(Number(matchesView(activity, 'experiences')) + Number(matchesView(activity, 'courses'))).toBe(1);
  }
});
