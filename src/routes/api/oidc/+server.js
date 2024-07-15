import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET() {
  const data = {
    firstName: 'Johnny',
    lastName: 'Bravo',
    nrn: '86091916765',
    fedid: '638df4354fh3dfd3df64fd64vc3545zj4'
  }

  console.log(`[API - OIDC] User returned from OIDC ${JSON.stringify(data)}`);
  return json(data);
}
