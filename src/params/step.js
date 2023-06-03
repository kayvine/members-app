/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return ['personal', 'work', 'family', 'financial', 'documents'].includes(param);
}