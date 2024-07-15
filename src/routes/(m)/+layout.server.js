import { fail, redirect } from '@sveltejs/kit';
 
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals: { supabase }, parent, url }) {
  const { session } = await parent();
  if (!session) {
    throw redirect(302, `/login?redirectTo=${url.pathname + url.search}`);
  }

  const { data: profiles } = await supabase.from('profiles').select('*');
  if (!profiles) {
    throw fail(400, { error: true, code: 'NO_PROFILE', message: 'No profile was found for the logged-in user' });
  }
  if (profiles.length !== 1) {
    throw fail(400, { error: true, message: 'Multiple profiles found' });
  }

  const { data: messages } = await supabase.from('messages').select('*');
  console.log('[(m) layout load] messages', messages);

  const { data: subscriptions } = await supabase.from('subscriptions').select('*');
  console.log('[(m) layout load] subscriptions', subscriptions);

  return {
    session,
    profile: profiles[0],
    messages: messages || [],
  };
}
