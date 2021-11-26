module.exports = {
  purge: ['./pages/**/*.tsx', './components/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['BCSans'],
    },
    extend: {
      colors: {
        bcBluePrimary: '#003366',
        bcYellowPrimary: '#FCBA19',
        bcBlack: '#313132',
        bcGray: '#606060',
        bcLightGray: '#F2F2F2',
        bcBlueLink: '#1A5A96',
        bcBlueNav: '#38598A',
        bcRedError: '#D8292F',
        bcGreenSuccess: '#2E8540',
        bcYellowWarning: '#F5A623',
        bcBlueAccent: '#38598A',
        bcBlueIndicator: '#0053A4',
        bcLightBackground: '#F2F2F2',
        bcOrange: '#F6A622',
      },
      fontSize: {
        '3xl': '1.625rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        '2xl': '0 4px 16px 0 rgba(35,64,117,0.3)',
      },
      letterSpacing: {
        widest: '.3em',
        wider: '.1em',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
