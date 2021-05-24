<script>
import SidebarItem from '@/components/pages/project/project-sidebar/SidebarItem'
export default {
  name: 'ProjectSidebar',
  components: { SidebarItem },
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
<template>
  <div class="fixed">
    <div
      class="min-h-sidebar flex flex-col justify-center h-full w-72 py-2 px-3 flex-shrink-0"
    >
      <sidebar-item
        v-for="page in pages"
        :key="`page-list${page.id}`"
        :page="page"
      />
    </div>
  </div>
</template>

<style scoped>
.min-h-sidebar {
  min-height: calc(100vh - 96px);
}

@media screen and (max-width: 1024px) {
  .min-h-sidebar {
    min-height: calc(100vh - 80px);
  }
}
</style>
