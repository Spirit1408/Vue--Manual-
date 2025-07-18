/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,vue,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#F3743D',
        gray: '#939393',
      },
    },
  },
  plugins: [],
}

//* In extend section can be added global variables, such as color sets.
