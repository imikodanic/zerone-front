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
    return { project }
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

      structuredPages.sort((a, b) => {
        return a.order - b.order
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
        order: this.project.pages.length,
      })
      await this.refreshProject()

      this.$router.push(`/admin/projects/${this.project.id}/page/${data.id}`)
    },
    addPage(e) {
      const index = this.project.pages.findIndex(
        (page) => page.id === e.eventData.element.id
      )
      const parent = this.project.pages.find((page) => page.id === e.toPageId)
      this.project.pages.splice(index, 1, {
        ...this.project.pages[index],
        parent,
        order: e.eventData.newIndex,
      })
    },
    removePage(e) {
      // console.log(e)
    },
    movePage(e) {
      const {
        inPageId,
        eventData: { newIndex, oldIndex },
      } = e
      const affectedPages = [
        ...this.project.pages
          .filter((page) => (page.parent?.id || 0) === inPageId)
          .sort((a, b) => a.order - b.order),
      ]
      const pageToMove = affectedPages[oldIndex]
      affectedPages.splice(oldIndex, 1, affectedPages[newIndex])
      affectedPages.splice(newIndex, 1, pageToMove)
      const withOrders = affectedPages.map((page, i) => ({ ...page, order: i }))
      withOrders.forEach((page) => {
        const index = this.project.pages.findIndex((p) => p.id === page.id)
        this.project.pages.splice(index, 1, page)
      })
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
      @add-page="addPage"
      @remove-page="removePage"
      @move-page="movePage"
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
