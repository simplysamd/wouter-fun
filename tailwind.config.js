/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#2dd4bf',
        'secondary': '#f87171',
        'bgclr': '#111827',
        'textclr': '#94a3b8',
        'c2': '#36a9e1'
      },
      fontFamily: {
        'display': ['Open Sans']
      }
    },
  },
  plugins: [],
}
