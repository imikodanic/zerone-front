<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar,
  },
}
</script>

<template>
  <div class="default-layout">
    <navbar />
    <div class="pt-20 lg:pt-24">
      <Nuxt />
    </div>
  </div>
</template>
