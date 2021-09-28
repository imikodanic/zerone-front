module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  // important: true,
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
      borderWidth: {
        3: '3px',
      },
    },
    stroke: (theme) => ({
      white: theme('colors.grayscale.white'),
    }),
  },
  variants: {
    extend: {
      display: ['last'],
      visibility: ['hover', 'focus'],
    },
  },
  // plugins: [require('@tailwindcss/forms')],
}
