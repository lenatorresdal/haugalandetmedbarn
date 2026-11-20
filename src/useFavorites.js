import { useEffect, useState } from 'react';

const storageKey = 'permliv-favorites';

function parseFavorites(value) {
  try {
    const stored = JSON.parse(value || '[]');
    return new Set(Array.isArray(stored) ? stored.filter(id => typeof id === 'string') : []);
  } catch {
    return new Set();
  }
}

function readFavorites() {
  try {
    return parseFavorites(localStorage.getItem(storageKey));
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

  useEffect(() => {
    function onStorage(event) {
      try {
        if (event.storageArea === localStorage && (event.key === storageKey || event.key === null)) {
          setFavorites(parseFavorites(event.key === null ? null : event.newValue));
        }
      } catch {
        // Storage may be unavailable in privacy-restricted browsers.
      }
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

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
