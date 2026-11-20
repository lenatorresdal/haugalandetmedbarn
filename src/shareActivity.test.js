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
  document.body.innerHTML = `<div class="share-activity" data-share-path="/aktiviteter/test/"><button hidden>Del aktivitet</button><div class="share-activity-fallback" hidden><label>Kopier lenken<input readonly></label></div><div role="status"></div></div>`;
  initShareActivity();
  return document.querySelector('.share-activity');
}

it('kopierer lenke til aktivitetssiden og bekrefter det', async () => {
  const copy = vi.fn().mockResolvedValue(undefined);
  const container = setup(copy);
  expect(container.querySelector('button').hidden).toBe(false);
  fireEvent.click(container.querySelector('button'));
  await waitFor(() => expect(copy).toHaveBeenCalledWith(`${window.location.origin}/aktiviteter/test/`));
  expect(container.querySelector('[role="status"]').textContent).toBe('Lenken er kopiert.');
});

it('viser og markerer lenken når den ikke kan kopieres automatisk', async () => {
  const container = setup(vi.fn().mockRejectedValue(new Error('Ingen tilgang')));
  fireEvent.click(container.querySelector('button'));
  const input = container.querySelector('input');
  await waitFor(() => expect(container.querySelector('.share-activity-fallback').hidden).toBe(false));
  expect(input.value).toBe(`${window.location.origin}/aktiviteter/test/`);
  expect(document.activeElement).toBe(input);
  expect(input.selectionStart).toBe(0);
  expect(input.selectionEnd).toBe(input.value.length);
  expect(container.querySelector('[role="status"]').textContent).toBe('');
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
