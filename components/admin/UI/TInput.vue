<script>
import ErrorMessage from '@/components/admin/UI/ErrorMessage'
import validatorMixin from '@/plugins/validatorMixin'

export default {
  name: 'TInput',
  components: {
    ErrorMessage,
  },
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
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: null,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    maxLength: {
      type: [Number, String],
      default: null,
    },
    dense: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 rounded-md shadow-sm">
      <input
        :id="id"
        :value="value"
        :type="type"
        :aria-label="label || type"
        :autofocus="autofocus"
        :maxlength="maxLength"
        class="focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block px-4 py-1.5 w-full border border-gray-300 rounded-md"
        :class="{ invalid: isInvalid, dense }"
        @blur="validate"
        @input="$emit('input', $event.target.value)"
      />
    </div>
    <error-message v-if="!hideValidator" :validator="validator" />
  </div>
</template>

<style scoped>
.invalid {
  @apply ring-red-500 border-red-500;
}
.dense {
  @apply px-2 py-0.5;
}
</style>
