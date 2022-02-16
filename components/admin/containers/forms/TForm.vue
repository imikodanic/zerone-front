<script>
export default {
  name: 'TForm',
  props: {
    saveMethod: {
      type: Function,
      required: true,
    },
    hideLanguageSwitch: {
      type: Boolean,
      default: false,
    },
    languageOptions: {
      type: Array,
      default: () => [],
    },
    hideCancel: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      language: 'en',
    }
  },
  computed: {
    computedLanguageOptions() {
      const { languageOptions } = this
      if (languageOptions.length) return languageOptions

      const storeLanguages = this.$store.state.fixtures.data.language

      return storeLanguages.map((lang) => lang.abbreviation_name)
    },
    isEdit() {
      return !!this.$route.params.id
    },
  },
  mounted() {
    document.addEventListener('keydown', this.keyPressListeners, false)
  },
  destroyed() {
    document.removeEventListener('keydown', this.keyPressListeners, false)
  },
  methods: {
    cancel() {
      this.$emit('cancel')
      this.$router.go(-1)
    },
    async save() {
      try {
        // await this.uploadAllMedia()

        // first check if opened form is valid
        if (!this.validate()) return

        if (!this.validateAllLanguages()) return

        // method from child page
        await this.saveMethod()

        const isEdit = !!this.$route.params.id
        const message = `Item successfully ` + (isEdit ? 'edited!' : 'created!')

        this.$toast.success(message)

        if (!this.hideCancel) this.$router.go(-1)
      } catch (e) {
        this.$toast.error(this.$extractError(e) || 'Dogodila se greška.')
      }
    },
    updateLanguage(langOption) {
      this.language = langOption
      this.$emit('update:language', langOption)
    },
    async uploadAllMedia() {
      const [defaultSlot] = this.$scopedSlots.default()

      const formNode = defaultSlot.context.$children[0]

      // Get all TFileUpload components and call their upload functions
      const fileUploads = formNode.$children.filter((child) =>
        child.$vnode.tag.includes('TFileUpload')
      )
      await Promise.all(fileUploads.map((fileUpload) => fileUpload.upload()))
    },
    validate() {
      const [defaultSlot] = this.$scopedSlots.default()

      // call vuelidate's touch method for validation
      // access slot's ref by accessing first default scoped slots
      // *** if you create a ref that's before <slot ref="formPage" name="default" /> this will break
      // *** because formPage won't be on the first place anymore
      const { $v } = defaultSlot.context
      if ($v) {
        $v.$touch()

        if ($v.$invalid) return false
      }

      return true
    },
    validateAllLanguages() {
      if (this.hideLanguageSwitch) return true

      const currentLang = this.language

      for (const lang of this.computedLanguageOptions) {
        this.updateLanguage(lang)
        const isValid = this.validate()

        if (!isValid) return false
      }

      this.updateLanguage(currentLang)

      return true
    },
    keyPressListeners(e) {
      const { metaKey, ctrlKey, key } = e
      const isMac = window.navigator.platform.match('Mac')
      const controlKey = isMac ? metaKey : ctrlKey

      if (key === 'Escape') {
        e.preventDefault()

        this.cancel()
        return
      }

      if (controlKey && key === 's') {
        e.preventDefault()

        this.save()
      }
    },
  },
}
</script>

<template>
  <div id="form-container" class="mt-10 sm:mt-0">
    <div class="mt-5 md:mt-0">
      <div class="shadow overflow-hidden sm:rounded-md">
        <div
          class="px-4 py-3 bg-gray-50 text-right sm:px-6 flex flex-col sm:flex-row gap-2 items-center"
          :class="!hideLanguageSwitch ? 'justify-between' : 'justify-end'"
        >
          <div
            v-if="!hideLanguageSwitch"
            class="divide-x-2 flex border border-gray-300 shadow-sm rounded-md"
          >
            <button
              v-for="langOption in computedLanguageOptions"
              :key="`language-${langOption}`"
              type="button"
              class="p-2 text-xs w-9 uppercase"
              :class="{
                'bg-gray-light': langOption === language,
              }"
              @click="updateLanguage(langOption)"
            >
              {{ langOption }}
            </button>
          </div>
          <div>
            <button
              v-if="!hideCancel"
              type="button"
              class="inline-flex justify-center py-2 px-4 mr-3 border border-transparent shadow-sm text-sm font-medium rounded-md bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              @click="cancel"
            >
              Cancel
            </button>
            <button
              type="button"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="save"
            >
              Save
            </button>
          </div>
        </div>
        <div class="px-4 py-5 bg-white sm:p-6">
          <slot ref="formPage" name="default" />
        </div>
      </div>
    </div>
  </div>
</template>
