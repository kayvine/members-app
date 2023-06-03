import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request }) => {
    const data = await request.formData();
    const nrn = data.get('nrn');

    /** @type {{nrn: string}} */
    const user = { nrn: nrn + '' };

    cookies.set('sessionid', JSON.stringify(user));

    throw redirect(303, '/login');
  }
}
