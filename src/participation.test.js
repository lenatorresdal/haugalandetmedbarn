import { expect, it } from 'vitest';
import { activities } from './activities.js';
import { matchesView, participationTypes } from './participation.js';

it('fordeler alle aktiviteter i én visning og beholder alle i samlet oversikt', () => {
  for (const activity of activities) {
    expect(participationTypes).toHaveProperty(activity.participation);
    expect(matchesView(activity, 'all')).toBe(true);
    expect(Number(matchesView(activity, 'experiences')) + Number(matchesView(activity, 'courses'))).toBe(1);
  }
});

it('viser trening med baby under kurs og påmelding, med unntak av barselklatring', () => {
  const babyTraining = activities.filter(activity => activity.category === 'Trening med baby');
  expect(babyTraining.filter(activity => matchesView(activity, 'experiences')).map(activity => activity.id))
    .toEqual(['barselklatring-haugalandsveggen']);
});
