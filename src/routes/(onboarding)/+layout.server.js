import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ parent }) {
  const { session } = await parent();

  if (session) {
    throw redirect(302, '/dashboard');
  }
}
