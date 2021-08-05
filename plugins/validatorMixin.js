export default {
  props: {
    validator: {
      type: Object,
      required: false,
      default: null,
    },
    hideValidator: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isInvalid() {
      const { validator } = this
      return validator && validator.$invalid && validator.$dirty
    },
  },
  methods: {
    validate() {
      const { validator } = this

      if (!validator) return

      validator.$touch()
    },
  },
}
