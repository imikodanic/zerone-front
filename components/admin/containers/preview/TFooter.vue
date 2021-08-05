<script>
export default {
  name: 'TFooter',
  props: {
    value: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      perPageOptions: [10, 30, 50 /* 100 */],
    }
  },
  computed: {
    itemsOnPageLabel() {
      const { currentPage, perPage, total } = this.value
      if (!currentPage) return null

      const rangeFrom = (currentPage - 1) * perPage + 1
      const rangeTo = perPage * currentPage

      return `${rangeFrom}-${rangeTo > total ? total : rangeTo} of ${total}`
    },
  },
  methods: {
    switchPage(pageOrSlug) {
      const { lastPage, currentPage } = this.value

      const slugMapping = {
        first: 1,
        last: lastPage,
        previous: currentPage - 1,
        next: currentPage + 1,
      }

      const page =
        typeof pageOrSlug === 'number' ? pageOrSlug : slugMapping[pageOrSlug]

      if (page < 1 || page > lastPage || !page || page === currentPage) return

      const pagination = { ...this.value, currentPage: page }
      this.$emit('input', pagination)
    },
    changePerPage(perPage) {
      const { currentPage, total, perPage: oldPerPage } = this.value
      const pagination = { ...this.value, perPage }

      if (oldPerPage === perPage) return

      // Stay in the same stop when user changes items per page
      // E.g. if you're on page 3 for 15 items per page, and you switch to 30, it should take you to page 2.
      const newPage = Math.ceil((oldPerPage * currentPage) / perPage)

      // If range from is bigger than total just switch to what would be the last page and the user should be in the same spot...
      // E.g. if you're on the last page for 10 per page and you switch to 50 per page, item from would be a lot bigger than the total number
      const rangeFrom = (newPage - 1) * perPage + 1
      if (rangeFrom > total) pagination.currentPage = Math.ceil(total / perPage)
      else pagination.currentPage = newPage

      this.$emit('input', pagination)
    },
  },
}
</script>

<template>
  <div
    class="flex flex-wrap justify-end items-center bg-white border-t py-2 px-4 space-y-2 space-x-10 md:space-y-0 text-sm"
  >
    <div class="mr-auto self-end">
      Rows per page
      <t-dropdown id="items-per-page-dropdown">
        <template #activator="{ on }">
          <button
            id="options-menu"
            type="button"
            class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
            aria-haspopup="true"
            aria-expanded="true"
            v-on="on"
          >
            <span class="self-center"> {{ value.perPage || 0 }} </span>
            <custom-icon icon="icon-chevron-down" class="w-6 h-6" />
          </button>
        </template>
        <template #menu>
          <div
            class="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <a
              v-for="perPage in perPageOptions"
              :key="`per-page-${perPage}`"
              href="#"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              @click="changePerPage(perPage)"
            >
              {{ perPage }}
            </a>
          </div>
        </template>
      </t-dropdown>
    </div>
    <div class="self-center">{{ itemsOnPageLabel }}</div>
    <div class="self-center">
      <custom-icon
        icon="icon-chevrons-left"
        class="inline fill cursor-pointer w-7 h-7"
        @click="switchPage('first')"
      />
      <custom-icon
        icon="icon-chevron-left"
        class="inline cursor-pointer w-7 h-7"
        @click="switchPage('previous')"
      />
      <custom-icon
        icon="icon-chevron-right"
        class="inline cursor-pointer w-7 h-7"
        @click="switchPage('next')"
      />
      <custom-icon
        icon="icon-chevrons-right"
        class="inline cursor-pointer w-7 h-7"
        @click="switchPage('last')"
      />
    </div>
  </div>
</template>
