<script>
import Page from '~/classes/admin/Page'
import ProjectSidebarDraggable from '~/components/admin/project/ProjectSidebarDraggable'

export default {
  name: 'ProjectSidebar',
  components: { ProjectSidebarDraggable },
  props: {
    pages: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isMenuOpened: false,
      newPageTitle: '',
      isNewPageEditActive: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpened = !this.isMenuOpened
    },
    refreshProject() {
      this.$emit('refresh-project')
    },
    newPage() {
      this.$router.push(`/admin/projects/${this.$route.params.id}/page/create`)
    },
    openNewPageEdit() {
      this.newPageTitle = ''
      this.isNewPageEditActive = true
    },
    submitNewPage() {
      if (this.newPageTitle) {
        const newPage = new Page({
          project_id: this.$route.params.id,
          title: this.newPageTitle,
        })
        this.$emit('create-page', newPage)
      }

      this.isNewPageEditActive = false
    },
  },
}
</script>
<template>
  <div class="fixed right-0 lg:left-0 z-40" :class="'top-52 lg:top-24'">
    <div
      class="hidden lg:flex flex-col justify-center h-full min-h-sidebar w-72 py-2 px-3 flex-shrink-0"
    >
      <project-sidebar-draggable
        :pages="pages"
        @add-page="$emit('add-page', $event)"
        @remove-page="$emit('remove-page', $event)"
        @move-page="$emit('move-page', $event)"
        @refresh-project="refreshProject"
      />
      <div class="flex items-center">
        <t-input
          v-show="isNewPageEditActive"
          id="=new-page-title"
          v-model="newPageTitle"
          type="text"
          dense
          hide-validator
          class="flex-1 min-w-0"
        />
        <custom-icon
          v-show="isNewPageEditActive"
          icon="icon-check"
          class="w-7 h-7 cursor-pointer"
          @click.native="submitNewPage"
        />
      </div>
      <button
        class="bg-primary-purple whitespace-nowrap mt-3 px-5 py-1 text-white rounded-full font-semibold block"
        @click="openNewPageEdit"
      >
        Add new page
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
