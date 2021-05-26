<script>
import ProjectGroupSection from '@/components/pages/projects/ProjectGroupSection'
export default {
  components: { ProjectGroupSection },
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.$get('/public/project-groups')

      return { projectGroups: data.data }
    } catch {}
  },
  data() {
    return {
      projectGroups: [],
    }
  },
  computed: {
    filteredGroups() {
      return this.projectGroups.filter((group) => group.projects.length)
    },
  },
}
</script>

<template>
  <div class="projects-container">
    <h1 class="text-4xl font-bold mt-14">All projects</h1>
    <p class="text-2xl mt-4">
      These are all projects in our database from which you can get
      <span class="text-primary-purple font-bold">all the information</span>.
    </p>
    <project-group-section
      v-for="projectGroup in filteredGroups"
      :key="`project-group-${projectGroup.id}`"
      :project-group="projectGroup"
      class="mt-20"
    />
  </div>
</template>

<style scoped>
.projects-container {
  background-image: url('~/static/pages/projects/bg-wiggle.svg');
  @apply bg-no-repeat;
  @apply bg-center;
  @apply bg-contain;
  @apply px-5 lg:px-28;
}
</style>
