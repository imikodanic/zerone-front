<script>
import Editor from '@tinymce/tinymce-vue'
import SectionTypePickerModal from '@/components/admin/project/SectionTypePickerModal'
import SectionType from '~/enums/SectionType'
import Section from '~/classes/admin/Section'
import PageService from '~/services/PageService'

export default {
  components: { SectionTypePickerModal, Editor },
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
      return sections
    },
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
        sections: sections.map((section, i) => ({ ...section, order: i })),
      })
      this.$emit('save-page', page)
      this.$toast.success('Page successfully edited!')

      this.value = page
      this.toggleIsContentEditable(false)
    },
    openSectionTypePicker() {
      this.$refs.sectionTypePicker.open()
    },
  },
}
</script>

<template>
  <div>
    <t-input id="page-title" v-model="value.title" label="Title" class="mb-3" />
    <!--    <t-checkbox-->
    <!--      id="page-visible"-->
    <!--      v-model="value.is_visible"-->
    <!--      label="Is visible"-->
    <!--      class="mb-3"-->
    <!--    />-->
    <template v-if="!isContentEditable">
      <button
        class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        @click="toggleIsContentEditable(true)"
      >
        Edit content
      </button>
      <template v-for="section in sections">
        <div :key="section.id || section._key" v-html="section.value"></div>
      </template>
    </template>
    <template v-else>
      <button
        v-if="sections.length > 2"
        type="button"
        class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="saveContent"
      >
        Save content
      </button>

      <template v-for="section in sectionsCopy">
        <editor
          v-if="section.type === SectionType.Text"
          :key="section.id || section._key"
          v-model="section.value"
          api-key="0np66yimd22albamx81hzgkh901xgap5cagf3iytsid7qpsp"
          :init="{
            height: '60vh',
            selector: 'textarea',
            plugins:
              'link casechange formatpainter linkchecker image autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinymcespellchecker',
            toolbar:
              'undo redo | formatselect | bold italic backcolor | \
                     alignleft aligncenter alignright alignjustify | \
                     bullist numlist outdent indent | removeformat | help',
            toolbar_mode: 'floating',
          }"
        />
      </template>

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

      <!--      <button type="button" @click="addVideoSection">add video</button>-->

      <!--      <button-->
      <!--        class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"-->
      <!--        type="button"-->
      <!--        @click="saveContent"-->
      <!--      >-->
      <!--        Save Content-->
      <!--      </button>-->
      <!--      <button-->
      <!--        class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"-->
      <!--        type="button"-->
      <!--        @click="toggleIsContentEditable(false)"-->
      <!--      >-->
      <!--        Cancel editing-->
      <!--      </button>-->
      <div class="mt-5 flex gap-4 justify-end">
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
      </div>
    </template>
  </div>
</template>
