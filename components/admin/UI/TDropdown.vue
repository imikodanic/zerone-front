<script>
export default {
  name: 'TDropdown',
  props: {
    id: {
      type: String,
      default: 'dropdown',
      required: true,
    },
  },
  data() {
    return {
      openedMenu: false,
      on: {
        click: this.toggleMenu,
      },
    }
  },
  mounted() {
    document.addEventListener('click', this.closeMenu)
  },
  destroyed() {
    document.removeEventListener('click', this.closeMenu)
  },
  methods: {
    closeMenu() {
      if (!event.target.closest(`#${this.id}`)) {
        this.openedMenu = false
      }
    },
    toggleMenu() {
      this.openedMenu = !this.openedMenu
      this.checkSpaceBelow()
    },
    async checkSpaceBelow() {
      // Check for menu open
      await this.$nextTick()

      const { id } = this
      const dropdown = document.getElementById(id)
      const dropdownMenu = document.getElementById(`${id}-menu`)

      // If dropdowns bottom position is bigger than document height open the menu upwards
      const bottomPosition = dropdown.offsetTop + dropdown.scrollHeight

      if (bottomPosition >= document.body.scrollHeight)
        dropdownMenu.style.top = -dropdownMenu.clientHeight - 10 + 'px'
    },
  },
}
</script>

<template>
  <div :id="id" class="relative inline-block text-left">
    <slot name="activator" :on="on" />
    <div
      v-if="openedMenu"
      :id="`${id}-menu`"
      class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white"
      @click="toggleMenu"
    >
      <slot name="menu">No items</slot>
    </div>
  </div>
</template>
