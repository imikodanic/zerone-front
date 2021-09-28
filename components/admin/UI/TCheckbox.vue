<script>
export default {
  name: 'TCheckbox',
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'checkbox',
    },
  },
}
</script>

<template>
  <div class="flex items-start">
    <div class="flex items-center h-5">
      <input
        :id="id"
        :value="value"
        :name="id"
        type="checkbox"
        :checked="value"
        class="focus:outline-none focus:ring-indigo-500 h-4 w-4 text-indigo-600 border border-gray-300 rounded"
        :class="type === 'radio' ? 'rounded-full' : 'rounded'"
        @change="$emit('input', $event.target.checked)"
      />
    </div>
    <div v-if="label || hint" class="ml-3 text-sm">
      <label :for="id" class="font-medium text-gray-700">
        {{ label }}
      </label>
      <p class="text-gray-500">
        {{ hint }}
      </p>
    </div>
  </div>
</template>
