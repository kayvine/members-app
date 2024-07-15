/** @type {import('./$types').LayoutLoad} */
export async function load() {
  return {
    title: 'Subscription',
    steps: ['personal', 'work', 'family', 'financial', 'documents'],
  };
}
