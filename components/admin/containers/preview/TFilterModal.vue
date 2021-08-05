<script>
import TModal from '@/components/UI/TModal'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'TFilterModal',
  components: { TModal },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    activeFilters: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      booleanOptions: [
        { value: false, text: 'False' },
        { value: true, text: 'True' },
      ],
      localActiveFilters: {},
    }
  },
  computed: {
    fixtures() {
      return this.$store.state.fixtures.data
    },
  },
  watch: {
    activeFilters: {
      handler(v) {
        this.localActiveFilters = cloneDeep(v)
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    cancel() {
      this.$emit('input', false)
      this.localActiveFilters = cloneDeep(this.activeFilters)
    },
    save() {
      for (const [key, value] of Object.entries(this.localActiveFilters)) {
        // Delete property if filter isn't selected
        if (!value && value !== false) delete this.localActiveFilters[key]
      }

      this.$emit('update:active-filters', this.localActiveFilters)
      this.$emit('input', false)
    },
  },
}
</script>
<template>
  <t-modal :value="value">
    <div class="flex flex-col gap-5 min-h-52">
      <div
        v-for="filter in options"
        :key="`filter-${filter.key}`"
        class="flex items-center gap-2"
      >
        <label
          :for="`filter-${filter.key}`"
          class="font-medium text-gray-700 w-1/4"
        >
          {{ filter.label }}
        </label>
        <div class="w-3/4">
          <t-select
            v-if="filter.type === 'boolean'"
            :id="`filter-${filter.key}`"
            v-model="localActiveFilters[filter.key]"
            :options="booleanOptions"
            hide-validator
          />
          <t-select
            v-if="filter.type === 'select'"
            :id="`filter-${filter.key}`"
            v-model="localActiveFilters[filter.key]"
            :options="fixtures[filter.fixture]"
            hide-validator
            item-text="name"
            item-value="id"
          />
        </div>
      </div>
    </div>
    <div class="flex justify-end">
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 mr-3 border border-transparent shadow-sm text-sm font-medium rounded-md bg-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        type="button"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        @click="save"
      >
        Save
      </button>
    </div>
  </t-modal>
</template>
