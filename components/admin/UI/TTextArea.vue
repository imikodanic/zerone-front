<script>
import validatorMixin from '@/plugins/validatorMixin'
import ErrorMessage from '@/components/admin/UI/ErrorMessage'
export default {
  name: 'TTextArea',
  components: { ErrorMessage },
  mixins: [validatorMixin],
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
    autofocus: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: [String, Number],
      default: 5,
    },
    placeholder: {
      type: String,
      default: null,
    },
  },
}
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <textarea
        :id="id"
        :value="value"
        :aria-label="label"
        :autofocus="autofocus"
        :rows="rows"
        :placeholder="placeholder"
        class="focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-1.5 w-full border border-gray-300 rounded-md"
        :class="{ invalid: isInvalid }"
        @blur="validate"
        @input="$emit('input', $event.target.value)"
      ></textarea>
    </div>
    <error-message v-if="!hideValidator" :validator="validator" />
  </div>
</template>

<style scoped>
.invalid {
  @apply ring-red-500 border-red-500;
}
</style>
