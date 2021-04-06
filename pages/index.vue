<template>
  <div class="px-5 lg:px-32">
    <introduction-section />
    <featured-section />
  </div>
</template>

<script>
import IntroductionSection from '@/components/landing-page/introduction-section/IntroductionSection'
import FeaturedSection from '@/components/landing-page/featured-section/FeaturedSection'
export default {
  components: { IntroductionSection, FeaturedSection },
}
</script>

<style scoped></style>
