import { createRoot } from 'react-dom/client';
import StarRating from './components/StarRating.jsx';
import useActivityRating from './useActivityRating.js';

function ActivityRating({ activityId, title }) {
  const rating = useActivityRating(activityId);
  return <StarRating title={title} {...rating} />;
}

const mount = document.querySelector('[data-activity-rating]');
if (mount) {
  createRoot(mount).render(
    <ActivityRating activityId={mount.dataset.activityRating} title={mount.dataset.activityTitle} />,
  );
}
