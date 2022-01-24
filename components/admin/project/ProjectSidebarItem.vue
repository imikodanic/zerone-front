<script>
import PageService from '~/services/PageService'
import Page from '~/classes/admin/Page'
export default {
  name: 'ProjectSidebarItem',
  services: { PageService },
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
    async deletePage() {
      const isConfirmed = confirm('Are you sure you want to delete this item?')

      if (!isConfirmed) return

      try {
        await this.$axios.delete(`/admin/pages/${this.page.id}`)

        await this.$router.push(`/admin/projects/${this.$route.params.id}`)
        this.$router.go(0)
        this.refreshProject()
      } catch {}
    },
    refreshProject() {
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
    async saveEditingPageTitle() {
      const patchedPage = new Page({
        ...this.page,
        title: this.editingPageTitle,
        project_id: this.$route.params.id,
      })

      delete patchedPage.sections

      const page = await this.$services.page.patch(patchedPage)
      // eslint-disable-next-line vue/no-mutating-props
      this.page.title = page.title
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
    <div class="inline-flex gap-2 items-center group w-full">
      <span
        class="w-4 h-4 inline-block rounded-full border-3 border-primary-purple bg-primary-purple"
      ></span>
      <t-input
        v-show="editingPageTitleId === page.id"
        id="page-name"
        v-model="editingPageTitle"
        type="text"
        dense
        hide-validator
        class="flex-1 min-w-0"
      />
      <custom-icon
        v-show="editingPageTitleId === page.id"
        icon="icon-check"
        class="w-7 h-7 cursor-pointer"
        @click.native="saveEditingPageTitle(page)"
      />
      <locale-link
        v-show="editingPageTitleId !== page.id"
        :to="pagePath"
        class="flex-1"
        >{{ page.title }}</locale-link
      >
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
  </div>
</template>
