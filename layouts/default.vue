<script>
import Navbar from '@/components/Navbar'
import DefaultFooter from '@/components/Footer'

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
      <Nuxt />
      <default-footer />
    </div>
  </div>
</template>
