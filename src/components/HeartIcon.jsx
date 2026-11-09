export default function HeartIcon({ filled = false }) {
  return (
    <svg className="heart-icon" width="20" height="22" viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true" focusable="false">
      <path d="M12 21C10 18 4 13.5 4 8a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-6 10-8 13Z" />
    </svg>
  );
}
