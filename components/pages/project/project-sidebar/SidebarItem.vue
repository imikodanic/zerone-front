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
    pages() {
      return this.page.pages || []
    },
    pagePath() {
      const { slug, id } = this.$route.params
      return `/project/${slug}/${id}/page/${this.page.id}`
    },
    isActive() {
      const { pageId } = this.$route.params
      const isPageSelected = this.page.id === Number(pageId)
      const isSubpageSelected = this.pages.some(
        (page) => page.id === Number(pageId)
      )

      return isPageSelected || isSubpageSelected
    },
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
    },
    closeMenu() {
      this.$emit('close-menu')
    },
  },
}
</script>

<template>
  <div class="px-5 py-1 truncate">
    <locale-link
      v-if="!pages.length"
      :to="pagePath"
      class="text-xl sm:text-lg font-medium group"
      @click.native="closeMenu"
    >
      <span
        class="w-4 h-4 inline-block rounded-full border-3 border-primary-purple group-hover:bg-white"
        :class="{
          'bg-white': isActive,
          'bg-primary-purple': !isActive,
        }"
      ></span>

      {{ page.title }}
    </locale-link>

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
      <locale-link
        :to="pagePath"
        class="text-xl sm:text-lg font-medium ml-1"
        @click.native="closeMenu"
      >
        {{ page.title }}
      </locale-link>
      <!--
      This style max-height is here because of clean height transition
      See more: Technique 1: https://css-tricks.com/using-css-transitions-auto-dimensions/
       -->
      <div
        class="overflow-y-hidden h-full transition-all duration-500"
        :class="{
          'max-h-0': !isExpanded,
        }"
        :style="isExpanded && `max-height: ${36 * pages.length}px`"
      >
        <sidebar-item
          v-for="subPage in pages"
          :key="`page-${subPage.id}`"
          :page="subPage"
          class="ml-2"
          @close-menu="closeMenu"
        />
      </div>
    </div>
  </div>
</template>
