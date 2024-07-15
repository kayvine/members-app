const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      fontFamily: {
        display: ['Geologica', ...fontFamily.sans],
      },
      gridTemplateColumns: {
        'content': '1fr 16rem',
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    themes: [ 
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          'primary': 'hsl(255 56% 49%)',
          // 'secondary': 'hsl(100 6% 90%)', // '#e5e7e4'
          'secondary': 'hsl(255 79% 87%)', // '#D1C4F8'
          'secondary-content': 'hsl(174 75% 11%)',
          'accent': 'hsl(320, 58%, 48%)',
          'accent-content': 'hsl(314, 100%, 91%)',
          // 'neutral': '#2B3440',
          'base-100': 'hsl(255 20% 98%)', // '#fdfcf8',0.58	0.20	0.98
          // 'base-100': 'hsl(255 56% 98%)', // '#fdfcf8',0.58	0.20	0.98
          'base-200': 'hsl(255 20% 96%)', // '#f7f6ea',
          'base-300': 'hsl(255 15% 94%)', // '#eceace',
          
          // "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
          // "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
          // "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
          // "--animation-btn": "0.25s", // duration of animation when you click on button
          // "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
          "--btn-text-case": "normal-case", // set default text transform for buttons
          // "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
          // "--border-btn": "1px", // border width of buttons
          // "--tab-border": "1px", // border width of tabs
          // "--tab-radius": "0.5rem", // border radius of tabs
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          'primary': 'hsl(255 56% 49%)',
          // 'secondary': '#daccf9',
          // 'accent': '#0c5f33',
          // 'neutral': '#2B3440',
          // 'base-100': '#202020',
          'base-100': 'hsl(0 0% 15%)',
          'base-200': 'hsl(0 0% 11%)',
          'base-300': 'hsl(0 0% 8%)',
          // 'base-content': 'hsl(255 12% 72%)',

          "--btn-text-case": "normal-case",
        }
      }
    ],
  },  
}
