import { useEffect, useRef, useState } from 'react';
import { ratingsConfigured, readOwnRating, readRatingStats, removeActivityRating, saveActivityRating } from './activityRatings.js';

export default function useActivityRating(activityId) {
  const [stats, setStats] = useState(null);
  const [statsStatus, setStatsStatus] = useState(ratingsConfigured ? 'loading' : 'unavailable');
  const [ownRating, setOwnRating] = useState(null);
  const [ownStatus, setOwnStatus] = useState(ratingsConfigured ? 'loading' : 'ready');
  const [feedback, setFeedback] = useState(null);
  const pending = useRef(false);

  useEffect(() => {
    if (!ratingsConfigured) return;
    let active = true;

    readRatingStats(activityId).then(row => {
      if (!active) return;
      setStats(row);
      setStatsStatus('ready');
    }, () => {
      if (active) setStatsStatus('error');
    });

    readOwnRating(activityId).then(rating => {
      if (!active) return;
      setOwnRating(rating);
      setOwnStatus('ready');
    }, () => {
      if (active) setOwnStatus('error');
    });

    return () => { active = false; };
  }, [activityId]);

  async function changeRating(rating) {
    const removing = rating === null;
    if (pending.current) return false;
    pending.current = true;
    const successMessage = removing ? 'Vurderingen er fjernet.' : 'Vurderingen er lagret.';
    setFeedback({ saving: true, message: removing ? 'Fjerner vurderingen …' : 'Lagrer vurderingen …' });
    try {
      if (removing) await removeActivityRating(activityId);
      else await saveActivityRating(activityId, rating);
      setOwnRating(rating);
      setOwnStatus('ready');
      try {
        setStats(await readRatingStats(activityId));
        setStatsStatus('ready');
        setFeedback({ message: successMessage });
      } catch {
        setStatsStatus('error');
        setFeedback({ message: `${successMessage} Kunne ikke oppdatere gjennomsnittet.`, error: true });
      }
      return true;
    } catch (error) {
      let message = removing ? 'Kunne ikke fjerne vurderingen. Prøv igjen.' : 'Kunne ikke lagre vurderingen. Prøv igjen.';
      const code = error?.code;
      if (code === 'anonymous_provider_disabled') {
        message = 'Det er ikke mulig å stemme akkurat nå. Anonym innlogging er deaktivert.';
      } else if (removing && code === 'PGRST116') {
        message = 'Ingen stemme kunne slettes. Last inn siden på nytt. Hvis stemmen fortsatt vises, oppgi feilkode PGRST116.';
      } else if (removing && code === '42501') {
        message = 'Supabase avviste slettingen på grunn av manglende tilgang (42501).';
      } else if (removing && typeof code === 'string' && /^[A-Z0-9_]{1,40}$/i.test(code)) {
        message = `Kunne ikke fjerne vurderingen (feilkode ${code}).`;
      }
      setFeedback({ message, error: true });
      return false;
    } finally {
      pending.current = false;
    }
  }

  return { stats, statsStatus, ownRating, ownStatus, feedback, onVote: changeRating, onRemove: () => changeRating(null) };
}
