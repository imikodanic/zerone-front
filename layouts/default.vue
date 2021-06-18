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
  min-height: calc(100vh - 288px - 96px);
}

@media screen and (max-width: 1024px) {
  .min-h-page {
    min-height: calc(100vh - 288px - 80px);
  }
}

@media screen and (max-width: 640px) {
  .min-h-page {
    min-height: calc(100vh - 408px - 80px);
  }
}
</style>
