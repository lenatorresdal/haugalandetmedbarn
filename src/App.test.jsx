import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { activities } from './activities.js';
import { isAllAges } from './ageFilters.js';

beforeEach(() => { localStorage.clear(); window.history.replaceState(null, '', '/'); });
afterEach(cleanup);

describe('aktivitetsoversikten', () => {
  it('åpner en delt aktivitet uavhengig av filtre og lar brukeren vise resten', async () => {
    window.history.replaceState(null, '', '/?aktivitet=babysvomming&sted=Karm%C3%B8y');
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.queryByLabelText('Sted')).toBeNull();
    expect(screen.getByRole('heading', { name: activities.find(activity => activity.id === 'babysvomming').title })).toBeTruthy();
    expect(within(screen.getByRole('article')).getByRole('link', { name: 'Babysvømming på Havnaberg' }).getAttribute('href')).toBe('/aktiviteter/babysvomming/');
    expect(document.activeElement).toBe(screen.getByRole('article'));
    await user.click(screen.getByRole('button', { name: 'Til aktivitetsoversikten' }));
    expect(new URLSearchParams(window.location.search).has('aktivitet')).toBe(false);
    expect(screen.queryByText(/Du ser en delt aktivitet/)).toBeNull();
    expect(screen.getByLabelText('Sted').value).toBe('Karmøy');
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Aktiviteter', exact: true }));
  });

  it('åpner oversikten på riktig sted uten animert rulling', () => {
    const original = HTMLElement.prototype.scrollIntoView;
    const scrollIntoView = vi.fn();
    HTMLElement.prototype.scrollIntoView = scrollIntoView;
    window.history.replaceState(null, '', '/?tilbud=all');
    window.initialActivityAnchor = true;
    try {
      render(<App />);
      expect(window.location.hash).toBe('#aktiviteter');
      expect(screen.getByRole('button', { name: 'Alle tilbud' }).getAttribute('aria-pressed')).toBe('true');
      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'instant', block: 'start' });
    } finally {
      HTMLElement.prototype.scrollIntoView = original;
      delete window.initialActivityAnchor;
    }
  });

  it('har tydelige landemerker for topp, hovedinnhold og bunn', () => {
    render(<App />);
    expect(screen.getByRole('banner').contains(screen.getByRole('heading', { name: 'Haugalandet med barn' }))).toBe(true);
    expect(screen.getByRole('main').contains(screen.getByRole('heading', { name: 'Aktiviteter', exact: true }))).toBe(true);
    expect(screen.getByRole('contentinfo').contains(screen.getByRole('link', { name: 'Personvern' }))).toBe(true);
  });

  it('lar tastaturbrukere hoppe direkte til resultatene', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.tab();
    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Hopp til aktiviteter' }));
    await user.keyboard('{Enter}');
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Aktiviteter', exact: true }));
  });

  it('starter med opplevelser og finner kurs uten å miste favoritter', async () => {
    const user = userEvent.setup();
    localStorage.setItem('permliv-favorites', '["babysvomming-karmoyhallen"]');
    render(<App />);
    expect(screen.getByRole('button', { name: 'Opplevelser' }).getAttribute('aria-pressed')).toBe('true');
    expect(screen.queryByRole('heading', { name: 'Babysvømming i Karmøyhallen' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Fortellerstund på Haugesund folkebibliotek' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Babysang i Torvastad kirke' })).toBeTruthy();
    expect(screen.queryByRole('searchbox')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Mine favoritter (1)' }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'Vis disse tilbudene' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Aktiviteter', exact: true }));
    expect(screen.getByRole('heading', { name: 'Babysvømming i Karmøyhallen' })).toBeTruthy();
    expect(screen.getByText('Kurs med påmelding')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mine favoritter (1)' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('viser aldersspesifikke treff før alle aldre kun når alder er valgt', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    await user.click(screen.getByText('Alle aldre', { selector: '#age-filter-value' }));
    await user.click(screen.getByRole('checkbox', { name: '3–5 år' }));
    const cards = [...document.querySelectorAll('#activity-results > article')];
    const isAllAgesCard = card => isAllAges(activities.find(activity => activity.title === within(card).getByRole('heading').textContent));
    const firstAllAges = cards.findIndex(isAllAgesCard);
    expect(firstAllAges).toBeGreaterThan(0);
    expect(cards.slice(firstAllAges).every(isAllAgesCard)).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Velg alle aldre' }));
    expect(screen.getAllByRole('article').map(card => within(card).getByRole('heading').textContent))
      .toEqual(activities.map(activity => activity.title));
  });

  it('velger flere aldre og fjerner én uten å miste de andre', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    await user.click(screen.getByText('Alle aldre', { selector: '#age-filter-value' }));
    await user.click(screen.getByRole('checkbox', { name: 'Under 1 år' }));
    await user.click(screen.getByRole('checkbox', { name: '3–5 år' }));
    expect(screen.getByRole('heading', { name: 'Biblobaby – babysang på Haugesund folkebibliotek' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Fortellerstund på Haugesund folkebibliotek' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Biblobarn – småbarnssang på Haugesund folkebibliotek' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Fjern filter: Under 1 år' }));
    expect(screen.queryByRole('heading', { name: 'Biblobaby – babysang på Haugesund folkebibliotek' })).toBeNull();
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Aktiviteter', exact: true }));
    await user.click(document.querySelector('.age-picker summary'));
    expect(screen.getByRole('checkbox', { name: '3–5 år' }).checked).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Velg alle aldre' }));
    expect(screen.getAllByRole('article')).toHaveLength(activities.length);
  });

  it('kombinerer sted og aktivitetstype og kan fjerne ett filter', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    await user.selectOptions(screen.getByLabelText('Sted'), 'Karmøy');
    await user.selectOptions(screen.getByLabelText('Aktivitetstype'), 'Sang & musikk');
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
    expect(screen.getAllByRole('article').every(card => within(card).queryByText('Sang & musikk'))).toBe(true);
    await user.click(screen.getByRole('button', { name: 'Fjern filter: Karmøy' }));
    expect(screen.getByLabelText('Sted').value).toBe('Alle steder');
    expect(screen.getByLabelText('Aktivitetstype').value).toBe('Sang & musikk');
    expect(screen.getByRole('button', { name: 'Fjern filter: Sang & musikk' })).toBeTruthy();
  });

  it('lukker aldersmenyen uten å miste valgene', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(within(document.querySelector('footer')).getByRole('link', { name: 'Personvern' }).getAttribute('href')).toBe('/personvern');
    const picker = document.querySelector('.age-picker');
    const summary = picker.querySelector('summary');
    await user.click(summary);
    await user.click(screen.getByRole('checkbox', { name: '3–5 år' }).closest('label'));
    expect(picker.open).toBe(true);
    expect(screen.getByRole('checkbox', { name: '3–5 år' }).checked).toBe(true);
    await user.keyboard('{Escape}');
    expect(picker.open).toBe(false);
    expect(document.activeElement).toBe(summary);
    await user.click(summary);
    expect(screen.getByRole('checkbox', { name: '3–5 år' }).checked).toBe(true);
    await user.click(screen.getByLabelText('Sted'));
    expect(picker.open).toBe(false);
    await user.click(summary);
    await user.click(screen.getByRole('button', { name: 'Ferdig' }));
    expect(picker.open).toBe(false);
    expect(document.activeElement).toBe(summary);
  });

  it('kombinerer favoritter med kategori, alder og sted', async () => {
    const user = userEvent.setup();
    localStorage.setItem('permliv-favorites', '["tur", "babysang-norheim"]');
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    await user.click(screen.getByRole('button', { name: 'Mine favoritter (2)' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.selectOptions(screen.getByLabelText('Aktivitetstype'), 'Sang & musikk');
    await user.click(screen.getByText('Alle aldre', { selector: '#age-filter-value' }));
    await user.click(screen.getByRole('checkbox', { name: 'Under 1 år' }));
    await user.selectOptions(screen.getByLabelText('Sted'), 'Karmøy');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Babysang i Norheim kirke' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Favoritt: Babysang i Norheim kirke' }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(document.activeElement).toBe(screen.getByRole('heading', { name: 'Aktiviteter', exact: true }));
    await user.click(screen.getByRole('button', { name: 'Nullstill filtre' }));
    expect(screen.getAllByRole('article')).toHaveLength(activities.length);
    expect(screen.getByRole('button', { name: 'Mine favoritter (1)' }).getAttribute('aria-pressed')).toBe('false');
  });

  it('viser alder og inkluderer Havnaberg fra 2 år', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    await user.click(screen.getByText('Alle aldre', { selector: '#age-filter-value' }));
    await user.click(screen.getByRole('checkbox', { name: '1–2 år' }));
    expect(screen.queryByRole('heading', { name: 'Fortellerstund på Haugesund folkebibliotek' })).toBeNull();
    const biblobarn = screen.getByRole('heading', { name: 'Biblobarn – småbarnssang på Haugesund folkebibliotek' }).closest('article');
    expect(within(biblobarn).getByText('Alder: 1–2 år')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Svømmetilbud for større barn på Havnaberg' })).toBeTruthy();
    expect(screen.queryByRole('region', { name: 'Sjekk alder hos arrangøren' })).toBeNull();
    await user.click(screen.getByRole('checkbox', { name: '1–2 år' }));
    await user.click(screen.getByRole('checkbox', { name: '3–5 år' }));
    expect(screen.queryByRole('heading', { name: 'Biblobarn – småbarnssang på Haugesund folkebibliotek' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Fortellerstund på Haugesund folkebibliotek' })).toBeTruthy();
  });

  it('lagrer favoritter mellom besøk og tåler ugyldig lagring', async () => {
    const user = userEvent.setup();
    localStorage.setItem('permliv-favorites', '{"invalid":true}');
    const view = render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    expect(screen.getAllByRole('button', { name: /^Favoritt: / })).toHaveLength(activities.length);
    await user.click(screen.getByRole('button', { name: 'Favoritt: Åpen barnehage i Haugesund' }));
    expect(screen.getByText('Åpen barnehage i Haugesund er lagret i Mine favoritter.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mine favoritter (1)' })).toBeTruthy();
    view.unmount();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    expect(screen.getByRole('button', { name: 'Favoritt: Åpen barnehage i Haugesund' }).getAttribute('aria-pressed')).toBe('true');
  });
});
