<script>
export default {
  name: 'THeader',
  props: {
    title: {
      type: String,
      default: null,
    },
    createPath: {
      type: String,
      default: 'create',
    },
    hideCreate: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openForm() {
      const { createPath: path } = this
      const append = path === 'create'

      this.$router.push({ path, append })
    },
  },
}
</script>

<template>
  <div
    class="flex justify-between flex-wrap items-center bg-gray-200 border-b rounded-t-xl px-6 py-4"
  >
    <h2 class="text-xl font-medium text-gray-800">{{ title }}</h2>

    <button
      v-if="!hideCreate"
      type="button"
      class="bg-gray-800 hover:bg-gray-900 px-6 py-2 rounded-lg border-0"
      @click="openForm"
    >
      <span class="flex items-center text-sm text-white pt-px">
        <custom-icon
          icon="icon-plus"
          class="inline stroke-white -ml-1 mr-2 w-6 h-6"
        />
        New
      </span>
    </button>
  </div>
</template>
