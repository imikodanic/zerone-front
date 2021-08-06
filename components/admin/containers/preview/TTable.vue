<script>
import get from 'lodash/get'

export default {
  name: 'TTable',
  props: {
    headers: {
      type: Array,
      default: () => [],
      required: true,
    },
    items: {
      type: Array,
      default: () => [],
      required: true,
    },
    apiUrl: {
      type: String,
      default: null,
      required: true,
    },
    actions: {
      type: Array,
      default: () => [],
    },
    hideEdit: {
      type: Boolean,
      default: false,
    },
    hideDelete: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Object,
      default: () => {},
    },
    singleSelection: {
      type: Boolean,
      default: false,
    },
    multipleSelection: {
      type: Boolean,
      default: false,
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    projectCrud: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      itemOverflows: {},
      collapsedItems: {},
    }
  },
  computed: {
    columnClasses() {
      const columnClasses = {}

      this.headers.forEach((header) => {
        columnClasses[header.value] = []
        const currentHeader = columnClasses[header.value]

        if (header.align === 'center') currentHeader.push('text-center')
        if (header.align === 'right') currentHeader.push('text-right')
      })

      return columnClasses
    },
    areAllItemsSelected() {
      return this.items.every((item) =>
        this.selectedItems.some((selected) => selected.id === item.id)
      )
    },
    selectCheckboxType() {
      if (this.singleSelection) return 'radio'

      return 'checkbox'
    },
  },
  watch: {
    items: 'setItemOverflows',
  },
  methods: {
    get,
    editItem(item) {
      const { path } = this.$route
      const fullPath = path[path.length - 1] === '/' ? path : `${path}/`

      if (this.projectCrud) window.open(`${fullPath}${item.id}`)
      else this.$router.push(`${fullPath}${item.id}/edit`)
    },
    async deleteItem(item) {
      const isConfirmed = confirm('Are you sure you want to delete this item?')

      if (!isConfirmed) return

      try {
        await this.$axios.delete(`${this.apiUrl}/${item.id}`)

        this.$emit('get-data')
      } catch {}
    },
    async setItemOverflows() {
      await this.$nextTick()

      this.items.forEach((item) => {
        this.headers.forEach((property) => {
          const id = `item-${property.value}-${item.id}`
          const itemElement = document.getElementById(id)

          if (!itemElement) return

          const isOverflowing =
            itemElement.scrollHeight > itemElement.clientHeight
          this.$set(this.itemOverflows, id, isOverflowing)
        })
      })
    },
    readMoreToggle(id) {
      const itemElement = document.getElementById(id)
      if (!itemElement) return

      const isTruncated = itemElement.classList.contains('item-truncated')

      if (isTruncated) {
        itemElement.classList.remove('item-truncated')
        this.$set(this.collapsedItems, id, true)
      } else {
        itemElement.classList.add('item-truncated')
        this.$set(this.collapsedItems, id, false)
      }
    },
    setOrderBy(value) {
      const { orderBy: oldOrderBy, orderType: oldOrderType } = this.order

      let orderBy, orderType

      orderBy = value

      if (value !== oldOrderBy) orderType = 'asc'
      if (value === oldOrderBy && oldOrderType === 'asc') orderType = 'desc'

      if (value === oldOrderBy && oldOrderType === 'desc') {
        orderBy = null
        orderType = null
      }

      this.$emit('update:order', { orderType, orderBy })

      this.$emit('get-data')
    },
    selectItem(item) {
      this.$emit('toggle-select', item)
    },
    selectToggleAll() {
      this.$emit('toggle-select-all')
    },
  },
}
</script>

<template>
  <div class="overflow-x-auto max-w-full">
    <table class="w-full bg-white divide-y divide-gray-200">
      <thead class="bg-gray-50 text-gray-500 text-sm">
        <tr class="divide-x divide-gray-300">
          <th v-if="multipleSelection || singleSelection" class="px-3 py-2">
            <t-checkbox
              v-if="multipleSelection"
              id="select-toggle-all"
              :value="areAllItemsSelected"
              @input="selectToggleAll"
            />
          </th>
          <th
            v-for="(header, headerIndex) in headers"
            :key="`header-${header.value}-${headerIndex}`"
            class="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
            :class="columnClasses[header.value]"
            :style="`width: ${header.width} !important`"
            @click="setOrderBy(header.value)"
          >
            <div class="flex justify-between items-center gap-2">
              {{ header.title }}
              <div
                class="w-4 h-4 transform transition-transform ease-in flex-shrink-0"
                :class="{ '-rotate-180': order.orderType === 'desc' }"
              >
                <custom-icon
                  v-if="header.value === order.orderBy"
                  icon="icon-arrow-up"
                  class="w-full h-full"
                />
              </div>
            </div>
          </th>
          <th
            class="px-3 py-2 text-center text-xs font-medium text-gray-500 uppercase"
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody class="text-gray-500 text-xs divide-y divide-gray-200">
        <tr
          v-for="(item, itemIndex) in items"
          :key="`item-${itemIndex}-${item.id}`"
        >
          <td v-if="multipleSelection || singleSelection" class="px-3">
            <t-checkbox
              :id="`item-select-${item.id}`"
              :value="selectedItems.find((selected) => selected.id === item.id)"
              :type="selectCheckboxType"
              @input="selectItem(item)"
            />
          </td>
          <td
            v-for="(property, propertyIndex) in headers"
            :key="`property-${property.value}-${propertyIndex}`"
            class="p-3"
            :class="columnClasses[property.value]"
          >
            <span
              v-if="property.type === 'boolean'"
              class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
              :class="get(item, property.value) ? 'chip-true' : 'chip-false'"
            >
              {{
                get(item, property.value)
                  ? property.trueText
                  : property.falseText
              }}
            </span>
            <span v-else-if="property.type === 'date'">
              {{ get(item, property.value) | formatDate }}
            </span>
            <span
              v-else
              :id="`item-${property.value}-${item.id}`"
              class="item-truncated"
            >
              {{ get(item, property.value) }}
            </span>
            <span
              v-if="itemOverflows[`item-${property.value}-${item.id}`]"
              class="text-indigo-500 text-right pr-5 font-medium block text-sm cursor-pointer"
              @click="readMoreToggle(`item-${property.value}-${item.id}`)"
            >
              {{
                collapsedItems[`item-${property.value}-${item.id}`]
                  ? 'Show less'
                  : 'Read more'
              }}
            </span>
          </td>

          <!-- ACTIONS -->
          <td class="p-3">
            <div class="flex justify-center space-x-1">
              <button
                v-for="action in actions"
                :key="`action-${action.value}`"
                type="button"
                class="border-2 rounded-md p-1"
                :class="`border-${action.color}`"
                @click="action.callback(item)"
              >
                <component :is="action.icon" class="w-4 h-4" />
              </button>
              <button
                v-if="!hideEdit"
                type="button"
                class="border-2 border-indigo-200 rounded-md w-8 h-8"
                @click="editItem(item)"
              >
                <custom-icon icon="icon-edit-2" class="w-full h-full" />
              </button>
              <button
                v-if="!hideDelete"
                type="button"
                class="border-2 border-red-200 rounded-md w-8 h-8"
                @click="deleteItem(item)"
              >
                <custom-icon icon="icon-trash" class="w-full h-full" />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style scoped>
.chip-false {
  @apply bg-red-200;
  @apply text-red-800;
}
.chip-true {
  @apply bg-green-200;
  @apply text-green-800;
}
.item-truncated {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.read-more {
  color: #606060;

  @apply text-gray-500;
}
</style>
