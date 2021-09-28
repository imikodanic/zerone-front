<script>
import debounce from 'lodash/debounce'

import THeader from '@/components/admin/containers/preview/THeader'
import TToolbar from '@/components/admin/containers/preview/TToolbar'
import TTable from '@/components/admin/containers/preview/TTable'
import TFooter from '@/components/admin/containers/preview/TFooter'

export default {
  name: 'TDataDisplay',
  components: {
    THeader,
    TToolbar,
    TTable,
    TFooter,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },
    apiUrl: {
      type: String,
      default: null,
      required: true,
    },
    createPath: {
      type: String,
      default: 'create',
    },
    noPagination: {
      type: Boolean,
      default: false,
    },

    hideCreate: {
      type: Boolean,
      default: false,
    },
    hideEdit: {
      type: Boolean,
      default: false,
    },
    hideDelete: {
      type: Boolean,
      default: false,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    filterOptions: {
      type: Array,
      default: () => [],
    },
    hideSearch: {
      type: Boolean,
      default: false,
    },
    additionalTools: {
      type: Array,
      default: () => [],
    },
    singleSelection: {
      type: Boolean,
      default: false,
    },
    multipleSelection: {
      type: Boolean,
      default: false,
    },
    projectCrud: {
      type: Boolean,
      default: false,
    },
    fetchDelay: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      items: [],
      parameters: {},
      search: null,
      activeFilters: {},
      order: {
        orderBy: null,
        orderType: null,
      },
      selectedItems: [],
      isLoading: !!this.apiUrl,
    }
  },
  async mounted() {
    if (this.fetchDelay) {
      setTimeout(() => this.fetchData(), +this.fetchDelay)
    } else {
      await this.fetchData()
    }
  },
  methods: {
    async fetchData() {
      try {
        const page = this.parameters.currentPage
        const limit = this.parameters.perPage
        const { search, order } = this

        const params = {
          page,
          limit,
          search,
          ...this.activeFilters,
          ...order,
        }

        const { apiUrl, items } = this
        this.isLoading = true
        const response = await this.$axios.get(apiUrl, { params })
        this.isLoading = false

        const { data } = this.noPagination ? response.data : response.data.data

        items.splice(0, items.length, ...data)

        if (this.noPagination) return

        const { pagination } = response.data.data
        this.parameters = {
          currentPage: pagination.page || 1,
          lastPage: pagination.lastPage,
          perPage: pagination.perPage,
          total: pagination.total,
        }
      } catch (e) {}
    },
    fetchDataDebounced: debounce(function () {
      this.fetchData()
    }, 300),
    loadData(shouldResetPage = false) {
      if (shouldResetPage) this.parameters.currentPage = 1

      this.fetchDataDebounced()
    },
    toggleSelectItem(item) {
      if (this.singleSelection) {
        // Toggle (clear) already selected item
        const newItems = this.selectedItems[0]?.id === item.id ? [] : [item]

        this.selectedItems.splice(0, this.selectedItems.length, ...newItems)
        return
      }

      const itemIndex = this.selectedItems.findIndex(
        (fItem) => fItem.id === item.id
      )
      if (itemIndex < 0) this.selectedItems.push(item)
      else this.selectedItems.splice(itemIndex, 1)
    },
    toggleSelectAll() {
      const { selectedItems } = this

      const isEverySelected = this.items.every((item) =>
        selectedItems.find((selected) => selected.id === item.id)
      )

      let itemsToToggle = this.items

      // If not every item is selected, select the unselected ones...
      if (!isEverySelected)
        itemsToToggle = this.items.filter(
          (item) => !selectedItems.find((selected) => selected.id === item.id)
        )

      itemsToToggle.forEach((item) => this.toggleSelectItem(item))
    },
    callToolAction(tool) {
      const { items, selectedItems } = this

      const payload = { items, selectedItems }

      if (this.singleSelection) payload.selectedItem = selectedItems[0]

      tool.callback(payload)
    },
  },
}
</script>

<template>
  <div class="flex flex-col max-w-screen shadow-md m-6">
    <t-header
      :title="title"
      :create-path="createPath"
      :hide-create="hideCreate"
    />
    <t-toolbar
      :search.sync="search"
      :filter-options="filterOptions"
      :active-filters.sync="activeFilters"
      :hide-search="hideSearch"
      :additional-tools="additionalTools"
      @tool-action="callToolAction"
      @get-data="loadData"
    />
    <t-table
      :headers="headers"
      :items="items"
      :api-url="apiUrl"
      :actions="actions"
      :hide-edit="hideEdit"
      :hide-delete="hideDelete"
      :order.sync="order"
      :project-crud="projectCrud"
      :multiple-selection="multipleSelection"
      :single-selection="singleSelection"
      :selected-items="selectedItems"
      :is-loading="isLoading"
      @toggle-select="toggleSelectItem"
      @toggle-select-all="toggleSelectAll"
      @get-data="fetchData"
    />
    <t-footer v-if="!noPagination" v-model="parameters" @input="fetchData" />
  </div>
</template>
