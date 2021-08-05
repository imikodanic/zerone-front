<script>
import isEmpty from 'lodash/isEmpty'
import TFilterModal from '@/components/admin/containers/preview/TFilterModal'

export default {
  name: 'TToolbar',
  components: {
    TFilterModal,
  },
  props: {
    search: {
      type: String,
      default: null,
    },
    filterOptions: {
      type: Array,
      default: () => [],
    },
    activeFilters: {
      type: Object,
      default: () => {},
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
    additionalTools: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      filterModal: false,
    }
  },
  computed: {
    isToolbarActive() {
      const { hideSearch, filterOptions } = this

      return !hideSearch || !filterOptions
    },
    isFilterActive() {
      return !isEmpty(this.activeFilters)
    },
  },
  methods: {
    updateSearch(event) {
      const { value } = event.target

      this.$emit('update:search', value)

      // No need for debounce because there's already one in TDataDisplay.vue
      this.getData()
    },
    getData() {
      this.$emit('get-data', true)
    },
    openFilterModal() {
      this.filterModal = true
    },
    updateFilters(filters) {
      this.$emit('update:active-filters', filters)
      this.getData()
    },
    callToolAction(tool) {
      this.$emit('tool-action', tool)
    },
  },
}
</script>

<template>
  <div
    v-if="isToolbarActive"
    class="flex flex-wrap justify-end items-center bg-white border-b p-2 space-y-2 space-x-2 md:space-y-0"
  >
    <div class="mr-auto">
      <button
        v-for="tool in additionalTools"
        :key="`tool-${tool.key}`"
        class="flex items-center space-x-1 text-xs text-white bg-gray-800 font-semibold border shadow-sm rounded-md p-2"
        @click="callToolAction(tool)"
      >
        {{ tool.label }}
      </button>
    </div>

    <div v-if="!hideSearch" class="relative order-4 sm:order-2">
      <input
        :value="search"
        type="text"
        placeholder="Search..."
        aria-label="Search"
        class="appearance-none relative block w-full pl-2 py-2 border border-gray-300 placeholder-gray-500 text-gray-800 shadow-sm rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 focus:z-10 text-xs"
        @input="updateSearch"
        @keyup.enter="getData"
      />
      <custom-icon
        icon="icon-search"
        class="absolute top-0 right-0 mt-1.5 mr-2 cursor-pointer z-10 fill-gray-700 h-6 w-6"
        @click="getData"
      />
    </div>

    <button
      v-if="filterOptions.length"
      class="flex items-center order-3 space-x-1 text-xs text-gray-500 font-semibold border shadow-sm rounded-md p-2"
      :class="isFilterActive ? 'active-filter' : 'inactive-filter'"
      @click="openFilterModal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        :stroke="isFilterActive ? '#fff' : 'currentColor'"
        class="h-4 w-4 text-gray-500"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
        />
      </svg>
      <span :class="{ 'text-white': isFilterActive }">Filter</span>
    </button>
    <t-filter-modal
      v-model="filterModal"
      :active-filters="activeFilters"
      :options="filterOptions"
      @update:active-filters="updateFilters"
    />
  </div>
</template>

<style>
.active-filter {
  @apply bg-indigo-500 border-indigo-600;
}
.inactive-filter {
  @apply border-gray-300;
}
</style>
