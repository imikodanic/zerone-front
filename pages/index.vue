<template>
  <div class="px-5 lg:px-32">
    <introduction-section />
    <featured-section />
    <groups-section />
  </div>
</template>

<script>
import IntroductionSection from '@/components/landing-page/introduction-section/IntroductionSection'
import FeaturedSection from '@/components/landing-page/featured-section/FeaturedSection'
import GroupsSection from '@/components/landing-page/groups-section/GroupsSection'

export default {
  components: { IntroductionSection, FeaturedSection, GroupsSection },
}
</script>
