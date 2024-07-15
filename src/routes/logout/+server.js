import { error, redirect } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ locals }) {
  const { error: err } = await locals.supabase.auth.signOut()

  if (err) {
    throw error(500, 'Something went wrong when trying to log out')
  }

  throw redirect(303, '/');
}
