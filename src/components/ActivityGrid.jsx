import { useLayoutEffect, useRef } from 'react';

export default function ActivityGrid({ children, ...props }) {
  const grid = useRef(null);

  useLayoutEffect(() => {
    const element = grid.current;
    const overviews = [...element.querySelectorAll('.card-overview-content')];
    function alignCards() {
      const columns = getComputedStyle(element).gridTemplateColumns.split(' ').length;
      for (let start = 0; start < overviews.length; start += columns) {
        const row = overviews.slice(start, start + columns);
        const height = Math.max(...row.map(item => item.getBoundingClientRect().height));
        row.forEach(item => item.parentElement.style.minHeight = `${height}px`);
      }
    }
    alignCards();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(alignCards);
    overviews.forEach(item => observer.observe(item));
    observer.observe(element);
    return () => observer.disconnect();
  }, [children]);

  return <div {...props} className="grid" ref={grid}>{children}</div>;
}
