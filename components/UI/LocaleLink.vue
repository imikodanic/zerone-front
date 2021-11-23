<script>
/**
 * This component is made so we don't have to use localePath method on every nuxt link
 */
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <nuxt-link :to="localePath(to)">
    <slot name="default"></slot>
  </nuxt-link>
</template>
