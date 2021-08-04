<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
      default: null,
    },
  },
  computed: {
    iconComponent() {
      return require(`~/static/icons/${this.icon}.svg?inline`)
    },
  },
}
</script>

<template>
  <component :is="iconComponent"></component>
</template>
