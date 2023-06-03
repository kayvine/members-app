import { fail } from '@sveltejs/kit';

/** @type {import('./$types').Actions} */
export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const { postal, city, street, number } = Object.fromEntries(formData);
    console.log(city);
    console.log(typeof city);
    console.log(number);
    // const firstName = data.get('firstName')?.toString().trim();
    // const lastName = data.get('lastName')?.toString().trim();
 
    /** @type {{[key:string]:boolean}} */
    const errors = {};
    if (!postal || postal === '') errors.postal = true;
    if (!city || city === '') errors.city = true;
    if (!street || street === '') errors.street = true;
    if (Object.keys(errors).length > 0) {
      return fail(400, { errors });
    }
    
    // console.log(`Saving subscription data for '${firstName} ${lastName}'`);
    
    // redirect(303, '/subscription');
    return { success: true };
  },
};
