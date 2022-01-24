<script>
import Carousel from '@/components/UI/Carousel'
export default {
  name: 'SectionGallery',
  components: { Carousel },
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
  computed: {
    slides() {
      return this.value.map(
        (media) => `http://localhost:1337/${media.disk_name}`
      )
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

      console.log(event)

      try {
        const files = Array.from(event.target.files)
        const fileRequests = files.map((file) => uploadFile(file))
        const uploadedFiles = await Promise.all(fileRequests)

        const uploadedData = uploadedFiles.map((file) => file.data)

        this.$emit('input', [...this.value, ...uploadedData])
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<template>
  <div>
    <client-only>
      <carousel :slides="slides" />
    </client-only>
    <div v-if="edit" class="flex justify-center">
      <input
        ref="fileInput"
        type="file"
        class="hidden"
        multiple
        accept=".gif,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.png"
        @input="uploadFile($event)"
      />
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 mt-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="selectImage"
      >
        Add image
      </button>
    </div>
  </div>
</template>
