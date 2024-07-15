import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  oidc: async ({ fetch }) => {
    const response = await fetch('/api/oidc');

    if (response.status !== 200) {
      return { error: true };
    }

    const user = await response.json();

    return { user };
  },
  login: async ({ cookies, locals: { supabase }, request }) => {
    const formData = Object.fromEntries(await request.formData());
    const email = formData.email.toString();
    const metadata = formData.metadata && JSON.parse(formData.metadata.toString());

    if (!email.length) {
      console.log('fail', formData);
      return fail(400, { missing: true });
    }

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)*$/;
    if (!email.match(validRegex)) {
      return fail(400, { email, invalid: true });
    }

    console.log(`[server '/login'] Metadata: ${JSON.stringify(metadata, null, 2)}`);
    if (!metadata?.nrn) {
      // The user did not pass through FAS/CSAM auth so they should have an existing user.
      //  If not, we need to send them there at some point
    }

    console.log(`[server '/login'] Sending email to user ${email} with OTP`);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:5173/token',
        data: metadata,
      }
    });
    
    if (error) {
      console.error(`[server '/login'] Sign in with OTP failed due to ${error}`);
      return fail(500, { message: 'Server error. Try again later.', success: false, email });
    }

    console.log(`[server '/login'] Email sent to user ${email}, with nrn '${metadata?.nrn}'`);

    cookies.set('email', email);

    throw redirect(302, `/token?email=${encodeURIComponent(email)}`);
  },
};
