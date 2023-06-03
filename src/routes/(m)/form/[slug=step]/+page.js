/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  const res = await fetch(`https://api.basisregisters.vlaanderen.be/v2/gemeenten`);
  const item = await res.json();
 
  const res2 = await fetch('https://opzoeken-postcode.be/autofill/12.json?search=1');
  const item2 = await res2.json();
  return { item, item2 };
}

