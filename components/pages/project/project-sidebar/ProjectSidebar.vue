<script>
import SidebarItem from '@/components/pages/project/project-sidebar/SidebarItem'
import MenuIcon from '~/static/icons/icon-layers.svg?inline'

export default {
  name: 'ProjectSidebar',
  components: { SidebarItem, MenuIcon },
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isMenuOpened: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    },
  },
}
</script>
<template>
  <div
    class="fixed right-0 lg:left-0 z-40"
    :class="isMenuOpened ? 'top-0 left-0' : 'top-52 lg:top-24'"
  >
    <div
      class="hidden lg:flex flex-col justify-center h-full min-h-sidebar w-72 py-2 px-3 flex-shrink-0"
    >
      <sidebar-item
        v-for="page in pages"
        :key="`page-list${page.id}`"
        :page="page"
      />
    </div>
    <div
      class="flex items-center lg:hidden w-10 h-10 bg-primary-purple rounded-l-xl cursor-pointer shadow-lg"
      @click="toggleMenu"
    >
      <menu-icon class="stroke-white text-shadow" />
    </div>
    <div
      v-if="isMenuOpened"
      class="bg-white absolute left-0 w-screen h-screen top-0 flex flex-col justify-between py-5 px-5"
    >
      <div>
        <sidebar-item
          v-for="page in pages"
          :key="`page-list${page.id}`"
          :page="page"
          @close-menu="toggleMenu"
        />
      </div>

      <button
        class="bg-primary-purple text-xl font-bold w-full px-4 py-2 rounded-lg hover:bg-secondary-purple transition-colors"
        @click="toggleMenu"
      >
        <span class="text-shadow text-grayscale-white"> Close </span>
      </button>
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
