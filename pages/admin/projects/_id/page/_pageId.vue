<script>
import Editor from '@tinymce/tinymce-vue'
import SectionType from '~/enums/SectionType'
import Section from '~/classes/admin/Section'

export default {
  components: { Editor },
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
    addTextSection() {
      this.addSection(SectionType.HTML)
    },
    addVideoSection() {
      this.addSection(SectionType.Video)
    },
    async saveContent() {
      // await this.save()
      // return
      const sections = this.sectionsCopy.map(Section.toJSON)
      const { data } = await this.$axios.patch(`admin/pages/${this.value.id}`, {
        ...this.value,
        sections,
      })

      this.$emit('save-page', data.data)
      this.$toast.success('Page successfully edited!')
      // const promise = new Promise((resolve, reject) => {
      //   console.log('sad kao sejva na back')
      //   resolve(
      //     {
      //       ...this.value,
      //       sections: this.sectionsCopy,
      /* vrati nove podatke */
      // )
      // })
      // todo: pripaziti na reaktivnost
      // this.value = await promise
      // this.toggleIsContentEditable(false)
    },
  },
}
</script>

<template>
  <div>
    <t-input id="page-title" v-model="value.title" label="Title" class="mb-3" />
    <t-checkbox
      id="page-visible"
      v-model="value.is_visible"
      label="Is visible"
      class="mb-3"
    />
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
          v-if="section.type === SectionType.HTML"
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
        <input
          v-else-if="section.type === SectionType.Video"
          :key="section.id || section._key"
          v-model="section.value"
          type="text"
          class="block"
        />
      </template>

      <button
        type="button"
        class="bg-white block my-5 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="addTextSection"
      >
        Add Content
      </button>
      <!--      <button type="button" @click="addVideoSection">add video</button>-->

      <button
        class="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        @click="saveContent"
      >
        Save Content
      </button>
      <button
        class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="button"
        @click="toggleIsContentEditable(false)"
      >
        Cancel editing
      </button>
    </template>
    <!--    <div class="mt-5 flex gap-4 justify-end">-->
    <!--      <t-button class="bg-grayscale-gray-light" style="width: 180px !important">-->
    <!--        Cancel-->
    <!--      </t-button>-->
    <!--      <t-button style="width: 150px !important" @click="save">Save</t-button>-->
    <!--    </div>-->
  </div>
</template>
