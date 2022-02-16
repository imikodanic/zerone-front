export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Zerone',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Preview beautifully organized projects with ease and joy.',
      },
    ],
    link: [{ rel: 'icon', href: '/logos/logo.svg' }],
  },

  server: {
    host: process.env.HOST,
    port: process.env.PORT,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/tailwind/tailwindBase.css',
    '~/assets/css/global.css',
    '~/assets/css/unreset.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/globalComponents.js',
    '~/plugins/apiServices.js',
    '~/plugins/axios.js',
    '~/plugins/globalMixin.js',
    '~/plugins/vuelidate.js',
    '~/plugins/Utils.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://www.npmjs.com/package/@nuxtjs/svg
    '@nuxtjs/svg',
    // https://www.npmjs.com/package/vue-scrollto
    'vue-scrollto/nuxt',
    // https://www.npmjs.com/package/@nuxtjs/toast
    '@nuxtjs/toast',
    // https://auth.nuxtjs.org/guide/setup
    '@nuxtjs/auth-next',
    // https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // https://i18n.nuxtjs.org/setup
    '@nuxtjs/i18n',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    icon: {
      fileName: 'pwa_icon.png',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // RuntimeConfig Properties https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-runtime-config
  publicRuntimeConfig: {
    apiURL: process.env.API_URL,
    publicURL: process.env.PUBLIC_URL,
  },

  // https://nuxtjs.org/docs/2.x/features/loading
  loading: {
    color: '#6C5CE7',
  },

  // https://www.npmjs.com/package/@nuxtjs/toast#setup
  toast: {
    duration: 3000,
  },

  // Nuxt auth-next module options https://auth.nuxtjs.org/api/options
  auth: {
    // Auth module strategies https://auth.nuxtjs.org/schemes/local
    strategies: {
      local: {
        token: {
          property: 'data.token',
        },
        user: {
          property: 'data',
        },
        endpoints: {
          login: { url: 'auth/login', method: 'post' },
          logout: false, // logout only locally
          user: { url: 'users/me', method: 'get' },
        },
      },
    },
  },

  i18n: {
    defaultLocale: 'hr',
    strategy: 'prefix_and_default',
    langDir: 'locales/',
    lazy: true,
    parsePages: true,
    vueI18n: {
      fallbackLocale: 'hr',
    },
    locales: [
      { code: 'en', iso: 'en-US', file: 'en.json' },
      { code: 'hr', iso: 'hr', file: 'hr.json' },
    ],
  },
}
