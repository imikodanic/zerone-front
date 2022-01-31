<script>
import ProjectSidebar from '@/components/pages/project/project-sidebar/ProjectSidebar'
export default {
  components: { ProjectSidebar },
  layout: 'projectPage',
  async asyncData({ $axios, params }) {
    try {
      const { id } = params

      const { data } = await $axios.get(`/public/projects/${id}`)

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
}
</script>

<template>
  <div class="flex">
    <project-sidebar :pages="pages" />
    <div class="w-full mt-10 lg:ml-72 z-50">
      <div style="max-width: 75vw; width: 100%; margin: auto">
        <h1 class="text-6xl font-light text-center w-full">
          {{ project.title }}
        </h1>
        <div
          class="mx-auto w-28 h-1.5 bg-primary-yellow mt-2 rounded-full"
        ></div>

        <div class="px-5 lg:px-20 mt-5 pb-8">
          <nuxt-child />
        </div>
      </div>
    </div>
  </div>
</template>
