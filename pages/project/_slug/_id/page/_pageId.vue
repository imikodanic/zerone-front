<script>
// Components
import SectionText from '@/components/project/sections/SectionText'
import SectionGallery from '@/components/project/sections/SectionGallery'
import SectionVideo from '@/components/project/sections/SectionVideo'
import SectionAttachments from '@/components/project/sections/SectionAttachments'

// Enums
import SectionType from '@/enums/SectionType'

export default {
  components: { SectionAttachments, SectionGallery, SectionText, SectionVideo },
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/public/pages/${params.pageId}`)

    const page = data.data
    return { page }
  },
  data() {
    return { page: {}, SectionType }
  },

  computed: {
    sections() {
      const { sections } = this.page
      if (!sections) return []

      return sections.map((section) => ({
        ...section,
        media_ids: section.media || section.media_ids,
      }))
    },
  },
}
</script>

<template>
  <div>
    <h2 class="text-4xl mb-10">
      {{ page.title }}
    </h2>
    <div class="word-break">
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
    </div>
  </div>
</template>
