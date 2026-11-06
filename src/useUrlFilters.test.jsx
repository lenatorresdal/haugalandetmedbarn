import { afterEach, beforeEach, expect, it } from 'vitest';
import { act, cleanup, renderHook, waitFor } from '@testing-library/react';
import useUrlFilters from './useUrlFilters.js';

beforeEach(() => window.history.replaceState(null, '', '/'));
afterEach(() => { cleanup(); window.history.replaceState(null, '', '/'); });

it('leser delte filtre og rydder ugyldige verdier uten å miste andre parametere eller anker', () => {
  window.history.replaceState(null, '', '/?tilbud=courses&sted=Karm%C3%B8y&alder=baby&alder=baby&alder=invalid&kategori=invalid&favoritter=1&ref=share#aktiviteter');
  const { result } = renderHook(useUrlFilters);
  expect(result.current[0]).toEqual({ view: 'courses', municipality: 'Karmøy', selectedAges: ['baby'], category: 'Alle aktiviteter', onlySaved: true });
  const params = new URLSearchParams(window.location.search);
  expect(params.getAll('alder')).toEqual(['baby']);
  expect(params.has('kategori')).toBe(false);
  expect(params.get('ref')).toBe('share');
  expect(window.location.hash).toBe('#aktiviteter');
});

it('beholder valg ved ny innlasting og støtter tilbake og frem', async () => {
  const hook = renderHook(useUrlFilters);
  act(() => {
    hook.result.current[1]('municipality', 'Karmøy');
    hook.result.current[1]('selectedAges', ['baby', 'preschool']);
  });
  expect(new URLSearchParams(window.location.search).getAll('alder')).toEqual(['baby', 'preschool']);
  hook.unmount();
  const restored = renderHook(useUrlFilters);
  expect(restored.result.current[0].municipality).toBe('Karmøy');
  expect(restored.result.current[0].selectedAges).toEqual(['baby', 'preschool']);
  act(() => window.history.back());
  await waitFor(() => expect(restored.result.current[0].municipality).toBe('Alle steder'));
  expect(restored.result.current[0].selectedAges).toEqual([]);
  act(() => window.history.forward());
  await waitFor(() => expect(restored.result.current[0].municipality).toBe('Karmøy'));
  expect(restored.result.current[0].selectedAges).toEqual(['baby', 'preschool']);
  act(() => {
    restored.result.current[1]('municipality', 'Alle steder');
    restored.result.current[1]('selectedAges', []);
  });
  expect(window.location.search).toBe('');
});
