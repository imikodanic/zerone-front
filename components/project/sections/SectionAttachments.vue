<script>
export default {
  name: 'SectionAttachments',
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    edit: {
      type: Boolean,
      default: false,
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

        this.$emit('input', [...this.value, ...uploadedData])
      } catch {}
    },
    removeAttachment(index) {
      const isConfirmed = confirm(
        'Are you sure you want to remove this attachment?'
      )

      if (!isConfirmed) return

      const newValue = [...this.value]
      newValue.splice(index, 1)

      this.$emit('input', newValue)
    },
    openAttachment(attachment) {
      const { publicURL } = this.$config
      const url = `${publicURL}/${attachment.disk_name}`

      window.open(url)
    },
    getAttachmentIcon(attachment) {
      const icons = {
        pptx:
          'https://img.icons8.com/color/48/000000/microsoft-powerpoint-2019--v1.png',
        xlsx:
          'https://img.icons8.com/color/50/000000/microsoft-excel-2019--v1.png',
        docx:
          'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png',
        doc:
          'https://img.icons8.com/color/48/000000/microsoft-word-2019--v2.png',
        pdf: 'https://img.icons8.com/color/50/000000/pdf.png',
      }
      const defaultIcon =
        'https://img.icons8.com/fluency-systems-regular/48/000000/file-download.png'

      const extension = this.getAttachmentExtension(attachment)

      return icons[extension] || defaultIcon
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
    <div v-if="value.length" class="my-2">
      <ul>
        <li
          v-for="(attachment, index) in value"
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

          <div class="flex-shrink-0">
            <custom-icon
              v-if="edit"
              icon="icon-trash"
              class="cursor-pointer"
              @click="removeAttachment(index)"
            />
            <custom-icon
              v-else
              icon="icon-download"
              class="cursor-pointer"
              @click="openAttachment(attachment)"
            />
          </div>
        </li>
      </ul>
    </div>
    <div v-else>There are 0 attachments</div>
    <div v-if="edit" class="flex">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        multiple
        @input="uploadFile($event)"
      />
      <button
        type="button"
        class="inline-flex py-2 px-4 mt-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="selectImage"
      >
        Add attachment
      </button>
    </div>
  </div>
</template>
