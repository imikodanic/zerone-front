<script>
// Components
import SectionTypePickerModal from '@/components/admin/project/SectionTypePickerModal'
import SectionText from '@/components/project/sections/SectionText'
import SectionGallery from '@/components/project/sections/SectionGallery'
import SectionVideo from '@/components/project/sections/SectionVideo'
import SectionAttachments from '@/components/project/sections/SectionAttachments'

// Utils
import SectionType from '~/enums/SectionType'
import Section from '~/classes/admin/Section'
import PageService from '~/services/PageService'

export default {
  components: {
    SectionAttachments,
    SectionGallery,
    SectionText,
    SectionTypePickerModal,
    SectionVideo,
  },
  services: { PageService },
  layout: 'project',
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/admin/pages/${params.pageId}`)

    const value = data.data
    return { value }
  },
  data() {
    return {
      value: {},
      SectionType,
      isContentEditable: false,
      sectionsCopy: [],
    }
  },
  computed: {
    sections() {
      const { sections } = this.value
      if (!sections) throw new Error('Sections are not defined!')

      return sections.map((section) => ({
        ...section,
        media_ids: section.media || section.media_ids,
      }))
    },
  },
  created() {
    if (!this.sections.length) this.toggleIsContentEditable(true)
  },
  methods: {
    async save() {
      const { data } = await this.$axios.patch(
        `admin/pages/${this.value.id}`,
        this.value
      )

      this.$emit('save-page', data.data)
      this.$toast.success('Page successfully edited!')
    },
    toggleIsContentEditable(value) {
      this.isContentEditable = value ?? !this.isContentEditable
      if (value) {
        this.createContentCopy()
      }
    },
    createContentCopy() {
      this.sectionsCopy = this.sections.map((section) => new Section(section))
    },
    addSection(type) {
      const newSection = new Section({
        type,
        value: '',
        page_id: this.$route.params.pageId,
      })
      this.sectionsCopy.push(newSection)
    },
    async saveContent() {
      const sections = this.sectionsCopy.map(Section.toJSON)
      const page = await this.$services.page.patch({
        ...this.value,
        sections: sections.map((section, i) => {
          const media_ids = section.media_ids?.map((media) => media.id) || []
          return { ...section, order: i, media_ids }
        }),
      })
      this.$emit('save-page', page)
      this.$toast.success('Page successfully edited!')

      this.value = page
      this.toggleIsContentEditable(false)
    },
    openSectionTypePicker() {
      this.$refs.sectionTypePicker.open()
    },
    removeSection(index) {
      const isConfirmed = confirm(
        'Are you sure you want to delete this section?'
      )

      if (!isConfirmed) return

      this.sectionsCopy.splice(index, 1)
    },
  },
}
</script>
<template>
  <div>
    <div class="mb-3 flex gap-4 justify-end">
      <button
        v-if="!isContentEditable"
        class="bg-primary-purple text-white font-bold px-12 py-2 rounded-full hover:bg-secondary-purple transition-colors w-52"
        @click="toggleIsContentEditable(true)"
      >
        Edit
      </button>
      <template v-else>
        <button
          class="bg-grayscale-gray-light w-52 font-bold px-12 py-2 rounded-full hover:bg-gray-400 text-white transition-colors"
          @click="toggleIsContentEditable(false)"
        >
          Cancel
        </button>
        <button
          class="bg-primary-purple text-white font-bold px-12 py-2 rounded-full hover:bg-secondary-purple transition-colors w-52"
          @click="saveContent"
        >
          Save
        </button>
      </template>
    </div>
    <template v-if="!isContentEditable">
      <template v-for="section in sections">
        <section-text
          v-if="section.type === SectionType.Text"
          :key="section.id || section._key"
          v-model="section.value"
        />
        <section-gallery
          v-if="section.type === SectionType.Gallery"
          :key="section.id || section._key"
          v-model="section.media_ids"
        />
        <section-video
          v-if="section.type === SectionType.Video"
          :key="section.id || section._key"
          v-model="section.value"
        />
        <section-attachments
          v-if="section.type === SectionType.Attachment"
          :key="section.id || section._key"
          v-model="section.media_ids"
        />
        <hr :key="`separator-${section.id || section._key}`" class="my-5" />
      </template>
    </template>
    <template v-else>
      <div
        v-for="(section, index) in sectionsCopy"
        :key="`section-${section.id || section._key}`"
        class="relative"
      >
        <SectionText
          v-if="section.type === SectionType.Text"
          v-model="section.value"
          edit
        />
        <section-gallery
          v-if="section.type === SectionType.Gallery"
          v-model="section.media_ids"
          edit
        />
        <section-video
          v-if="section.type === SectionType.Video"
          v-model="section.value"
          edit
        />
        <section-attachments
          v-if="section.type === SectionType.Attachment"
          :key="section.id || section._key"
          v-model="section.media_ids"
          edit
        />
        <div class="absolute -right-10 top-0">
          <custom-icon
            icon="icon-x"
            class="w-12 h-12 cursor-pointer"
            @click.native="removeSection(index)"
          />
        </div>
        <hr :key="`separator-${section.id || section._key}`" class="my-5" />
      </div>

      <div class="flex justify-center my-4">
        <button
          type="button"
          class="border border-gray-300 rounded-md shadow-sm w-40 h-40 flex justify-center items-center hover:bg-gray-100 transition-colors ease-in"
          @click="openSectionTypePicker"
        >
          <custom-icon icon="icon-plus" class="w-24 h-24" />
        </button>
        <section-type-picker-modal
          ref="sectionTypePicker"
          @add-section="addSection"
        />
      </div>
    </template>
  </div>
</template>
