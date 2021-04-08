module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          black: '#2D3436',
          yellow: '#FDCB6E',
          purple: '#6C5CE7',
          red: '#D63031',
          green: '#55EFC4',
        },
        secondary: {
          purple: '#8C80EA',
        },
        grayscale: {
          white: '#FFFFFF',
          gray: { DEFAULT: '#4E4B66', light: '#ADADAD' },
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['last'],
    },
  },
  plugins: [],
}
