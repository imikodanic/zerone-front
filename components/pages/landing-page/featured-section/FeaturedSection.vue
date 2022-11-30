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
    <div>
    <!-- <h2 class="text-6xl text-center font-bold">
      {{ $t('page.index.featured') }}
    </h2>  -->
    <div class="flex justify-around flex-wrap">
      <project-card v-for="project in featuredProjects" :key="`project-${project.id}`" :project="project"
        class="mx-5 mb-5" />
    </div>
  </div>
</template>
