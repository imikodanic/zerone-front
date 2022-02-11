import Vue from 'vue'
import moment from 'moment'

const formatDate = (date, format) => {
  if (!date) return null

  return moment(date).format(format || 'LL')
}

Vue.filter('formatDate', (date, format) => formatDate(date, format))

Vue.mixin({
  computed: {
    // Extend router because of locale routing for easier maintenance
    $localeRouter() {
      const push = (path) => {
        this.$router.push(this.localePath(path))
      }

      return { ...this.$router, push }
    },
  },
  methods: {
    $formatDate(date, format) {
      return formatDate(date, format)
    },
    $extractError(error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        return error.response.data.message
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return error.request
      } else {
        // Something happened in setting up the request that triggered an Error
        return error.message
      }
    },
    $getImage(imgHash) {
      if (!imgHash) return null

      const { publicURL } = this.$config
      return `${publicURL}/${imgHash}`
    },
  },
})
