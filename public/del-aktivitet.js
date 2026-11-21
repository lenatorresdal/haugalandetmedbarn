export function initActivityFavorite(root = document) {
  const button = root.querySelector('[data-favorite-id]');
  if (!button) return;
  const storageKey = 'permliv-favorites';
  const id = button.dataset.favoriteId;
  let favorites = new Set();

  function syncFavorites() {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
      favorites = new Set(Array.isArray(stored) ? stored.filter(value => typeof value === 'string') : []);
    } catch {
      // Keep the in-memory selection if storage is unavailable.
    }
    button.setAttribute('aria-pressed', String(favorites.has(id)));
  }

  syncFavorites();
  button.hidden = false;
  button.addEventListener('click', () => {
    syncFavorites();
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    try {
      localStorage.setItem(storageKey, JSON.stringify([...favorites]));
    } catch {
      // The button still works for this visit.
    }
    button.setAttribute('aria-pressed', String(favorites.has(id)));
  });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) syncFavorites();
  });
  window.addEventListener('pageshow', syncFavorites);
}

export function initShareActivity(root = document) {
  const container = root.querySelector('.share-activity');
  if (!container) return;
  const button = container.querySelector('[aria-controls]');
  const panel = container.querySelector('.share-activity-panel');
  const input = panel.querySelector('input');
  const copy = panel.querySelector('button');
  const check = panel.querySelector('.share-activity-check');
  const notice = panel.querySelector('[role="status"]');
  const url = new URL(container.dataset.sharePath, window.location.origin).href;
  input.value = url;
  button.hidden = false;
  function setPanelOpen(open) {
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    check.hidden = true;
    notice.textContent = '';
  }
  button.addEventListener('click', () => setPanelOpen(panel.hidden));
  container.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || panel.hidden) return;
    event.preventDefault();
    setPanelOpen(false);
    button.focus();
  });
  copy.addEventListener('click', async () => {
    check.hidden = true;
    notice.textContent = '';
    try {
      await navigator.clipboard.writeText(url);
      if (panel.hidden) return;
      check.hidden = false;
      notice.textContent = 'Lenken er kopiert.';
    } catch {
      if (panel.hidden) return;
      notice.textContent = 'Kopier den markerte lenken manuelt.';
      input.focus();
      input.select();
    }
  });
}

export function initOverviewBack(root = document, referrer = document.referrer) {
  const link = root.querySelector('.activity-back');
  if (!link || !referrer) return;
  try {
    const previous = new URL(referrer);
    if (previous.origin !== window.location.origin || previous.pathname !== '/') return;
    const destination = new URL('/', window.location.origin);
    for (const key of ['tilbud', 'kategori', 'sted', 'favoritter', 'alder']) {
      for (const value of previous.searchParams.getAll(key)) destination.searchParams.append(key, value);
    }
    destination.hash = 'aktiviteter';
    link.href = destination.href;
  } catch {
    // Keep the ordinary overview link when the previous address is unavailable.
  }
}

if (typeof document !== 'undefined') {
  initActivityFavorite();
  initShareActivity();
  initOverviewBack();
}
