<script>
export default {
  props: {
    selectedOptions: {
      type: Array,
      default: () => [],
    },
    itemText: {
      type: String,
      default: 'text',
    },
  },
  methods: {
    removeOption(option) {
      this.$emit('remove-option', option)
    },
  },
}
</script>

<template>
  <div class="flex flex-wrap">
    <div
      v-for="option in selectedOptions"
      :key="`selected-option-${option.id}`"
      class="flex justify-center items-center m-1 font-medium py-1 px-2 bg-white rounded-full text-blue-700 bg-blue-100 border border-blue-300"
    >
      <div class="text-xs font-normal leading-none max-w-full flex-initial">
        {{ option[itemText] }}
      </div>
      <div class="flex flex-auto flex-row-reverse">
        <div @click="removeOption(option)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-x cursor-pointer hover:text-indigo-400 rounded-full w-4 h-4 ml-2"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
