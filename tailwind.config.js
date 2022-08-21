/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      width: {
        1600: '1600px',
        400: '400px',
        450: '450px',
        210: '210px',
        550: '550px',
        260: '260px',
        650: '650px',
      },
      backgroundColor: {
        blue:'#003049',
        red:'#d62828',
        orange:'#f77f00',
        yellow:'#fcbf49',
        sand:'#eae2b7',
      },
      colors: {
        blue:'#003049',
        red:'#d62828',
        orange:'#f77f00',
        yellow:'#fcbf49',
        purple:'#8338ec',
        hot_pink:'#ff006e',
        sand:'#eae2b7',
        iconHL: '#7209b7',
      },
      fontFamily: {
        // 'accent_font': ["Splash", "Sans-serif"]
        'accent': ['Mochiy Pop P One', 'sans-serif'],
        monoton: "'Monoton', cursive",
      },
      rotate: {
        '270': '270deg',
      }
    },
  },
  plugins: [],
}
