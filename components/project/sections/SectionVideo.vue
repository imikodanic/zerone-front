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
  methods: {
    setValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<template>
  <div class="flex justify-center">
    <t-input v-if="edit" id="video-input" :value="value" @input="setValue" />
    <iframe v-else :src="value" width="960" height="540"></iframe>
  </div>
</template>
