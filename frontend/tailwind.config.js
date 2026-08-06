/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        talentlynk: {
          black: '#050b14',
          dark: '#070e1b',
          surface: '#091120',
          card: '#0d172a',
          border: '#182744',
          blue: '#368dff',
          'blue-hover': '#257ce6',
          'blue-light': '#5ba3ff',
          green: '#00a962',
          'green-hover': '#008e52',
          yellow: '#ffc301',
          pink: '#db3662',
          muted: '#94a3b8',
        },
        brand: {
          50: '#eef6ff',
          100: '#dbeafe',
          500: '#368dff',
          600: '#257ce6',
          700: '#1d60b8',
          cyan: '#00a962',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Satoshi Variable', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

