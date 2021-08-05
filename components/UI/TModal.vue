<script>
export default {
  name: 'TModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    hideClose: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'max-w-lg',
    },
  },
  computed: {
    customClass() {
      if (!this.width) return null

      return `sm:${this.width}`
    },
  },
  methods: {
    close() {
      this.$emit('input', false)
      this.$emit('close')
    },
  },
}
</script>

<template>
  <div
    v-if="value"
    class="fixed z-50 inset-0 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen lg:px-4 text-center sm:block sm:p-0"
    >
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="modal-wrapper inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all h-screen sm:my-8 sm:align-middle sm:h-full sm:rounded-lg sm:max-w-3xl"
        :class="customClass"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex justify-end">
            <custom-icon
              icon="icon-x"
              class="w-14 h-14 cursor-pointer"
              @click="close"
            />
          </div>
          <slot name="default" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-wrapper {
  @apply w-screen;
}
/* Subtract 30px from screen width because otherwise modal disappears if it's width is greater than screen size' */
@media screen and (min-width: 640px) {
  .modal-wrapper {
    width: calc(100vw - 30px);
  }
}
</style>
