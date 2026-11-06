import ActivityArt from './ActivityArt.jsx';
import { participationTypes } from '../participation.js';

export default function ActivityCard({ activity, saved, onToggleFavorite }) {
  const locations = activity.locations ?? [{ place: activity.place, time: activity.time }];

  return (
    <article className="card">
      <div className="picture">
        <ActivityArt scene={activity.scene} background={activity.bg} />
        <span className="place-badge">{activity.municipality}</span>
        <button
          className="heart"
          onClick={() => onToggleFavorite(activity.id)}
          aria-label={`${saved ? 'Fjern' : 'Lagre'} ${activity.title} ${saved ? 'fra' : 'som'} favoritt`}
          aria-pressed={saved}
        >
          {saved ? '♥' : '♡'}
        </button>
      </div>
      <div className="body">
        <div className="category">{activity.category}</div>
        <h3>{activity.title}</h3>
        <div className={`participation participation-${activity.participation}`}>
          {participationTypes[activity.participation].label}
        </div>
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
        <details className="card-details">
          <summary>
            <span className="details-show">Vis detaljer</span>
            <span className="details-hide">Skjul detaljer</span>
            <span className="sr-only"> om {activity.title}</span>
            <span className="details-chevron" aria-hidden="true">⌄</span>
          </summary>
          <div className="card-details-content">
        {activity.distance && <div className="meta">{activity.distance}</div>}
        {activity.changingTable !== undefined && (
          <div className="cafe-facilities meta">
            <div>Stellebord: {activity.changingTable === null ? 'Ikke bekreftet' : activity.changingTable ? 'Ja' : 'Nei'}</div>
          </div>
        )}
        {activity.email && (
          <p className="activity-contact">
            Spørsmål og påmelding: <a href={`mailto:${activity.email}`}>{activity.email}</a>
          </p>
        )}
            <p className="description">{activity.description}</p>
        {activity.price && <p className="activity-price"><strong>Pris:</strong> {activity.price}</p>}
        {activity.stroller && (
          <p className="stroller-info"><strong>Med barnevogn:</strong> {activity.stroller}</p>
        )}
        <div className="card-bottom">
          <a href={activity.url} target="_blank" rel="noopener">{activity.link} ↗</a>
        </div>
          </div>
        </details>
      </div>
    </article>
  );
}
