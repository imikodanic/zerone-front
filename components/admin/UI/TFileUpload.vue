<script>
import validatorMixin from '@/plugins/validatorMixin'
import ErrorMessage from '@/components/admin/UI/ErrorMessage'

export default {
  name: 'TFileUpload',
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
    label: {
      type: String,
      default: null,
    },
    hint: {
      type: String,
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'image',
    },
    previewOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      openedImage: null,
    }
  },
  computed: {
    imagePreview() {
      if (this.type === 'file' && this.value)
        return [require('~/static/icons/icon-file.svg')]

      return this.multiple ? this.multiplePreview : this.singlePreview
    },
    multiplePreview() {
      const { apiURL } = this.$config

      if (!this.value) return []

      const imageURLs = this.value.map((idOrFile) => {
        if (this.isLocalFile(idOrFile)) return idOrFile.url

        return `${apiURL}/media/${idOrFile}`
      })
      return [...imageURLs]
    },
    singlePreview() {
      const { value } = this

      if (!value) return []

      // Return URLs in an array so it's easier to iterate in HTML
      if (this.isLocalFile(value)) return [value.url]

      if (value) {
        const { apiURL } = this.$config
        return [`${apiURL}/media/${value}`]
      }

      return []
    },
  },
  methods: {
    isLocalFile(file) {
      return typeof file === 'object'
    },
    selectFile(event) {
      const { files } = event.target

      if (!files.length) return

      files.forEach((file) => this.setLocalFile(file))

      this.clearFileUpload()
    },
    clearFileUpload() {
      const fileUpload = document.getElementById(`${this.id}-file-upload`)

      fileUpload.value = null
    },
    setLocalFile(file) {
      if (!this.multiple) this.$emit('input', null)

      if (!file) return

      const fileReader = new FileReader()

      fileReader.onload = (e) => {
        const fileObject = { url: e.target.result, file }

        if (this.multiple && !this.value) this.$emit('input', [])

        if (this.multiple) this.$emit('input', [...this.value, fileObject])
        else this.$emit('input', fileObject)
      }

      fileReader.readAsDataURL(file)
    },
    async uploadMultiple() {
      if (!this.value) return

      const localFiles = this.value.filter((file) => this.isLocalFile(file))

      if (!localFiles.length) return

      const formDataPayloads = []

      // Crate a formData for each file
      localFiles.forEach((localFile) => {
        const { file } = localFile
        const formData = new FormData()

        formData.append('file', file)
        formDataPayloads.push(formData)
      })

      // Send requests in Promise.all so it's more efficient
      try {
        const requests = formDataPayloads.map((payload) =>
          this.$axios.post('/media', payload)
        )
        const response = await Promise.all(requests)

        const mediaIds = response.map((res) => res.data.data.id)
        const oldMediaIds = this.value.filter((m) => !this.isLocalFile(m))

        this.$emit('input', [...oldMediaIds, ...mediaIds])
      } catch (e) {}
    },
    async uploadSingle() {
      // Don't send a request if there's already uploaded media on a single select
      if (!this.isLocalFile(this.value)) return

      const { value } = this

      if (!value) {
        this.$emit('input', null)
        return
      }

      const { file } = value

      try {
        const formData = new FormData()
        formData.append('file', file)

        const { data } = await this.$axios.post('/media', formData)
        this.$emit('input', data.data.id)
      } catch (e) {}
    },
    async upload() {
      if (this.multiple) await this.uploadMultiple()
      else await this.uploadSingle()
    },
    remove(imageURL) {
      if (!this.multiple) {
        this.$emit('input', null)

        this.validate()
        return
      }

      // Removes media ids that are loaded from backend
      if (imageURL.includes(this.$config.apiURL)) {
        const urlParts = imageURL.split('/')

        const mediaId = urlParts[urlParts.length - 1]

        const idIndex = this.value.indexOf(Number(mediaId))

        const newValue = [...this.value]
        newValue.splice(idIndex, 1)

        this.$emit('input', newValue)
      } else {
        // Remove local files
        const localFileIndex = this.value.findIndex(
          (file) => file.url === imageURL
        )
        const newValue = [...this.value]
        newValue.splice(localFileIndex, 1)

        this.$emit('input', newValue)
      }

      this.validate()
    },
    openPreview(imageURL) {
      // This will break if it's a multiple file input...
      if (this.type === 'file') {
        const { value } = this
        const { apiURL } = this.$config

        const mediaURL = `${apiURL}/media/${value}`

        const fileURL = typeof value === 'object' ? value.url : mediaURL

        window.open(fileURL)
        return
      }

      this.openedImage = imageURL
    },
    closePreview() {
      this.openedImage = null
    },
    downloadImage(image) {
      this.$fileSaveAs(image, 'QR Code')
    },
  },
}
</script>

<template>
  <div>
    <!-- PREVIEW MODAL -->
    <t-modal :value="!!openedImage" width="max-w-5xl">
      <div class="flex justify-end mb-5">
        <custom-icon
          icon="icon-x"
          class="cursor-pointer"
          aria-label="Close modal"
          @click="closePreview"
        />
      </div>
      <div class="w-full h-auto">
        <img :src="openedImage" alt="Image preview" class="border mx-auto" />
      </div>
    </t-modal>
    <!-- INPUT COMPONENT -->
    <label class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <div
      class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dynamic-height max-h-full"
      :class="{ invalid: isInvalid }"
    >
      <div
        v-if="imagePreview.length"
        class="max-h-full w-full flex flex-wrap gap-10 items-center"
        :class="multiple ? 'justify-start' : 'justify-center'"
      >
        <div
          v-for="image in imagePreview"
          :key="`image-${image}`"
          class="w-60 h-60 max-h-full relative shadow bg-black-text group"
        >
          <img
            :src="image"
            :alt="label"
            class="object-cover h-full w-full group-hover:opacity-20"
          />
          <div
            class="absolute flex items-center justify-center top-0 left-0 w-full h-full opacity-0 group-hover:opacity-100"
          >
            <button
              type="button"
              class="border-2 border-white text-white text-sm font-medium px-3 py-2 mr-4 hover:bg-white hover:text-black-text"
              @click="openPreview(image)"
            >
              Preview
            </button>
            <button
              v-if="previewOnly"
              type="button"
              class="border-2 border-white text-white text-sm font-medium px-3 py-2 mr-4 hover:bg-white hover:text-black-text"
              @click="downloadImage(image)"
            >
              Download
            </button>
            <button
              v-if="!previewOnly"
              type="button"
              class="border-2 border-white text-white font-medium text-sm px-3 py-2 hover:bg-white hover:text-black-text"
              @click="remove(image)"
            >
              Remove
            </button>
          </div>
        </div>

        <label
          v-if="multiple"
          :for="`${id}-file-upload`"
          class="cursor-pointer flex justify-center items-center w-40 h-40 border rounded-2xl"
        >
          <custom-icon icon="icon-plus" class="w-14 h-14 fill-gray-700" />
        </label>
      </div>
      <div
        v-show="!imagePreview.length"
        class="space-y-1 text-center flex items-center flex-col justify-center"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span v-if="previewOnly" class="text-xs text-gray-500">
          {{ label }} preview
        </span>
        <template v-else>
          <div class="flex justify-center text-sm text-gray-600">
            <label
              :for="`${id}-file-upload`"
              class="relative cursor-pointer bg-white rounded-md font-medium hover:text-indigo-500"
            >
              <span class="text-indigo-600">Upload a file</span>
              <input
                :id="`${id}-file-upload`"
                :name="`${id}-file-upload`"
                type="file"
                class="sr-only"
                :multiple="multiple"
                @input="selectFile"
              />
            </label>
            <!--          <p class="pl-1">or drag and drop</p>-->
          </div>
          <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        </template>
      </div>
    </div>
    <error-message v-if="!hideValidator" :validator="validator" />
  </div>
</template>

<style scoped>
.dynamic-height {
  height: calc(100% - 50px);
}
.invalid {
  @apply ring-red-500 border-red-500;
}
</style>
