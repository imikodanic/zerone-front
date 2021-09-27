<script>
import ProjectSidebarAdmin from '@/components/admin/project/ProjectSidebarAdmin'
import SectionType from '~/enums/SectionType'
export default {
  components: { ProjectSidebarAdmin },
  layout: 'project',
  async asyncData({ $axios, params }) {
    try {
      const { id } = params

      const { data } = await $axios.get(`/admin/projects/${id}`)

      const project = data.data

      return { project }
    } catch {}
  },
  data() {
    return {
      project: {},
    }
  },
  computed: {
    pages() {
      const { pages } = this.project

      if (!pages)
        return [
          {
            id: 2,
            resourceType: 'page',
            title: 'blesavi pagee',
            is_visible: 1,
            is_public: 0,
            created_at: 1632755772000,
            updated_at: 1632755772000,
            project: {
              id: 2,
              resourceType: 'project',
              title: 'Ivan projekt test v1',
              description: 'Ovo Ivan testira kreiranje projekta na backu',
              is_visible: 1,
              project_group_id: 1,
              image: null,
              created_at: 1632754941000,
              updated_at: 1632754941000,
            },
            parent: null,
            sections: [
              {
                id: 3,
                type: SectionType.HTML,
                value: '<h1> Ivan test sectiooon</h1>',
                order: 1,
                page_id: 2,
                created_at: 1632756004000,
                updated_at: 1632756004000,
              },
              {
                id: 4,
                type: SectionType.Video,
                value:
                  '<iframe width="560" height="315" src="https://www.youtube.com/embed/Wv-1z71umlI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
                order: 1,
                page_id: 2,
                created_at: 1632756004000,
                updated_at: 1632756004000,
              },
            ],
          },
        ]

      // first add only parents with empty child page array
      const structuredPages = pages
        .filter((page) => !page.parent)
        .map((page) => {
          return { ...page, pages: [] }
        })

      // add each child to his parent
      pages.forEach((page) => {
        if (!page.parent) return

        const parent = structuredPages.find(
          (parent) => parent.id === page.parent.id
        )

        if (!parent) structuredPages.push(page)
        else parent.pages.push(page)
      })

      return structuredPages
    },
  },
  methods: {
    async refreshProject() {
      const { id } = this.$route.params

      const { data } = await this.$axios.get(`/admin/projects/${id}`)

      this.project = data.data
    },
    async createPage(value) {
      const { data } = await this.$axios.$post('/admin/pages', {
        ...value,
        project_id: this.project.id,
      })
      await this.refreshProject()

      this.$router.push(`/admin/projects/${this.project.id}/page/${data.id}`)
    },
  },
}
</script>

<template>
  <div class="flex">
    <project-sidebar-admin
      :pages="pages"
      @refresh-project="refreshProject"
      @create-page="createPage"
    />
    <div class="w-full mt-10 lg:ml-72 z-50">
      <h1 class="text-6xl font-light text-center w-full">
        {{ project.title }}
      </h1>
      <div class="mx-auto w-28 h-1.5 bg-primary-yellow mt-2 rounded-full"></div>

      <div class="px-5 lg:px-20 mt-5 pb-8">
        <nuxt-child @create-page="createPage" />
      </div>
    </div>
  </div>
</template>
