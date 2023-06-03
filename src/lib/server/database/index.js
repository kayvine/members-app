/** @type {(slug: string) => Promise<any>} */
export async function getPost(slug) {
  console.log('BLABLA');
  return new Promise((resolve) => {
    resolve({ id: 'slug-' + slug })
  });
}