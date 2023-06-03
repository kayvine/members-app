import { redirect } from '@sveltejs/kit';
 
/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals, url }) {
  if (!locals.user) {
    throw redirect(302, `/intro?redirectTo=${url.pathname + url.search}`);
  }

  // TODO: get "user" from "session"
  return { user: locals.user };
}
