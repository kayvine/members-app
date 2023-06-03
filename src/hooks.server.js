/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const session = event.cookies.get('sessionid');
  if (session) {
    event.locals.user = JSON.parse(session);
  }

  return resolve(event);
}
