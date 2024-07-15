// import { fail } from '@sveltejs/kit';

// /** @type {import('./$types').Actions} */
// export const actions = {
//   default: async ({ cookies, request, locals }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     const firstName = data.firstName?.toString().trim();
//     const lastName = data.lastName?.toString().trim();
 
//     const errors = {};
//     if (!firstName || firstName === '') errors.firstName = true;
//     if (!lastName || lastName === '') errors.lastName = true;
//     if (Object.keys(errors).length > 0) {
//       return fail(400, { errors, firstName, lastName });
//     }

//     const user = locals.user || {};
//     user.firstName = firstName;
//     user.lastName = lastName;
//     console.log(`Saving subscription data for '${firstName} ${lastName}'`);

//     cookies.set('sessionid', JSON.stringify(user));

//     return { success: true, firstName, lastName };
//   },
// };
