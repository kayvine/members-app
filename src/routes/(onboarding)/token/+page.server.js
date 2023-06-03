import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  return { user: locals.user };
}
 
/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request, locals }) => {
    const data = await request.formData();
    const input = data.get('code');
 
    const user = locals.user;

    console.log(`Verifying code '${input}' for user '${user?.email}'`);
    if (input !== user?.token) {
      console.log(`Code '${input}' is not correct`);
      return fail(400, { invalid: true });
    }

    user.verified = true;
    // Remove the token from the user
    user.token = undefined;

    // cookies.set('sessionid', await db.createSession(user));
    cookies.set('sessionid', JSON.stringify(user));

    // Note: At this point we have a verified user, 
    //  and we should check if they are a member
 
    throw redirect(303, '/dashboard');
  },
};
