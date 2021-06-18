<script>
import ProjectPreviewCard from '@/components/pages/projects/ProjectPreviewCard'
export default {
  components: { ProjectPreviewCard },
  async asyncData({ $axios, params: { slug } }) {
    try {
      const { data } = await $axios.$get(`/public/project-groups/${slug}`)

      return { projectGroup: data }
    } catch {}
  },
  data() {
    return {
      projectGroup: {},
    }
  },
}
</script>

<template>
  <div class="projects-container">
    <h1 class="text-4xl font-bold mt-14">
      {{ projectGroup.title }}
    </h1>
    <p class="text-2xl mt-4">
      These are all projects in the group
      <span class="text-primary-purple font-bold">
        {{ projectGroup.title }}</span
      >.
    </p>

    <div
      class="mt-9 flex flex-col items-center flex-wrap gap-10 md:flex-row md:px-16"
    >
      <project-preview-card
        v-for="project in projectGroup.projects"
        :key="`project-${project.id}`"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  background-image: url('~/static/pages/projects/bg-wiggle.svg');
  @apply bg-no-repeat;
  @apply bg-contain;
  @apply bg-center;

  @apply px-5 lg:px-28;
}
</style>
