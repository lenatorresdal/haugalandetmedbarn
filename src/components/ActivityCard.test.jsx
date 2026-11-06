import { afterEach, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ActivityCard from './ActivityCard.jsx';

afterEach(cleanup);

it('viser nøkkelinformasjon og åpner detaljer uavhengig for hvert kort', async () => {
  const user = userEvent.setup();
  const activity = {
    id: 'first', title: 'Familietur', category: 'Ut på tur', municipality: 'Karmøy',
    participation: 'open', age: 'Alle aldre', price: 'Gratis',
    description: 'En fin tur. Ta med matpakke.', place: 'Tursted · Adresse 1', time: 'Søndager kl. 12',
    stroller: 'Grusvei hele veien.', url: 'https://example.com', link: 'Les mer',
  };
  render(<>
    <ActivityCard activity={activity} saved={false} onToggleFavorite={() => {}} />
    <ActivityCard activity={{ ...activity, id: 'second', title: 'En annen tur' }} saved={false} onToggleFavorite={() => {}} />
  </>);
  const cards = screen.getAllByRole('article');
  expect(within(cards[0]).getByText('Alder: Alle aldre')).toBeTruthy();
  expect(within(cards[0]).getByText('Gratis')).toBeTruthy();
  expect(cards.every(card => !card.querySelector('details').open)).toBe(true);
  expect(cards[0].querySelector('.activity-location').textContent).toContain('Tursted · Adresse 1');
  expect(within(cards[0]).getByRole('link', { name: /Les mer/ }).closest('details')).toBe(cards[0].querySelector('details'));
  expect(within(cards[0]).getByText('Grusvei hele veien.').closest('details')).toBe(cards[0].querySelector('details'));
  expect(within(cards[0]).getByText('Gratis').closest('details')).toBe(cards[0].querySelector('details'));
  expect(cards[0].querySelector('.activity-location').textContent).toContain('Søndager kl. 12');
  expect(cards[0].querySelector('.activity-location').closest('details')).toBeNull();
  await user.click(within(cards[0]).getByText('Vis detaljer'));
  expect(within(cards[0]).getByRole('link', { name: /Les mer/ })).toBeTruthy();
  expect(within(cards[0]).getByText('Grusvei hele veien.')).toBeTruthy();
  await user.click(within(cards[1]).getByText('Vis detaljer'));
  expect(cards.every(card => card.querySelector('details').open)).toBe(true);
  await user.click(within(cards[0]).getByText('Skjul detaljer'));
  expect(cards[0].querySelector('details').open).toBe(false);
  expect(cards[1].querySelector('details').open).toBe(true);
});
