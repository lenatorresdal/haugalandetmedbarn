import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { writeSeoPages } from './seo-pages.mjs';
import { activities } from '../src/activities.js';
import { fitsParentalLeave } from '../src/parentalLeave.js';
import { matchesView } from '../src/participation.js';

let directory;
let paths;
const documentFor = async path => new DOMParser().parseFromString(await readFile(join(directory, path, 'index.html'), 'utf8'), 'text/html');

beforeAll(async () => {
  directory = await mkdtemp(join(tmpdir(), 'haugalandet-seo-test-'));
  paths = await writeSeoPages('https://example.no/', directory, () => '<svg aria-hidden="true"></svg>');
});
afterAll(async () => { if (directory) await rm(directory, { recursive: true, force: true }); });

describe('forhåndsgenererte innholdssider', () => {
  it('gir hver aktivitet en side med korrekt canonical og synlig innhold', async () => {
    for (const activity of activities) {
      const path = `/aktiviteter/${activity.id}/`;
      expect(paths).toContain(path);
      const document = await documentFor(path);
      expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(`https://example.no${path}`);
      expect(document.querySelector('h1').textContent).toBe(activity.title);
      expect(document.querySelector('.intro').textContent).toBe(activity.description);
      expect(document.querySelector('.action').getAttribute('href')).toBe(activity.url);
      expect(document.querySelector('.activity-back').getAttribute('href')).toBe('/?tilbud=all#aktiviteter');
      expect(document.querySelector('.activity-illustration svg').getAttribute('aria-hidden')).toBe('true');
      expect(document.querySelector('script[src="/analytics-consent.js"]')).not.toBeNull();
      expect(document.querySelector('[data-analytics-settings]')).not.toBeNull();
    }
  });

  it('viser alle kurs og lar stedssiden åpne hele oversikten med valgt sted', async () => {
    const courses = await documentFor('/kurs/');
    const courseLinks = [...courses.querySelectorAll('.columns a')].map(link => link.getAttribute('href'));
    expect(courseLinks).toEqual(activities.filter(activity => matchesView(activity, 'courses')).map(activity => `/aktiviteter/${activity.id}/`));
    const karmoy = await documentFor('/steder/karmoy/');
    expect(karmoy.querySelector('h1').textContent).toBe('Aktiviteter for barn på Karmøy');
    const href = new URL(karmoy.querySelector('.filter-link').getAttribute('href'), 'https://example.no');
    expect(href.searchParams.get('tilbud')).toBe('all');
    expect(href.searchParams.get('sted')).toBe('Karmøy');
    expect(karmoy.querySelector('.skip-link').getAttribute('href')).toBe('#innhold');
  });
  it('viser en tydelig sti og markerer riktig navigasjon på underliggende sider', async () => {
    const activity = await documentFor('/aktiviteter/babysvomming/');
    const trail = activity.querySelector('nav[aria-label="Du er her"]');
    expect([...trail.querySelectorAll('li')].map(item => item.textContent)).toEqual([
      'Alle aktiviteter', 'Steder', 'Haugesund', 'Babysvømming på Havnaberg',
    ]);
    expect(trail.querySelector('[aria-current="page"]').textContent).toBe('Babysvømming på Havnaberg');
    expect(trail.querySelector('a[href="/steder/haugesund/"]')).not.toBeNull();
    const places = await documentFor('/steder/karmoy/');
    expect(places.querySelector('.page-nav [aria-current]')).toBeNull();
    expect(activity.querySelector('.page-nav [aria-current]')).toBeNull();
    expect(activity.querySelector('.page-nav .is-current-section')).toBeNull();
    const placesIndex = await documentFor('/steder/');
    expect(placesIndex.querySelector('.page-nav [aria-current="page"]').textContent).toBe('Steder');
    const courses = await documentFor('/kurs/');
    expect(courses.querySelector('.page-nav a').getAttribute('href')).toBe('/?tilbud=all#aktiviteter');
    expect(courses.querySelector('.breadcrumbs a').getAttribute('href')).toBe('/?tilbud=all#aktiviteter');
    expect(courses.querySelector('.page-nav [aria-current="page"]').textContent).toBe('Kurs og påmelding');
  });

  it.each([
    ['Haugesund', 'haugesund', 'i'],
    ['Karmøy', 'karmoy', 'på'],
    ['Sveio', 'sveio', 'i'],
    ['Tysvær', 'tysvaer', 'i'],
    ['Vindafjord', 'vindafjord', 'i'],
  ])('lenker til en egen permisjonsoversikt for %s', async (place, slug, preposition) => {
    const placePath = `/steder/${slug}/`;
    const path = `${placePath}permisjon/`;
    const placeDocument = await documentFor(placePath);
    expect(placeDocument.querySelector(`main a[href="${path}"]`)).not.toBeNull();
    expect(paths).toContain(path);

    const document = await documentFor(path);
    expect(document.querySelector('h1').textContent).toBe(`I permisjon ${preposition} ${place} – aktiviteter med baby`);
    expect(document.querySelector('link[rel="canonical"]').getAttribute('href')).toBe(`https://example.no${path}`);
    const links = [...document.querySelectorAll('main section:first-of-type .columns a')];
    const expected = activities.filter(activity => activity.municipality === place && fitsParentalLeave(activity));
    expect(expected.length).toBeGreaterThan(0);
    expect(links.map(link => link.getAttribute('href'))).toEqual(expected.map(activity => `/aktiviteter/${activity.id}/`));
    const filterUrl = new URL(document.querySelector('.filter-link').getAttribute('href'), 'https://example.no');
    expect(filterUrl.searchParams.get('sted')).toBe(place);
    expect(filterUrl.searchParams.get('permisjon')).toBe('1');
  });

  it('har samme navigasjon på personvernsiden og de øvrige innholdssidene', async () => {
    const privacy = new DOMParser().parseFromString(await readFile('public/personvern/index.html', 'utf8'), 'text/html');
    const activity = await documentFor('/aktiviteter/babysvomming/');
    const links = (doc, selector) => [...doc.querySelectorAll(selector)].map(a => [a.textContent.trim(), a.getAttribute('href')]);
    expect(links(privacy, '.page-nav a')).toEqual(links(activity, '.page-nav a'));
    expect(links(privacy, '.site-footer a')).toEqual(links(activity, '.site-footer a'));
    expect(privacy.querySelector('.site-name img').getAttribute('src')).toBe('/logo.png');
    expect(privacy.querySelector('.activity-back').getAttribute('href')).toBe('/?tilbud=all#aktiviteter');
    expect(privacy.querySelector('.site-footer img')).toBeNull();
    expect(privacy.querySelector('script[src="/analytics-consent.js"]')).not.toBeNull();
    expect(privacy.querySelector('[data-analytics-settings]')).not.toBeNull();
  });

  it('har egne landemerker for navigasjon, hovedinnhold og footer', async () => {
    const privacy = new DOMParser().parseFromString(await readFile('public/personvern/index.html', 'utf8'), 'text/html');
    const pages = [privacy, await documentFor('/aktiviteter/babysvomming/'), await documentFor('/kurs/'), await documentFor('/steder/'), await documentFor('/steder/karmoy/')];
    for (const document of pages) {
      const shell = document.querySelector('.site-shell');
      expect(shell.querySelector(':scope > header.site-header')).not.toBeNull();
      expect(shell.querySelector(':scope > main#innhold').getAttribute('tabindex')).toBe('-1');
      expect(shell.querySelector(':scope > footer.site-footer')).not.toBeNull();
      expect(document.querySelector('.skip-link').getAttribute('href')).toBe('#innhold');
    }
  });

});
