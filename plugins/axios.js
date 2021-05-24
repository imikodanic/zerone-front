export default function ({ $axios, app }) {
  // Set base api url from runtime config
  const { apiURL } = app.$config

  $axios.setBaseURL(apiURL)

  $axios.onRequest((config) => {
    // config.headers.Authorization = 'Bearer ' + store.getters.getToken;
    // config.headers['Accept-Language'] = app.i18n.locale
  })
}
