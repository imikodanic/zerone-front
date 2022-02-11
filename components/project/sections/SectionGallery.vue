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
      return this.value.map((media) => this.$getImage(media.disk_name))
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
    removeImage(index) {
      const isConfirmed = confirm('Are you sure you want to remove this image?')

      if (!isConfirmed) return

      const newValue = [...this.value]
      newValue.splice(index, 1)

      this.$emit('input', newValue)
    },
  },
}
</script>

<template>
  <div>
    <client-only>
      <carousel :slides="slides">
        <template #slide="{ slide, index }">
          <div
            class="relative flex justify-center items-center group"
            :class="{ 'pointer-events-none': !edit }"
            @click="removeImage(index)"
          >
            <img
              :src="slide"
              :alt="`Gallery slide ${index}`"
              class="w-full group-hover:opacity-60"
            />

            <custom-icon
              icon="icon-x"
              class="w-20 h-20 absolute opacity-0 group-hover:opacity-100"
            />
          </div>
        </template>
      </carousel>
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
