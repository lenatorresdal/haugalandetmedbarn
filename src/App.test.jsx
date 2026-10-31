import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

beforeEach(() => {
  localStorage.clear();
});
afterEach(cleanup);

describe('aktivitetsoversikten', () => {
  it('velger enten favoritter eller kategori og oppdaterer ved søk og fjerning', async () => {
    const user = userEvent.setup();
    localStorage.setItem('permliv-favorites', '["tur", "apen"]');
    render(<App />);
    const filter = screen.getByRole('button', { name: 'Mine favoritter' });
    await user.click(filter);
    expect(filter.getAttribute('aria-pressed')).toBe('true');
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.click(screen.getByRole('button', { name: 'Ut på tur' }));
    expect(filter.getAttribute('aria-pressed')).toBe('false');
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.click(filter);
    expect(screen.getByRole('button', { name: 'Ut på tur' }).getAttribute('aria-pressed')).toBe('false');
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.type(screen.getByRole('searchbox'), 'Djupadalen');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: /Fjern En liten tur/ }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    await user.clear(screen.getByRole('searchbox'));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(filter);
    expect(filter.getAttribute('aria-pressed')).toBe('true');
    await user.click(screen.getByRole('button', { name: 'Alle aktiviteter' }));
    expect(filter.getAttribute('aria-pressed')).toBe('false');
    expect(screen.getAllByRole('article')).toHaveLength(5);
  });

  it('kombinerer søk og kategorier og viser en melding ved tomme treff', async () => {
    const user = userEvent.setup();
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    await user.click(screen.getByRole('button', { name: 'Ut på tur' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.type(screen.getByRole('searchbox'), 'DJUPADALEN');
    expect(screen.getAllByRole('article')).toHaveLength(1);
    await user.click(screen.getByRole('button', { name: 'Sang & musikk' }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByText(/Ingen treff akkurat nå/)).toBeTruthy();
  });

  it('beholder eksisterende favoritter og lagrer endringer mellom besøk', async () => {
    const user = userEvent.setup();
    localStorage.setItem('permliv-favorites', '["tur"]');
    const view = render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('heading', { name: 'En liten tur i Djupadalen' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Fjern En liten tur/ }));
    expect(JSON.parse(localStorage.getItem('permliv-favorites'))).toEqual([]);
    await user.click(screen.getByRole('button', { name: 'Lagre Åpen barnehage som favoritt' }));
    view.unmount();
    render(<App />);
    expect(screen.getByRole('button', { name: 'Fjern Åpen barnehage fra favoritt' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('tåler ugyldige favoritter i nettleserlagringen', () => {
    localStorage.setItem('permliv-favorites', '{"invalid":true}');
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getAllByRole('button', { name: /^Lagre .* som favoritt$/ })).toHaveLength(5);
  });
});
