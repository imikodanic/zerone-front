<script>
export default {
  methods: {
    logout() {
      this.$emit('logout')
    },
  },
}
</script>

<template>
  <div>
    <div class="flex flex-col justify-center">
      <div class="relative inline-block text-left dropdown">
        <button
          class="inline-flex justify-center items-center w-full md:px-4 py-2 text-sm font-medium text-grayscale-gray"
          type="button"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <span
            class="flex-shrink-0 w-12 h-12 md:w-10 md:h-10 flex justify-center items-center md:mr-2 rounded-full bg-grayscale-gray"
          >
            <span class="text-white text-2xl md:text-lg">
              {{ $auth.user.initials }}
            </span>
          </span>
          <span class="hidden md:inline">
            {{ $auth.user.fullname }}
          </span>
          <custom-icon
            icon="icon-chevron-down"
            class="w-10 h-10 chevron hidden md:inline"
          />
        </button>
        <div
          class="opacity-0 cursor-default invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
        >
          <div
            class="absolute right-0 w-56 top-0 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            role="menu"
          >
            <div class="px-4 py-3 flex items-center">
              <custom-icon icon="emoji-waving-hand" class="w-6 h-6 inline" />
              &nbsp; Welcome&nbsp;
              <span class="leading-5 text-gray-900 truncate">
                {{ $auth.user.firstname }}!
              </span>
            </div>
            <nuxt-link
              to="/admin"
              class="px-4 py-1 flex items-center cursor-pointer hover:bg-gray-200"
            >
              <custom-icon icon="icon-home" />
              <span
                class="text-gray-700 w-full text-sm leading-5 text-left font-bold"
                role="menuitem"
              >
                Dashboard
              </span>
              <!--                        <span-->
              <!--                          role="menuitem"-->
              <!--                          tabindex="-1"-->
              <!--                          class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"-->
              <!--                          aria-disabled="true"-->
              <!--                          >New feature (soon)</span-->
              <!--                        >-->
            </nuxt-link>
            <div
              class="px-4 py-1 flex items-center cursor-pointer hover:bg-gray-200"
              @click="logout"
            >
              <custom-icon icon="icon-log-out" />
              <a
                tabindex="3"
                class="text-gray-700 w-full text-sm leading-5 text-left font-bold"
                role="menuitem"
              >
                Sign out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}

.chevron {
  transition: transform 300ms;
}
.dropdown:focus-within .chevron {
  transform: rotate(180deg);
}
</style>
