import ActivityArt from './ActivityArt.jsx';
import { participationTypes } from '../participation.js';

export default function ActivityCard({ activity, saved, onToggleFavorite }) {
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
        <p className="description">{activity.description}</p>
        {activity.changingTable !== undefined && (
          <div className="cafe-facilities meta">
            <div>Stellebord: {activity.changingTable === null ? 'Ikke bekreftet' : activity.changingTable ? 'Ja' : 'Nei'}</div>
          </div>
        )}
        {activity.stroller && (
          <p className="stroller-info"><strong>Med barnevogn:</strong> {activity.stroller}</p>
        )}
        <div className="meta">
          {activity.distance && <div className="activity-distance">
            <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="5" cy="17" r="2.5" />
              <circle cx="19" cy="7" r="2.5" />
              <path d="M7.5 17h6a3 3 0 0 0 0-6h-3a2 2 0 0 1 0-4h6" strokeDasharray="2 3" />
            </svg>{' '}{activity.distance}
          </div>}
          {(activity.locations ?? [{ place: activity.place, time: activity.time }]).map((location) => (
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
        {activity.price && <p className="activity-price"><strong>Pris:</strong> {activity.price}</p>}
        {activity.email && (
          <p className="activity-contact">
            Spørsmål og påmelding: <a href={`mailto:${activity.email}`}>{activity.email}</a>
          </p>
        )}
        <div className="card-bottom">
          <a href={activity.url} target="_blank" rel="noopener">{activity.link} ↗</a>
        </div>
      </div>
    </article>
  );
}
