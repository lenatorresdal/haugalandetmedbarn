import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActivityCard from './ActivityCard.jsx';
import { activities } from '../activities.js';

afterEach(cleanup);

it('viser nøkkelinformasjon og lenker direkte til aktivitetens side', () => {
  const activity = {
    id: 'first', title: 'Familietur', category: 'Ut på tur', municipality: 'Karmøy',
    participation: 'open', age: 'Alle aldre', price: 'Gratis',
    description: 'En fin tur.', place: 'Tursted · Adresse 1', time: 'Søndager kl. 12',
    url: 'https://example.com', link: 'Les mer',
  };
  render(<ActivityCard activity={activity} saved={false} onToggleFavorite={() => {}} />);
  const card = screen.getByRole('article');
  expect(within(card).getByText('Alder: Alle aldre')).toBeTruthy();
  expect(card.querySelector('.participation')).toBeNull();
  expect(within(card).queryByText('Gratis')).toBeNull();
  expect(within(card).getByText(/Tursted · Adresse 1/)).toBeTruthy();
  expect(within(card).getByRole('link', { name: 'Familietur' }).getAttribute('href')).toBe('/aktiviteter/first/');
  expect(card.querySelector('details')).toBeNull();
});

it.each(['padling-eivindsvatnet', 'bowling-lucky-bowl'])('viser kortet for %s uten bestillingsfelt', (id) => {
  const activity = activities.find(item => item.id === id);
  render(<ActivityCard activity={activity} saved={false} onToggleFavorite={() => {}} />);
  expect(screen.getByRole('article').querySelector('.participation')).toBeNull();
});


it('favorittknappen fungerer separat fra aktivitetslenken', async () => {
  const user = userEvent.setup();
  const toggle = vi.fn();
  const activity = { id: 'test', title: 'En aktivitet', municipality: 'Haugesund', category: 'Ut på tur', participation: 'open', place: 'Haugesund' };
  render(<ActivityCard activity={activity} saved={false} onToggleFavorite={toggle} />);
  await user.click(screen.getByRole('button', { name: 'Favoritt: En aktivitet' }));
  expect(toggle).toHaveBeenCalledWith('test');
  expect(screen.getByRole('link', { name: 'En aktivitet' }).getAttribute('href')).toBe('/aktiviteter/test/');
});
