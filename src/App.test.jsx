import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

beforeEach(() => {
  localStorage.clear();
  Element.prototype.scrollIntoView = vi.fn();
});
afterEach(cleanup);

describe('aktivitetsoversikten', () => {
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
    await user.click(screen.getByRole('button', { name: /Mine favoritter/ }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'En liten tur i Djupadalen' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: /Fjern En liten tur/ }));
    expect(JSON.parse(localStorage.getItem('permliv-favorites'))).toEqual([]);
    await user.click(screen.getByRole('button', { name: /Mine favoritter/ }));
    await user.click(screen.getByRole('button', { name: 'Lagre Åpen barnehage som favoritt' }));
    view.unmount();
    render(<App />);
    expect(screen.getByRole('button', { name: 'Fjern Åpen barnehage fra favoritt' }).getAttribute('aria-pressed')).toBe('true');
  });

  it('tåler ugyldige favoritter i nettleserlagringen', () => {
    localStorage.setItem('permliv-favorites', '{"invalid":true}');
    render(<App />);
    expect(screen.getAllByRole('article')).toHaveLength(5);
    expect(screen.getByRole('button', { name: /Mine favoritter 0/ })).toBeTruthy();
  });
});
