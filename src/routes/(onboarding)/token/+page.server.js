import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {
  const email = cookies.get('email') || url.searchParams.get('email');
  return { email }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request, locals: { supabase }, url }) => {
    const email = cookies.get('email') || url.searchParams.get('email');
    if (!email) {
      return fail(500, { error: true, message: 'missing email' });
    }

    const formData = Object.fromEntries(await request.formData());
    const token = formData.token.toString();
    if (!token) {
      return fail(400, { missing: true });
    }

    console.log(`[server '/token'] Verifying code '${token}' for user '${email}'`);
    
    const { data: { user }, error } = await supabase.auth.verifyOtp({ email, token, type: 'email' });
    if (error) {
      console.error(`[server '/token'] Code '${token}' is not correct`);
      return fail(500, { error: true, message: error.message });
    }
    if (!user) {
      console.error(`[server '/token'] Code '${token}' is not correct`);
      return fail(400, { invalid: true });
    }
    
    console.log(`[server '/token'] The token is correct.`);

    // clean up cookie
    cookies.delete('email');

    // Note: At this point we have a verified user, 
    //  and we should check if they are a member

    const { data: profiles } = await supabase.from('profiles').select('nrn');
    console.log('Search for profile', profiles);
    
    const metadata = user?.user_metadata;
    
    if (!profiles?.[0]?.nrn) {
      if (!metadata) {
        return fail(400, { weAreFucked: true });
      }
      console.log(`[server '/token'] No profile found for logged-in user.`);
      const { data: newProfile, error: err } = await supabase.from('profiles').insert({ id: user.id, ...metadata }).select('*');
      console.log('[server \'/token\'] Created a new profile', newProfile);
      console.log('[server \'/token\'] Error while creating new profile', err);

      if (err) {
        return fail(500, { error: true, message: err.message, errorObject: err });
      }
    }
    
    if (url.searchParams.has('redirectTo')) {
      // @ts-ignore
      throw redirect(303, url.searchParams.get('redirectTo'));
    }

    throw redirect(303, '/dashboard');
  },
};
