import { useEffect, useState } from 'react';

const storageKey = 'permliv-favorites';

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return new Set(Array.isArray(stored) ? stored.filter(id => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}

export default function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify([...favorites]));
    } catch {
      // Favorites still work for this visit if browser storage is unavailable.
    }
  }, [favorites]);

  function toggleFavorite(id) {
    setFavorites(previous => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return [favorites, toggleFavorite];
}
