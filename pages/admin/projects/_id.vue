<script>
import ProjectSidebarAdmin from '@/components/admin/project/ProjectSidebarAdmin'
import ProjectService from '~/services/ProjectService'
export default {
  components: { ProjectSidebarAdmin },
  services: { ProjectService },
  layout: 'project',
  async asyncData({ $axios, params, error }) {
    const projectService = ProjectService.use({ $axios })
    const project = await projectService.get(params.id)
    if (project.hasErrored) return error(project)
    return project
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

      this.project = await this.$services.project.get(id)
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
