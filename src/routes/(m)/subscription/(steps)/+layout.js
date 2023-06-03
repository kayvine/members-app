/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {
  console.log(params);
  return {
    forms: [
      {
        slug: 'personal',
        fields: [
            { name: 'postal', type: 'text', value: '' },
            { name: 'city', type: 'text', value: '' },
            { name: 'street', type: 'text', value: '' },
            { name: 'number', type: 'text', value: '' },
        ],
      },
      {
        slug: 'work',
        fields: [
          { name: 'status', type: 'radio', value: 'titular' },
          { name: 'status', type: 'radio', value: 'dependent' },
          { name: 'checkboxOne', type: 'checkbox', value: true },
          { name: 'checkboxTwo', type: 'checkbox', value: false },
        ],
      },
      {
        slug: 'family',
        fields: [
          { name: 'name', type: 'text', value: '' },
        ],
      },
      {
        slug: 'financial',
        fields: [
          { name: 'iban', type: 'iban', value: '' },
        ],
      },
    ],
  };
}
