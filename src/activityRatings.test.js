import { afterEach, expect, it, vi } from 'vitest';

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock('@supabase/supabase-js', () => ({ createClient }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

it('gjenbruker anonym sesjon ved samtidige stemmer og oppdaterer ved innsettingskonflikt', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
  const session = { user: { id: 'voter' } };
  const getSession = vi.fn().mockResolvedValue({ data: { session: null } });
  const signInAnonymously = vi.fn().mockResolvedValue({ data: { session } });
  const query = { eq: vi.fn().mockReturnThis() };
  const insert = vi.fn()
    .mockResolvedValueOnce({ error: null })
    .mockResolvedValueOnce({ error: { code: '23505' } });
  const update = vi.fn(() => query);
  Object.assign(query, {
    select: vi.fn().mockReturnThis(),
    maybeSingle: vi.fn().mockResolvedValue({ data: null }),
    single: vi.fn().mockResolvedValue({ data: { rating: 5 } }),
  });
  createClient.mockReturnValue({
    auth: { getSession, signInAnonymously },
    from: vi.fn(() => ({ select: () => query, insert, update })),
  });

  const { readOwnRating, saveActivityRating } = await import('./activityRatings.js');
  expect(await readOwnRating('tur')).toBeNull();
  expect(signInAnonymously).not.toHaveBeenCalled();
  await Promise.all([saveActivityRating('tur', 3), saveActivityRating('tur', 5)]);
  expect(signInAnonymously).toHaveBeenCalledTimes(1);
  expect(insert).toHaveBeenCalledWith({ activity_id: 'tur', user_id: 'voter', rating: 3 });
  expect(update).toHaveBeenCalledExactlyOnceWith({ rating: 5 });
  expect(query.eq).toHaveBeenCalledWith('activity_id', 'tur');
  expect(query.eq).toHaveBeenCalledWith('user_id', 'voter');
});

it('sletter bare den innloggede brukerens stemme på den aktuelle aktiviteten', async () => {
  vi.stubEnv('VITE_SUPABASE_URL', 'https://example.supabase.co');
  vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'sb_publishable_test');
  const query = {
    eq: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    single: vi.fn().mockResolvedValue({ data: { activity_id: 'tur' } }),
  };
  const remove = vi.fn(() => query);
  createClient.mockReturnValue({
    auth: { getSession: vi.fn().mockResolvedValue({ data: { session: { user: { id: 'voter' } } } }) },
    from: vi.fn(() => ({ delete: remove })),
  });

  const { removeActivityRating } = await import('./activityRatings.js');
  await removeActivityRating('tur');

  expect(remove).toHaveBeenCalledTimes(1);
  expect(query.eq.mock.calls).toEqual([['activity_id', 'tur'], ['user_id', 'voter']]);
  expect(query.single).toHaveBeenCalledTimes(1);
});
