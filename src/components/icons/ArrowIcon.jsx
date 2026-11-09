const arrowPaths = {
  right: 'M4 12h16m-6-6 6 6-6 6',
  external: 'M6 18 18 6M6 6h12v12',
  down: 'm6 9 6 6 6-6',
};

export default function ArrowIcon({ direction = 'right', className = '' }) {
  return (
    <svg className={`arrow-icon ${className}`} width="16" height="16"
      viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={arrowPaths[direction]} />
    </svg>
  );
}
