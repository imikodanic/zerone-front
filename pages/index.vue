<script>
// import IntroductionSection from '@/components/pages/landing-page/introduction-section/IntroductionSection'
import FeaturedSection from '@/components/pages/landing-page/featured-section/FeaturedSection'
import GroupsSection from '@/components/pages/landing-page/groups-section/GroupsSection'
export default {
  components: {
    // IntroductionSection,
    FeaturedSection,
    GroupsSection,
  },
  async asyncData({ $axios }) {
    try {
      const requests = [
        $axios.$get('/public/project-groups', {
          // get 4 latest updated project groups
          params: { limit: 4, orderBy: 'updated_at', order: 'desc' },
        }),
        $axios.$get('public/projects', { params: { is_featured: true } }),
      ]

      const [groups, featuredProjects] = await Promise.all(requests)

      return {
        projectGroups: groups.data.data,
        featuredProjects: featuredProjects.data.data,
      }
    } catch {}
  },
  data() {
    return {
      projectGroups: [],
      featuredProjects: [],
    }
  },
}
</script>

<template>
  <div class="px-5 lg:px-32 landing-page ml">
    <!-- <introduction-section /> -->
    <featured-section :featured-projects="featuredProjects" />
    <groups-section :project-groups="projectGroups" />
  </div>
</template>

<style scoped>
.landing-page {
  @apply bg-contain;
  @apply bg-no-repeat;
}
.ml{
  margin-left:25%;
}

</style>
