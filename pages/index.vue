<template>
  <div class="px-5 lg:px-32">
    <introduction-section />
    <featured-section />
    <groups-section />
    <default-footer />
  </div>
</template>

<script>
import IntroductionSection from '@/components/pages/landing-page/introduction-section/IntroductionSection'
import FeaturedSection from '@/components/pages/landing-page/featured-section/FeaturedSection'
import GroupsSection from '@/components/pages/landing-page/groups-section/GroupsSection'
import DefaultFooter from '@/components/Footer'
export default {
  components: {
    IntroductionSection,
    FeaturedSection,
    GroupsSection,
    DefaultFooter,
  },
}
</script>
