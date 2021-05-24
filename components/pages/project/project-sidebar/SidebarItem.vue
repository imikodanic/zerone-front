<template>
  <div class="px-5 py-1">
    <div v-if="!Object(page.pages).length">
      <nuxt-link :to="pagePath" class="text-lg font-medium group">
        <span
          class="w-4 h-4 inline-block rounded-full border-3 border-primary-purple group-hover:bg-white"
          :class="{
            'bg-white': isActive,
            'bg-primary-purple': !isActive,
          }"
        ></span>

        {{ page.title }}
      </nuxt-link>
    </div>
    <div v-else>
      <div
        class="relative w-3 h-3 ml-0.5 inline-block cursor-pointer"
        @click="toggleExpand"
      >
        <div
          class="w-4 h-1 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          :class="isActive ? 'bg-primary-yellow' : 'bg-primary-purple'"
        ></div>
        <div
          v-if="!isExpanded"
          class="w-1 h-4 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          :class="isActive ? 'bg-primary-yellow' : 'bg-primary-purple'"
        ></div>
      </div>
      <nuxt-link :to="pagePath" class="text-lg font-medium ml-1">
        {{ page.title }}
      </nuxt-link>
      <div
        class="transition-all overflow-y-hidden h-full duration-500"
        :class="{
          'max-h-0': !isExpanded,
          'max-h-screen': isExpanded,
        }"
      >
        <sidebar-item
          v-for="subPage in page.pages"
          :key="`page-${subPage.id}`"
          :page="subPage"
          class="ml-2"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    page: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isExpanded: true,
    }
  },
  computed: {
    pagePath() {
      const { slug, id } = this.$route.params
      return `/project/${slug}/${id}/page/${this.page.id}`
    },
    isActive() {
      return this.page.id === Number(this.$route.params.pageId)
    },
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
  },
}
</script>
