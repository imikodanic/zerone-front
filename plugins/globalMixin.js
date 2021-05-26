import Vue from 'vue'
import moment from 'moment'

const formatDate = (date, format) => {
  if (!date) return null

  return moment(date).format(format || 'LL')
}

Vue.filter('formatDate', (date, format) => formatDate(date, format))

Vue.mixin({
  methods: {
    $formatDate(date, format) {
      return formatDate(date, format)
    },
  },
})
