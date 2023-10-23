/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        'purple': {
          DEFAULT: '#6B02A1',
          'dark': '#201824',
        },
        'white': {
          DEFAULT: '#E9E2ED',
        },
        'spotify': {
          DEFAULT: '#4DD760',
        }
      }
    },
  },
  plugins: [],
}

