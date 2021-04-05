<script>
import LogoHorizontal from '~/static/logos/logo-horizontal.svg?inline'
import MenuIcon from '~/static/landing-page/menu-icon.svg?inline'
import CloseIcon from '~/static/landing-page/close-icon.svg?inline'

export default {
  name: 'Navbar',
  components: { LogoHorizontal, MenuIcon, CloseIcon },
  data() {
    return {
      navbarItems: [
        { title: 'Projects', to: 'projects' },
        { title: 'Groups', to: 'groups' },
        { title: 'What we do', to: 'what-we-do' },
        { title: 'About us', to: 'about-us' },
      ],
      openedMenu: false,
    }
  },
  methods: {
    toggleMenu() {
      this.openedMenu = !this.openedMenu
    },
  },
}
</script>

<template>
  <div>
    <div class="fixed h-20 lg:h-24 w-full bg-primary-white navbar-shadow">
      <!-- DESKTOP -->
      <div
        class="lg:flex hidden h-full items-center justify-between px-16 xl:px-24"
      >
        <nuxt-link to="/">
          <logo-horizontal class="cursor-pointer" />
        </nuxt-link>
        <div>
          <div
            v-for="(item, i) in navbarItems"
            :key="`item-${item.to}`"
            class="inline"
          >
            <nuxt-link :to="item.to" class="text-lg text-primary-purple">
              {{ item.title }}
            </nuxt-link>
            <span
              class="text-primary-yellow mx-5"
              :class="{ hidden: navbarItems.length === i + 1 }"
            >
              •
            </span>
          </div>
        </div>
        <div>
          <button
            class="bg-primary-purple text-grayscale-white text-2xl font-bold px-12 py-4 rounded-full"
          >
            <span class="text-shadow"> Sign in </span>
          </button>
        </div>
      </div>
      <!-- MOBILE -->
      <div
        class="menu flex lg:hidden h-full items-center justify-between px-4 py-4"
      >
        <menu-icon
          class="cursor-pointer"
          aria-label="Open menu"
          @click="toggleMenu"
        />
        <button
          class="bg-primary-purple text-grayscale-white text-lg font-bold px-8 py-2 rounded-lg"
        >
          <span class="text-shadow"> Sign in </span>
        </button>
      </div>
      <div
        class="fixed flex flex-col justify-between z-50 top-0 h-0 w-screen transition-all duration-500 ease-in-out overflow-y-hidden bg-grayscale-white"
        :class="{ 'h-screen': openedMenu }"
      >
        <div class="flex items-center justify-between px-5 w-full pt-5">
          <div class="hidden md:block"></div>
          <logo-horizontal />
          <close-icon
            class="inline-block cursor-pointer"
            aria-label="Close menu"
            @click="toggleMenu"
          />
        </div>
        <div class="mx-10">
          <nuxt-link
            v-for="item in navbarItems"
            :key="`item-${item.to}`"
            :to="item.to"
            class="text-primary-purple text-4xl block my-8 md:text-center"
            @click.native="toggleMenu"
          >
            {{ item.title }}
          </nuxt-link>
        </div>
        <div></div>
        <div class="px-10 mb-10">
          <button
            class="bg-primary-purple text-grayscale-white text-2xl font-bold w-full px-8 py-3 rounded-lg"
          >
            <span class="text-shadow"> Sign in </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar-shadow {
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.05);
}

/*noinspection CssUnusedSymbol*/
a.nuxt-link-exact-active {
  @apply text-primary-black;
  @apply font-bold;
  transition: font-weight 0.1s;
}
</style>
