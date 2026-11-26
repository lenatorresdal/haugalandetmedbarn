import { useEffect, useRef } from 'react';
import ActivityArt from './illustrations/ActivityArt.jsx';
import HeartIcon from './icons/HeartIcon.jsx';

export default function ActivityCard({ activity, saved, onToggleFavorite, initiallyOpen = false }) {
  const cardRef = useRef(null);
  useEffect(() => {
    if (!initiallyOpen || !cardRef.current) return;
    cardRef.current.scrollIntoView?.({ block: 'start' });
    cardRef.current.focus({ preventScroll: true });
  }, [initiallyOpen, activity.id]);

  const locations = activity.locations ?? [{ place: activity.place, time: activity.time }];

  return (
    <article className="card" ref={cardRef} tabIndex={initiallyOpen ? -1 : undefined}>
      <div className="picture">
        <ActivityArt scene={activity.scene} background={activity.bg} />
        <span className="place-badge">{activity.municipality}</span>
        <button
          className="heart"
          onClick={() => onToggleFavorite(activity.id)}
          aria-label={`Favoritt: ${activity.title}`}
          aria-pressed={saved}
          title={saved ? 'Fjern fra favoritter' : 'Lagre som favoritt'}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>
      <div className="body">
        <div className="card-overview">
          <div className="card-overview-content">
            <div className="category">{activity.category}</div>
            <h3><a className="card-link" href={`/aktiviteter/${activity.id}/`}>{activity.title}</a></h3>
            {activity.age && <div className="activity-age">Alder: {activity.age}</div>}
            <div className="meta">
              {locations.map((location) => (
                <div className="activity-location" key={location.place}>
                  <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0Z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>{' '}{location.place}
                  {location.time && <>
                    <br />
                    <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="8" />
                      <path d="M12 7v5l3 2" />
                    </svg>{' '}{location.time}
                  </>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
