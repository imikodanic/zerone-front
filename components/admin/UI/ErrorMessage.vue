<script>
export default {
  name: 'ErrorMessage',
  props: {
    validator: {
      type: Object,
      default: null,
    },
  },
  computed: {
    errorMessage() {
      const { validator } = this
      if (!validator) return null

      if (!validator.$params || (!validator.$dirty && validator.$invalid))
        return null

      const validations = validator.$flattenParams()
      for (let i = 0; i < validations.length; i++) {
        const validationName = validator[validations[i].name]

        if (!validationName) return this.generateErrorMessage(validations[i])
      }
      return null
    },
  },
  methods: {
    generateErrorMessage(validation) {
      switch (validation.name) {
        case 'required':
          return 'This field is required'
        case 'minLength':
          return `This field should be at least ${validation.params.min} characters long`
        case 'maxLength':
          return `This field should be at most ${validation.params.max} characters long`
        case 'email':
          return 'Invalid email format'
        default:
          // eslint-disable-next-line no-console
          console.error(validation)
          return 'This field is invalid'
      }
    },
  },
}
</script>

<template>
  <div class="text-red-400 error-min-height text-xs block px-1 pt-1">
    {{ errorMessage }}
  </div>
</template>

<style scoped>
.error-min-height {
  min-height: 20px;
}
</style>
