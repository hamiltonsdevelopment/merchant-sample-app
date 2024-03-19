/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#63A8B3',
        tertiary: '#F2F2F2',
      },
      backgroundImage: (theme) => ({
        "mobile-php-demo": "url('/src/assets/mobile-bg-php-demo.png')",
        "desktop-php-demo": "url('/src/assets/desktop-bg-php-demo.png')",
        "final-php-demo": "url('/src/assets/php-final_720.png')",
        "final-puckstore-demo": "linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 1.0)), url('/src/assets/puckstore_BG.png')",
      }),
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
