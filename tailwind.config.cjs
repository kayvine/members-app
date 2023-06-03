/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        'content': '1fr 16rem',
      },
    },
  },
  plugins: [require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    themes: [
      'light', 
      // 'dark'
    ],
  },  
}
