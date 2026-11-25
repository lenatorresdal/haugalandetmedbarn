import { useId, useRef, useState } from 'react';

const stars = [1, 2, 3, 4, 5];
const formatRating = new Intl.NumberFormat('nb-NO', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
const formatCount = new Intl.NumberFormat('nb-NO');

export default function StarRating({
  title, stats, statsStatus, ownRating, ownStatus, feedback, onVote, onRemove,
}) {
  const name = useId();
  const [draft, setDraft] = useState(null);
  const saveButton = useRef(null);
  const selected = draft ?? ownRating;
  const loading = statsStatus === 'loading' || ownStatus === 'loading';
  const saving = Boolean(feedback?.saving);
  const count = Number(stats?.vote_count ?? 0);

  async function submit(event) {
    event.preventDefault();
    if (draft === null || draft === ownRating || loading || saving) return;
    if (await onVote(draft)) setDraft(null);
  }

  async function remove(event) {
    if (loading || saving) return;
    const button = event.currentTarget;
    const hadFocus = document.activeElement === button;
    if (await onRemove()) {
      setDraft(null);
      if (hadFocus && (document.activeElement === button || document.activeElement === document.body)) {
        saveButton.current?.focus();
      }
    }
  }

  if (statsStatus === 'unavailable') {
    return <p className="activity-rating-unavailable">Vurderinger er ikke tilgjengelige.</p>;
  }

  const summary = statsStatus === 'loading' ? 'Henter vurderinger …'
    : statsStatus === 'error' ? 'Kunne ikke hente vurderinger.'
    : count > 0
      ? `${formatRating.format(stats.average_rating)} av 5 · ${formatCount.format(count)} ${count === 1 ? 'stemme' : 'stemmer'}`
      : 'Ingen vurderinger ennå';

  return (
    <div className="activity-rating">
      <p className="activity-rating-summary">
        <span aria-hidden="true">★</span>
        {summary}
      </p>
      <form onSubmit={submit}>
        <fieldset className="activity-rating-fieldset" disabled={loading || saving}>
          <legend>Din vurdering<span className="sr-only">{` for ${title}`}</span></legend>
          <div className="activity-rating-stars">
            {stars.map(star => (
              <label className="activity-rating-star" key={star}>
                <input className="sr-only" type="radio" name={name} value={star}
                  checked={selected === star}
                  onChange={() => setDraft(star)} />
                <span aria-hidden="true">{star <= selected ? '★' : '☆'}</span>
                <span className="sr-only">{star === 1 ? '1 stjerne' : `${star} stjerner`}</span>
              </label>
            ))}
          </div>
        </fieldset>
        {ownRating != null && (
          <button className="activity-rating-remove" type="button" aria-disabled={loading || saving} onClick={remove}>
            Fjern vurdering
          </button>
        )}
        <button ref={saveButton} className="share-activity-button activity-rating-submit" type="submit"
          aria-disabled={draft === null || draft === ownRating || loading || saving}>
          Lagre vurdering
        </button>
        {ownStatus === 'error' && <p className="activity-rating-error">Kunne ikke hente din tidligere vurdering.</p>}
        <p className={feedback?.error ? 'activity-rating-error' : undefined} role="status">
          {feedback?.message}
        </p>
      </form>
    </div>
  );
}
