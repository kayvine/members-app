import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, locals }) => {
    cookies.delete('sessionid');
    locals.user = null;

    throw redirect(303, '/dashboard');
  },
};
