<script>
import Navbar from '@/components/layout/Navbar'
import DefaultFooter from '@/components/layout/Footer'

export default {
  components: {
    Navbar,
    DefaultFooter,
  },
}
</script>

<template>
  <div class="default-layout">
    <navbar />
    <div class="pt-20 lg:pt-24">
      <Nuxt class="min-h-page" />
      <default-footer />
    </div>
  </div>
</template>

<style scoped>
.min-h-page {
  min-height: calc(100vh - 344px - 96px);
}

@media screen and (max-width: 1024px) {
  .min-h-page {
    min-height: calc(100vh - 328px - 96px);
  }
}

@media screen and (max-width: 640px) {
  .min-h-page {
    min-height: calc(100vh - 464px - 80px);
  }
}
</style>
