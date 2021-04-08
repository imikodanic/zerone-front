<script>
import ProjectPreviewCard from '@/components/pages/projects/ProjectPreviewCard'
export default {
  components: { ProjectPreviewCard },
  data() {
    return {
      groups: [
        {
          id: 'group1',
          title: 'ETwinning Erasmus + Projects',
          projects: [
            {
              title: 'Healthier together',
              image: 'asd',
              published_on: 'May 1st, 2021.',
            },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <div class="projects-container">
    <div v-for="group in groups" :key="`group-${group.id}`">
      <h1 class="text-3xl font-bold">{{ group.title }}</h1>
      <div>
        <project-preview-card
          v-for="project in group.projects"
          :key="`group-${group.id}-project-${project.id}`"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  background-image: url('~/static/pages/projects/bg-dots.svg');
  @apply bg-no-repeat;
  @apply bg-contain;

  @apply px-5 lg:px-32;
}
</style>
