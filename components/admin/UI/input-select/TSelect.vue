<script>
import debounce from 'lodash/debounce'
import TSelectChips from '@/components/admin/UI/input-select/TSelectChips'
import validatorMixin from '@/plugins/validatorMixin'
import ErrorMessage from '@/components/admin/UI/ErrorMessage'

export default {
  name: 'TSelect',
  components: { ErrorMessage, TSelectChips },
  mixins: [validatorMixin],
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: null,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    itemText: {
      type: String,
      default: 'text',
    },
    itemValue: {
      type: String,
      default: 'value',
    },
    apiUrl: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      menuOpened: false,
      apiOptions: [],
      selectedOptionObjects: [],
      search: null,
    }
  },
  computed: {
    computedApiOptions() {
      return this.apiOptions
    },
    computedOptions() {
      const { itemValue, itemText, value, multiple } = this

      const options = this.apiUrl ? this.computedApiOptions : this.options

      const formattedOptions = []

      if (!multiple)
        formattedOptions.push({ [itemText]: 'None', [itemValue]: null })

      options.forEach((option) => {
        const optionValue = option[itemValue]

        const isSelected = multiple
          ? value?.includes(optionValue)
          : value === optionValue

        const formattedOption = { ...option, isSelected }
        formattedOptions.push(formattedOption)
      })

      return formattedOptions
    },
    selectedOptions() {
      const selectedLocalOptions = this.computedOptions.filter(
        (option) => option.isSelected
      )

      const activeSelectedOptions = this.selectedOptionObjects.filter(
        (option) =>
          this.value.includes(option.id) &&
          !selectedLocalOptions.find((o) => o.id === option.id) // check if there's already one selected option in local
      )

      return [...activeSelectedOptions, ...selectedLocalOptions]
    },
  },
  watch: {
    computedOptions: {
      handler(newValue, oldValue) {
        const isLengthSame = newValue.length === oldValue.length
        if (!this.menuOpened || isLengthSame) return

        this.menuOpened = false
        this.$nextTick(() => this.openSelectMenu())
      },
    },
    value: {
      handler() {
        if (this.multiple) return

        const selectedOption = this.computedOptions.find(
          (o) => o[this.itemValue] === this.value
        )

        this.search = selectedOption?.[this.itemText]
      },
      immediate: true,
    },
  },
  async created() {
    if (!this.apiUrl) return

    const { data } = await this.$axios.$get(this.apiUrl)
    this.apiOptions.splice(0, this.apiOptions.length, ...data.data)

    await this.fetchSelectedItems()
  },
  mounted() {
    document.addEventListener('click', this.closeSelectMenu)
  },
  destroyed() {
    document.removeEventListener('click', this.closeSelectMenu)
  },
  methods: {
    // ****
    // Menu handling methods
    // ****
    openSelectMenu() {
      this.menuOpened = true

      if (this.menuOpened) this.checkSpaceBelow()
    },
    closeSelectMenu(event) {
      // Don't close the menu if the input is selected
      if (event.target.closest(`#${this.id}`)) return

      // Don't close the menu if an item is selected in multiple select
      if (event.target.closest('.select-option') && this.multiple) return

      if (!event.target.closest(`#${this.id}`)) {
        if (this.menuOpened) this.validate()

        this.menuOpened = false
      }
    },
    async checkSpaceBelow() {
      // Check for menu open
      await this.$nextTick()

      const { id } = this
      const dropdown = document.getElementById(`${id}-wrapper`)
      const dropdownMenu = document.getElementById(`${id}-menu`)
      const formContainer = document.getElementById('form-container')

      // If dropdowns bottom position is bigger than document height open the menu upwards
      const bottomPosition = dropdown.offsetTop + dropdown.scrollHeight
      const containerScrollHeight = formContainer
        ? formContainer.scrollHeight
        : document.body.scrollHeight

      if (bottomPosition >= containerScrollHeight)
        dropdownMenu.style.top = -dropdownMenu.clientHeight + 12 + 'px'
    },

    // ****
    // Options handling methods
    // ***
    fetchApiOptions: debounce(async function () {
      if (!this.apiUrl) return
      try {
        const params = { search: this.search }

        const { data } = await this.$axios.$get(this.apiUrl, { params })
        this.apiOptions.splice(0, this.apiOptions.length, ...data.data)
      } catch {}
    }, 350),
    async fetchSelectedItems() {
      const itemIds = this.value?.filter(
        (selectedOption) =>
          !this.apiOptions.find((option) => option.id === selectedOption.id)
      )

      if (!itemIds?.length) return

      const requests = itemIds.map((id) =>
        this.$axios.get(`${this.apiUrl}/${id}`)
      )
      const response = await Promise.all(requests)

      this.selectedOptionObjects = response.map((res) => res.data.data)
    },
    selectOption(option) {
      const optionValue = option[this.itemValue]

      if (!this.multiple) {
        this.$emit('input', optionValue)
        return
      }

      if (!this.value) this.$emit('input', [])
      const updatedValue = [...this.value]
      const optionIndex = updatedValue.indexOf(optionValue)

      if (optionIndex < 0) updatedValue.push(optionValue)
      else updatedValue.splice(optionIndex, 1)

      this.$emit('input', updatedValue)
    },
    removeOption(option) {
      const optionIndex = this.value.indexOf(option.id)

      if (optionIndex < 0) return

      const newValue = [...this.value]
      newValue.splice(optionIndex, 1)

      this.$emit('input', newValue)
    },
  },
}
</script>

<template>
  <div :id="`${id}-wrapper`" class="relative">
    <label :for="id" class="block font-medium text-gray-700">
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <input
        :id="id"
        v-model="search"
        type="text"
        :readonly="!apiUrl"
        autocomplete="off"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full border-gray-300 rounded-md"
        :class="{ invalid: isInvalid }"
        @click="openSelectMenu"
        @input="fetchApiOptions"
      />
    </div>
    <div
      v-if="menuOpened"
      :id="`${id}-menu`"
      class="absolute bg-white w-full z-20 mt-1 border border-gray-300 rounded-md max-h-44 overflow-y-auto"
    >
      <div
        v-for="option in computedOptions"
        :key="`option-${option[itemValue]}`"
        :value="option[itemValue]"
        class="px-2.5 py-0.5 cursor-pointer select-option border-l-4 hover:border-indigo-300"
        :class="{
          'active-option': option.isSelected,
        }"
        @click="selectOption(option)"
      >
        <span
          :class="{
            'active-option': option.isSelected,
          }"
        >
          {{ option[itemText] }}
        </span>
      </div>
    </div>
    <t-select-chips
      v-if="multiple"
      :selected-options="selectedOptions"
      :item-text="itemText"
      @remove-option="removeOption"
    />
    <error-message v-if="!hideValidator" :validator="validator" />
  </div>
</template>

<style scoped>
.active-option {
  @apply border-indigo-500;
  @apply font-medium;
}
.invalid {
  @apply ring-red-500 border-red-500;
}
</style>
