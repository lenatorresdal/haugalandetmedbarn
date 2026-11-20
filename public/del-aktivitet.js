export function initShareActivity(root = document) {
  const container = root.querySelector('.share-activity');
  if (!container) return;
  const button = container.querySelector('button');
  const fallback = container.querySelector('.share-activity-fallback');
  const input = fallback.querySelector('input');
  const notice = container.querySelector('[role="status"]');
  const url = new URL(container.dataset.sharePath, window.location.origin).href;
  let timer;
  button.hidden = false;
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(url);
      fallback.hidden = true;
      notice.textContent = 'Lenken er kopiert.';
      clearTimeout(timer);
      timer = setTimeout(() => { notice.textContent = ''; }, 3500);
    } catch {
      notice.textContent = '';
      fallback.hidden = false;
      input.value = url;
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
  initShareActivity();
  initOverviewBack();
}
