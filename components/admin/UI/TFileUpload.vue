<script>
export default {
  name: 'TFileUpload',
  props: {
    value: {
      type: [Array, Object],
      default: null,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: null,
    },
  },
  computed: {
    computedValue() {
      if (!this.value) return []

      if (!this.multiple) return [this.value].filter(Boolean)

      return this.value
    },
    showUploadButton() {
      return !(!this.multiple && this.value)
    },
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    async uploadFile(event) {
      const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append('media', file)
        return await this.$axios.$post('/admin/media', formData)
      }

      try {
        const files = Array.from(event.target.files)
        const fileRequests = files.map((file) => uploadFile(file))
        const uploadedFiles = await Promise.all(fileRequests)

        const uploadedData = uploadedFiles.map((file) => file.data)

        const newValue = this.multiple
          ? [...this.value, ...uploadedData]
          : uploadedData[0]

        this.$emit('input', newValue)
      } catch {}
    },
    removeAttachment(index) {
      const isConfirmed = confirm('Are you sure you want to remove this file?')

      if (!isConfirmed) return

      let newValue

      if (this.multiple) {
        const newValue = [...this.value]
        newValue.splice(index, 1)
      } else {
        newValue = null
      }
      this.$emit('input', newValue)
    },
    openAttachment(attachment) {
      const { publicURL } = this.$config
      const url = `${publicURL}/${attachment.disk_name}`

      window.open(url)
    },
    getAttachmentIcon(attachment) {
      return this.$getImage(attachment.disk_name)
    },
    getAttachmentExtension(attachment) {
      const splitByDots = attachment.filename.split('.')

      return splitByDots[splitByDots.length - 1] // last element must be the extension
    },
  },
}
</script>

<template>
  <div>
    <div class="my-2">
      <ul>
        <li
          v-for="(attachment, index) in computedValue"
          :key="`file-${attachment.disk_name}`"
          class="flex justify-between px-3 py-1 mb-2 items-center bg-gray-100 rounded last:mb-0"
        >
          <div
            class="flex items-center gap-2 cursor-pointer"
            @click="openAttachment(attachment)"
          >
            <img :src="getAttachmentIcon(attachment)" class="w-8" />
            <span class="text-theme-oxford-blue text-sm font-semibold">
              {{ attachment.filename }}
            </span>
          </div>

          <div class="flex-shrink-0 flex gap-0.5">
            <custom-icon
              icon="icon-trash"
              class="cursor-pointer"
              @click="removeAttachment(index)"
            />
            <custom-icon
              icon="icon-download"
              class="cursor-pointer"
              @click="openAttachment(attachment)"
            />
          </div>
        </li>
      </ul>
    </div>
    <div class="flex">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        :multiple="multiple"
        :accept="accept"
        @input="uploadFile($event)"
      />
      <button
        v-if="showUploadButton"
        type="button"
        class="inline-flex py-2 px-4 mt-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="selectImage"
      >
        Upload file
      </button>
    </div>
  </div>
</template>
