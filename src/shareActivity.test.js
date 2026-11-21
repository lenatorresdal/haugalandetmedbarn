import { afterEach, expect, it, vi } from 'vitest';
import { fireEvent, waitFor } from '@testing-library/react';
import { initOverviewBack, initShareActivity } from '../public/del-aktivitet.js';

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard');
afterEach(() => {
  document.body.innerHTML = '';
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard);
  else delete navigator.clipboard;
  vi.restoreAllMocks();
});

function setup(writeText) {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  document.body.innerHTML = `<div class="share-activity" data-share-path="/aktiviteter/test/">
    <button aria-expanded="false" aria-controls="activity-share-panel" hidden>Del aktivitet</button>
    <div class="share-activity-panel" id="activity-share-panel" hidden>
      <label>Lenke til aktiviteten<input readonly></label>
      <button>Kopier lenke</button>
      <span class="share-activity-check" aria-hidden="true" hidden>✓</span>
      <div role="status"></div>
    </div>
  </div>`;
  initShareActivity();
  const panel = document.querySelector('.share-activity-panel');
  return {
    panel,
    toggle: document.querySelector('[aria-controls="activity-share-panel"]'),
    copy: panel.querySelector('button'),
    check: panel.querySelector('.share-activity-check'),
    input: panel.querySelector('input'),
    notice: panel.querySelector('[role="status"]'),
  };
}

it('viser lenken før den kopieres og lar boksen lukkes igjen', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  const { panel, toggle, copy, check, input, notice } = setup(writeText);
  expect(toggle.hidden).toBe(false);
  expect(panel.hidden).toBe(true);
  fireEvent.click(toggle);
  expect(panel.hidden).toBe(false);
  expect(toggle.getAttribute('aria-expanded')).toBe('true');
  expect(input.value).toBe(`${window.location.origin}/aktiviteter/test/`);
  expect(writeText).not.toHaveBeenCalled();
  expect(check.hidden).toBe(true);

  fireEvent.click(copy);
  expect(writeText).toHaveBeenCalledWith(input.value);
  await waitFor(() => expect(notice.textContent).toBe('Lenken er kopiert.'));
  expect(check.hidden).toBe(false);
  expect(panel.hidden).toBe(false);

  fireEvent.click(toggle);
  expect(panel.hidden).toBe(true);
  expect(toggle.getAttribute('aria-expanded')).toBe('false');
  expect(check.hidden).toBe(true);

  fireEvent.click(toggle);
  input.focus();
  fireEvent.keyDown(input, { key: 'Escape' });
  expect(panel.hidden).toBe(true);
  expect(document.activeElement).toBe(toggle);
});

it('markerer lenken for manuell kopiering når nettleseren avviser kopiering', async () => {
  const { panel, toggle, copy, input, notice } = setup(vi.fn().mockRejectedValue(new Error('Ingen tilgang')));
  fireEvent.click(toggle);
  fireEvent.click(copy);
  await waitFor(() => expect(document.activeElement).toBe(input));
  expect(panel.hidden).toBe(false);
  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(input.value.length);
  expect(notice.textContent).toBe('Kopier den markerte lenken manuelt.');
});

it('tar med oversiktsfiltre tilbake når brukeren kom fra forsiden', () => {
  document.body.innerHTML = '<a class="activity-back" href="/?tilbud=all#aktiviteter">Tilbake</a>';
  initOverviewBack(document, `${window.location.origin}/?sted=Karm%C3%B8y&alder=baby&alder=preschool&aktivitet=old&kontakt=1`);
  const url = new URL(document.querySelector('.activity-back').href);
  expect(url.searchParams.get('sted')).toBe('Karmøy');
  expect(url.searchParams.getAll('alder')).toEqual(['baby', 'preschool']);
  expect(url.searchParams.has('aktivitet')).toBe(false);
  expect(url.searchParams.has('kontakt')).toBe(false);
  expect(url.hash).toBe('#aktiviteter');
});

it('beholder standardlenken når brukeren kommer fra et annet nettsted', () => {
  document.body.innerHTML = '<a class="activity-back" href="/?tilbud=all#aktiviteter">Tilbake</a>';
  initOverviewBack(document, 'https://example.org/?sted=Karmoy');
  expect(document.querySelector('.activity-back').getAttribute('href')).toBe('/?tilbud=all#aktiviteter');
});
