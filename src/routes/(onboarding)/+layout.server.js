import { redirect } from '@sveltejs/kit';
 
/** @type {import('./$types').LayoutServerLoad} */
export function load({ locals }) {
  if (locals.user?.nrn && locals.user?.verified) {
    throw redirect(307, '/dashboard');
  }
}
