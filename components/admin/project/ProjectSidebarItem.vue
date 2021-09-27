<script>
export default {
  name: 'ProjectSidebarItem',
  props: {
    page: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isExpanded: true,
      editingPageTitleId: 0,
      editingPageTitle: '',
      newPageTitle: '',
      isNewPageEditActive: false,
    }
  },
  computed: {
    pages() {
      return this.page.pages || []
    },
    pagePath() {
      const { id } = this.$route.params
      return `/admin/projects/${id}/page/${this.page.id}`
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
    deletePage() {
      const isConfirmed = confirm('Are you sure you want to delete this item?')

      if (!isConfirmed) return

      try {
        // await this.$axios.delete(`/admin/pages/${this.page.id}`)

        this.refreshProject()
      } catch {}
    },
    refreshProject() {
      console.log('refreshalo se')
      this.$emit('refresh-project')
    },
    newPage() {
      const { id } = this.$route.params
      this.$router.push(
        `/admin/projects/${id}/page/create?parent_id=${this.page.id}`
      )
    },
    setEditingPageTitle(page) {
      this.editingPageTitleId = page.id
      this.editingPageTitle = page.title
    },
    saveEditingPageTitle() {
      console.log(
        'sejvaj',
        this.editingPageTitle,
        'na',
        this.editingPageTitleId
      )
      this.editingPageTitleId = 0
      this.editingPageTitle = ''
    },
    openNewPageEdit() {
      this.newPageTitle = ''
      this.isNewPageEditActive = true
    },
    saveNewPage() {
      this.$emit('submit-new-page', this.newPageTitle)
      this.isNewPageEditActive = false
    },
  },
}
</script>

<template>
  <div class="px-5 py-1 truncate">
    <div
      v-if="!pages.length"
      class="inline-flex gap-2 items-center group w-full"
    >
      <span
        class="w-4 h-4 inline-block rounded-full border-3 border-primary-purple group-hover:bg-white"
        :class="{
          'bg-white': isActive,
          'bg-primary-purple': !isActive,
        }"
        @click="closeMenu"
      ></span>
      <input
        v-show="editingPageTitleId === page.id"
        v-model="editingPageTitle"
        type="text"
        class="flex-1 min-w-0"
      />
      <custom-icon
        v-show="editingPageTitleId === page.id"
        icon="icon-check"
        class="w-7 h-7 cursor-pointer"
        @click.native="saveEditingPageTitle(page)"
      />
      <nuxt-link v-show="editingPageTitleId !== page.id" :to="pagePath">{{
        page.title
      }}</nuxt-link>
      <custom-icon
        v-show="editingPageTitleId !== page.id"
        icon="icon-edit"
        class="w-7 h-7 cursor-pointer"
        @click.native="setEditingPageTitle(page)"
      />
      <custom-icon
        v-show="editingPageTitleId !== page.id"
        icon="icon-x"
        class="w-7 h-7 cursor-pointer"
        @click.native="deletePage"
      />
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
      <div class="inline-flex gap-2 items-center">
        <nuxt-link
          :to="pagePath"
          class="text-xl sm:text-lg font-medium ml-1"
          @click.native="closeMenu"
        >
          {{ page.title }}
        </nuxt-link>
        <custom-icon
          icon="icon-x"
          class="w-7 h-7 cursor-pointer"
          @click.native="deletePage"
        />
      </div>

      <!--
      This style max-height is here because of clean height transition
      See more: Technique 1: https://css-tricks.com/using-css-transitions-auto-dimensions/
       -->
      <div
        class="overflow-y-hidden h-full transition-all duration-500"
        :class="{
          'max-h-0': !isExpanded,
        }"
        :style="isExpanded && `max-height: ${36 * pages.length + 40}px`"
      >
        <project-sidebar-item
          v-for="subPage in pages"
          :key="`page-${subPage.id}`"
          :page="subPage"
          class="ml-2"
          @close-menu="closeMenu"
          @refresh-project="$emit('refresh-project')"
        />
        <!--        <button-->
        <!--          class="bg-primary-purple px-5 py-1 text-white rounded-full font-semibold w-20 mx-auto block"-->
        <!--          @click="newPage"-->
        <!--        >-->
        <!--          New-->
        <!--        </button>-->
        <input
          v-show="isNewPageEditActive"
          v-model="newPageTitle"
          type="text"
          class="flex-1 min-w-0"
        />
        <custom-icon
          v-show="isNewPageEditActive"
          icon="icon-check"
          class="w-7 h-7 cursor-pointer"
          @click.native="saveNewPage"
        />
        <button
          class="bg-primary-purple px-5 py-1 text-white rounded-full font-semibold w-20 mx-auto block"
          @click="openNewPageEdit"
        >
          Add new page
        </button>
      </div>
    </div>
  </div>
</template>
