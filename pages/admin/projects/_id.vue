<script>
import ProjectSidebarAdmin from '@/components/admin/project/ProjectSidebarAdmin'
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

      if (!pages) return []

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
    <project-sidebar-admin :pages="pages" @refresh-project="refreshProject" />
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
