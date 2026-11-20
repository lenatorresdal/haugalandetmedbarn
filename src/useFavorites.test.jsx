import { afterEach, beforeEach, expect, it } from 'vitest';
import { act, cleanup, renderHook } from '@testing-library/react';
import useFavorites from './useFavorites.js';

beforeEach(() => localStorage.clear());
afterEach(cleanup);

it('synkroniserer favoritter når de endres i en annen fane', () => {
  const { result } = renderHook(useFavorites);
  act(() => window.dispatchEvent(new StorageEvent('storage', {
    key: 'permliv-favorites', newValue: '["tur", "babysang-norheim"]', storageArea: localStorage,
  })));
  expect([...result.current[0]]).toEqual(['tur', 'babysang-norheim']);
  act(() => window.dispatchEvent(new StorageEvent('storage', {
    key: null, newValue: null, storageArea: localStorage,
  })));
  expect(result.current[0].size).toBe(0);
});
