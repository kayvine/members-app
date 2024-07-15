import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
  const data = await request.json();

  console.log(`[API - MESSAGES] Send a message from ${JSON.stringify(data)} to ${JSON.stringify(data)}`);
  return json(data);
}
