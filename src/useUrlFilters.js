import { useEffect, useRef, useState } from 'react';
import { activities, categories } from './activities.js';
import { ageGroups } from './ageFilters.js';
import { activityViews } from './participation.js';

const defaultFilters = {
  view: 'experiences', category: 'Alle aktiviteter', municipality: 'Alle steder',
  onlySaved: false, selectedAges: [],
};
const municipalities = new Set(activities.map(activity => activity.municipality));

function readFilters() {
  const params = new URLSearchParams(window.location.search);
  return {
    view: activityViews.some(view => view.value === params.get('tilbud')) ? params.get('tilbud') : defaultFilters.view,
    category: categories.includes(params.get('kategori')) ? params.get('kategori') : defaultFilters.category,
    municipality: municipalities.has(params.get('sted')) ? params.get('sted') : defaultFilters.municipality,
    onlySaved: params.get('favoritter') === '1',
    selectedAges: ageGroups.filter(group => group.value !== 'all' && params.getAll('alder').includes(group.value)).map(group => group.value),
  };
}

function filterUrl(filters) {
  const url = new URL(window.location.href);
  for (const key of ['tilbud', 'kategori', 'sted', 'favoritter', 'alder']) url.searchParams.delete(key);
  if (filters.view !== defaultFilters.view) url.searchParams.set('tilbud', filters.view);
  if (filters.category !== defaultFilters.category) url.searchParams.set('kategori', filters.category);
  if (filters.municipality !== defaultFilters.municipality) url.searchParams.set('sted', filters.municipality);
  if (filters.onlySaved) url.searchParams.set('favoritter', '1');
  for (const group of ageGroups) {
    if (group.value !== 'all' && filters.selectedAges.includes(group.value)) url.searchParams.append('alder', group.value);
  }
  return url.pathname + url.search + url.hash;
}

export default function useUrlFilters() {
  const [filters, setFilters] = useState(readFilters);
  const previous = useRef(filters);

  useEffect(() => {
    const target = filterUrl(filters);
    const current = window.location.pathname + window.location.search + window.location.hash;
    if (target !== current) {
      if (previous.current === filters) window.history.replaceState(window.history.state, '', target);
      else window.history.pushState(window.history.state, '', target);
    }
    previous.current = filters;
  }, [filters]);

  useEffect(() => {
    function restore() {
      const restored = readFilters();
      previous.current = restored;
      setFilters(restored);
    }
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, []);

  function setFilter(key, value) {
    setFilters(previousFilters => ({
      ...previousFilters,
      [key]: typeof value === 'function' ? value(previousFilters[key]) : value,
    }));
  }
  return [filters, setFilter];
}
