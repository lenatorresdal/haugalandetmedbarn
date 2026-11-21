import { describe, expect, it } from 'vitest';
import { activities } from './activities.js';

const recentActivityIds = new Set([
  'haugaland-zoo',
  'barnas-turlag-haugesund',
  'barnas-turlag-karmoy',
  'barnas-turlag-tysvaer',
  'barnas-turlag-vindafjord',
  'barnas-turlag-sveio',
  'familielordag-gamle-slaktehuset',
  'familielordag-tysvaertunet',
  'kulturlek-karmoy',
  'familieverksted-haugalandmuseet',
  'dagsturhyttene-sveio',
  'vadhytta-vindafjord',
  'turboturer-vindafjord',
  'barselyoga-sentrum-yoga',
  'trilletur-dnt-haugesund',
]);

describe('illustrasjoner for nye aktiviteter', () => {
  it('bruker en egen scene for hver aktivitet uten gjenbruk fra eldre aktiviteter', () => {
    const recentActivities = activities.filter(({ id }) => recentActivityIds.has(id));
    const recentScenes = recentActivities.map(({ scene }) => scene);
    const existingScenes = new Set(
      activities.filter(({ id }) => !recentActivityIds.has(id)).map(({ scene }) => scene),
    );

    expect(recentActivities).toHaveLength(recentActivityIds.size);
    expect(new Set(recentScenes).size).toBe(recentScenes.length);
    expect(recentActivities.filter(({ scene }) => existingScenes.has(scene))).toEqual([]);
  });

  it('gir bibliotekillustrasjonene forskjellige bakgrunnsfarger', () => {
    const libraryActivities = activities.filter(({ scene }) =>
      ['library', 'libraryCafe'].includes(scene),
    );
    const backgrounds = libraryActivities.map(({ bg }) => bg);

    expect(new Set(backgrounds).size).toBe(backgrounds.length);
  });
});
