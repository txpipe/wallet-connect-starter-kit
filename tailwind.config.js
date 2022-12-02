/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    transitionDuration: {
        DEFAULT: '400ms',
    },
    extend: {
        fontFamily: {
            serif: ['Inter', 'sans-serif'],
            sans: ['Inter', 'sans'],
        },
        colors: {
            txpink: '#DD62FD',
            txpink2: '#9E46B4',
            txblue: '#0AD0FF',
            txblue2: '#08AACF',
            gray: {
                50: '#fafafa',
                100: '#f5f5f5',
                200: '#e5e5e5',
                300: '#d4d4d4',
                400: '#a3a3a3',
                500: '#737373',
                600: '#525252',
                700: '#404040',
                750: '#323232',
                800: '#272727',
                850: '#222222',
                900: '#1d1d1d',
                950: '#141414',
            },
        },
    },
},
  plugins: [],
}
