import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';
import { activities } from './activities.js';

beforeEach(() => { localStorage.clear(); window.history.replaceState(null, '', '/'); });
afterEach(cleanup);

describe('aktivitetsoversikten', () => {
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
    expect(screen.getByRole('heading', { name: 'Fortellerstund på biblioteket' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Babysang i Torvastad kirke' })).toBeTruthy();
    expect(screen.queryByRole('searchbox')).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Mine favoritter (1)' }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'Vis disse tilbudene' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
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
    const firstAllAges = cards.findIndex(card => within(card).queryByText('Alder: Alle aldre'));
    expect(firstAllAges).toBeGreaterThan(0);
    expect(cards.slice(firstAllAges).every(card => within(card).queryByText('Alder: Alle aldre'))).toBe(true);
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
    expect(screen.getByRole('heading', { name: 'Biblobaby på biblioteket' })).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Fortellerstund på biblioteket' })).toBeTruthy();
    expect(screen.queryByRole('heading', { name: 'Biblobarn på biblioteket' })).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Fjern filter: Under 1 år' }));
    expect(screen.queryByRole('heading', { name: 'Biblobaby på biblioteket' })).toBeNull();
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
    expect(document.querySelector('footer')).toBeNull();
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
    await user.click(screen.getByRole('button', { name: /Fjern Babysang i Norheim/ }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    await user.click(screen.getByRole('button', { name: 'Nullstill filtre' }));
    expect(screen.getAllByRole('article')).toHaveLength(activities.length);
    expect(screen.getByRole('button', { name: 'Mine favoritter (1)' }).getAttribute('aria-pressed')).toBe('false');
  });

  it('viser alder og pris og inkluderer Havnaberg fra 2 år', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    await user.click(screen.getByText('Alle aldre', { selector: '#age-filter-value' }));
    await user.click(screen.getByRole('checkbox', { name: '1–2 år' }));
    expect(screen.queryByRole('heading', { name: 'Fortellerstund på biblioteket' })).toBeNull();
    const biblobarn = screen.getByRole('heading', { name: 'Biblobarn på biblioteket' }).closest('article');
    expect(within(biblobarn).getByText('Alder: 1–2 år')).toBeTruthy();
    expect(within(biblobarn).getByText('Gratis')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Svømmetilbud for større barn på Havnaberg' })).toBeTruthy();
    const unknown = screen.getByRole('region', { name: 'Sjekk alder hos arrangøren' });
    expect(within(unknown).queryByRole('heading', { name: 'Svømmetilbud for større barn på Havnaberg' })).toBeNull();
    await user.click(screen.getByRole('checkbox', { name: '1–2 år' }));
    await user.click(screen.getByRole('checkbox', { name: '3–5 år' }));
    expect(screen.queryByRole('heading', { name: 'Biblobarn på biblioteket' })).toBeNull();
    expect(screen.getByRole('heading', { name: 'Fortellerstund på biblioteket' })).toBeTruthy();
  });

  it('lagrer favoritter mellom besøk og tåler ugyldig lagring', async () => {
    const user = userEvent.setup();
    localStorage.setItem('permliv-favorites', '{"invalid":true}');
    const view = render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    expect(screen.getAllByRole('button', { name: /^Lagre .* som favoritt$/ })).toHaveLength(activities.length);
    await user.click(screen.getByRole('button', { name: 'Lagre Åpen barnehage som favoritt' }));
    expect(screen.getByText('Åpen barnehage er lagret i Mine favoritter.')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Mine favoritter (1)' })).toBeTruthy();
    view.unmount();
    render(<App />);
    await user.click(screen.getByRole('button', { name: 'Alle tilbud' }));
    expect(screen.getByRole('button', { name: 'Fjern Åpen barnehage fra favoritt' }).getAttribute('aria-pressed')).toBe('true');
  });
});
