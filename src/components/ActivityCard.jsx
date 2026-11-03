import ActivityArt from './ActivityArt.jsx';

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
        <p className="description">{activity.description}</p>
        <div className="meta">
          {activity.age && <div className="activity-age">
            <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="7" r="3" />
              <path d="M9 5.5c0-2 3-3 4-1M5 20v-2a7 7 0 0 1 14 0v2M9 16v4m6-4v4" />
            </svg>{' '}
            Alder: {activity.age}
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
