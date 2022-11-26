<script>
import ProjectCard from '@/components/pages/landing-page/featured-section/ProjectCard'
export default {
  name: 'FeaturedSection',
  components: { ProjectCard },
  props: {
    featuredProjects: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div class="mb-32">
    <h2 class="text-6xl text-center font-bold">
      {{ $t('page.index.featured') }}
    </h2>
    <div class="mx-auto w-32 h-3 bg-primary-yellow mt-10 mb-14 rounded-full"></div>
    <div class="flex justify-around flex-wrap">
      <project-card v-for="project in featuredProjects" :key="`project-${project.id}`" :project="project"
        class="mx-5 mb-5" />
    </div>
  </div>
</template>
