<script>
import Sidebar from '@/components/admin/layout/Sidebar'

export default {
  components: { Sidebar },
  middleware: 'checkAdmin',
}
</script>

<template>
  <div>
    <div class="flex">
      <sidebar class="flex-shrink-0 flex-grow-0" />
      <Nuxt class="flex-grow px-10 pt-20" />
    </div>
  </div>
</template>
