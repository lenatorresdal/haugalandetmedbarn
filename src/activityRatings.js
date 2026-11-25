const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const ratingsConfigured = Boolean(url && key?.startsWith('sb_publishable_'));

let clientRequest;
let sessionRequest;
const statsColumns = 'activity_id, average_rating, vote_count';

function getClient() {
  clientRequest ??= import('@supabase/supabase-js').then(({ createClient }) => createClient(url, key, {
    auth: { persistSession: true, detectSessionInUrl: false },
  }));
  return clientRequest;
}

async function getSession() {
  const { auth } = await getClient();
  const { data, error } = await auth.getSession();
  if (error) throw error;
  return data.session;
}

async function getVotingSession() {
  // Different cards can submit their first vote at the same time.
  sessionRequest ??= (async () => {
    const session = await getSession();
    if (session) return session;
    const { auth } = await getClient();
    const { data, error } = await auth.signInAnonymously();
    if (error) throw error;
    return data.session;
  })().finally(() => { sessionRequest = undefined; });

  return sessionRequest;
}

export async function readRatingStats(activityId) {
  const client = await getClient();
  const query = client.from('activity_rating_stats').select(statsColumns);
  const { data, error } = await query.eq('activity_id', activityId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function readOwnRating(activityId) {
  const session = await getSession();
  if (!session) return null;
  const client = await getClient();
  const { data, error } = await client.from('activity_ratings')
    .select('rating').eq('activity_id', activityId).eq('user_id', session.user.id).maybeSingle();
  if (error) throw error;
  return data?.rating ?? null;
}

export async function saveActivityRating(activityId, rating) {
  const session = await getVotingSession();
  if (!session) throw new Error('Missing voting session');
  const userId = session.user.id;
  const client = await getClient();
  const ratings = () => client.from('activity_ratings');
  const ownVote = query => query.eq('activity_id', activityId).eq('user_id', userId);
  const { data: existing, error: readError } = await ownVote(ratings().select('rating')).maybeSingle();
  if (readError) throw readError;

  if (!existing) {
    const { error } = await ratings().insert({ activity_id: activityId, user_id: userId, rating });
    if (!error) return;
    // Another request may have inserted this user's vote after we checked.
    if (error.code !== '23505') throw error;
  }

  const { error } = await ownVote(ratings().update({ rating })).select('rating').single();
  if (error) throw error;
}

export async function removeActivityRating(activityId) {
  const session = await getSession();
  if (!session) throw new Error('Missing voting session');
  const client = await getClient();
  const { error } = await client.from('activity_ratings')
    .delete()
    .eq('activity_id', activityId)
    .eq('user_id', session.user.id)
    .select('activity_id')
    .single();
  if (error) throw error;
}
