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
        grayscale: {
          white: '#FFFFFF',
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
