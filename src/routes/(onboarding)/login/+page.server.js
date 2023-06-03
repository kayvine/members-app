import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export function load({ locals }) {
  return { user: locals.user };
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ cookies, request, locals, url }) => {
    const data = await request.formData();
    const email = data.get('email');
 
    if (!email) {
      return fail(400, { missing: true });
    }

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(?:[a-zA-Z0-9-]+)*$/;
    const emailAsString = email + '';
    if (!emailAsString.match(validRegex)) {
      return fail(400, { email, invalid: true });
    }

    // TODO: find the user by email and check if NRN

    const user = locals.user || {};
    if (user?.nrn) {
      // NRN
      console.log('We will find the user by NRN and save the email if non exist');
      // note: user from DB can already have a confirmed email, to be handled...
    } else {
      // No NRN
      // Find user by email (user should have NRN & confirmed email, if not send the user to CSAM)
      console.log('We will find the user by email (and handle exceptions later)');
      // Give fake NRN for now
      user.nrn = '000000000000';
    }

    // At this point we have a new or returning user
    user.email = emailAsString;
    user.verified = false;
    // Generating an OTP
    const token = '251TK8';
    // Store the token on the user
    user.token = token;

    cookies.set('sessionid', JSON.stringify(user));

    // Send email with token
    console.log(`Sending email to user ${email} with OTP`);
 
    // 303 — for form actions, following a successful submission
    throw redirect(303, `/token${url.search}`);
  },
};
