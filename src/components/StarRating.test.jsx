import { useState } from 'react';
import { afterEach, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StarRating from './StarRating.jsx';

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

it('lar brukeren velge stjerner med tastaturet før vurderingen lagres', async () => {
  // jsdom lacks CSS.escape, which user-event uses to find a radio group.
  vi.stubGlobal('CSS', { escape: value => value.replace(/[^\w-]/g, char => `\\${char}`) });
  const user = userEvent.setup();
  const onVote = vi.fn().mockResolvedValue(true);
  render(<StarRating title="Familietur" stats={{ average_rating: '4.25', vote_count: 4 }}
    statsStatus="ready" ownStatus="ready" ownRating={2} onVote={onVote} />);

  expect(screen.getByText(/4,3 av 5 · 4 stemmer/)).toBeTruthy();
  await user.tab();
  expect(document.activeElement).toBe(screen.getByRole('radio', { name: '2 stjerner' }));
  await user.keyboard('{ArrowRight}');
  expect(screen.getByRole('radio', { name: '3 stjerner' }).checked).toBe(true);
  expect(onVote).not.toHaveBeenCalled();

  await user.tab();
  expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Fjern vurdering' }));
  await user.tab();
  await user.keyboard('{Enter}');
  expect(onVote).toHaveBeenCalledExactlyOnceWith(3);
});

it('viser fjernknappen for en lagret stemme og nullstiller valget etter sletting', async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();
  const onVote = vi.fn();

  function Rating() {
    const [ownRating, setOwnRating] = useState(4);
    const stats = ownRating ? { average_rating: 4, vote_count: 1 } : null;
    return <StarRating title="Familietur" statsStatus="ready" ownStatus="ready"
      ownRating={ownRating} stats={stats} onVote={onVote} onRemove={async () => {
        onRemove();
        setOwnRating(null);
        return true;
      }} />;
  }

  render(<Rating />);
  await user.click(screen.getByRole('radio', { name: '4 stjerner' }));
  expect(onRemove).not.toHaveBeenCalled();
  await user.click(screen.getByRole('radio', { name: '5 stjerner' }));
  await user.click(screen.getByRole('button', { name: 'Fjern vurdering' }));
  expect(onRemove).toHaveBeenCalledTimes(1);
  expect(onVote).not.toHaveBeenCalled();
  expect(screen.queryByRole('button', { name: 'Fjern vurdering' })).toBeNull();
  expect(screen.queryByRole('radio', { checked: true })).toBeNull();
  expect(screen.getByText('Ingen vurderinger ennå')).toBeTruthy();
});
