import ActivityArt from './ActivityArt.jsx';

export default function ActivityCard({ activity, saved, onToggleFavorite }) {
  return (
    <article className="card">
      <div className="picture">
        <ActivityArt scene={activity.scene} background={activity.bg} />
        <span className="badge">{activity.badge}</span>
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
        <div className="meta">⌖ {activity.place}<br />◷ {activity.time}</div>
        <div className="card-bottom">
          <span className="kind">{activity.kind}</span>
          <a href={activity.url} target="_blank" rel="noopener">{activity.link} ↗</a>
        </div>
      </div>
    </article>
  );
}
