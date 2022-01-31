<script>
export default {
  name: 'SectionText',
  props: {
    value: {
      type: String,
      default: null,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    formattedURL() {
      if (!this.value) return null

      const queryString = this.value.split('?')[1]

      if (!queryString) return

      const urlSearchParams = new URLSearchParams(queryString)
      const params = Object.fromEntries(urlSearchParams.entries())

      const baseURL = 'https://www.youtube.com/embed/'

      return baseURL + params.v
    },
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<template>
  <div class="flex justify-center">
    <t-input
      v-if="edit"
      id="video-input"
      label="Youtube URL"
      :value="value"
      class="w-96"
      @input="setValue"
    />
    <iframe
      v-else
      :src="formattedURL"
      width="960"
      height="540"
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      class="max-w-4xl"
    />
  </div>
</template>
