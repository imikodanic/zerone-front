<script>
import SignInModal from '@/components/layout/SignInModal'
import LogoHorizontal from '~/static/logos/logo-horizontal.svg?inline'
import MenuIcon from '~/static/pages/landing-page/menu-icon.svg?inline'
import CloseIcon from '~/static/pages/landing-page/close-icon.svg?inline'

export default {
  name: 'Navbar',
  components: { LogoHorizontal, MenuIcon, CloseIcon, SignInModal },
  data() {
    return {
      navbarItems: [
        { title: 'Projects', to: '/projects' },
        { title: 'News', to: '/news' },
        { title: 'What we do', to: '/what-we-do' },
        { title: 'About us', to: '/about' },
      ],
      openedMenu: false,
      signInModal: false,
    }
  },
  methods: {
    toggleMenu() {
      this.openedMenu = !this.openedMenu
    },
    openSignIn() {
      this.signInModal = true
      this.openedMenu = false
    },
  },
}
</script>

<template>
  <div>
    <div
      class="fixed z-30 h-20 lg:h-24 w-full bg-grayscale-white navbar-shadow"
    >
      <!-- DESKTOP -->
      <div
        class="lg:flex hidden h-full items-center justify-between px-14 xl:px-24"
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
          <t-button class="px-12 py-4 text-2xl" @click="openSignIn">
            Sign in
          </t-button>
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
          class="bg-primary-purple text-lg font-bold px-8 py-2 rounded-lg hover:bg-secondary-purple transition-colors"
          @click="openSignIn"
        >
          <span class="text-shadow text-grayscale-white"> Sign in </span>
        </button>
      </div>
      <!-- MOBILE MENU -->
      <div
        class="fixed flex flex-col justify-between z-50 top-0 h-0 w-screen transition-all duration-500 ease-in-out overflow-y-hidden bg-grayscale-white"
        :class="{ 'h-screen': openedMenu }"
      >
        <div class="flex items-center justify-between px-5 w-full pt-5">
          <div class="hidden md:block"></div>
          <nuxt-link to="/" @click.native="toggleMenu">
            <img src="@/static/logos/logo-horizontal.svg" alt="" />
          </nuxt-link>
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
        <div class="px-10 mb-20">
          <button
            class="bg-primary-purple text-2xl font-bold w-full px-8 py-3 rounded-lg hover:bg-secondary-purple transition-colors"
            @click="openSignIn"
          >
            <span class="text-shadow text-grayscale-white"> Sign in </span>
          </button>
        </div>
      </div>
    </div>

    <!-- MODALS -->
    <sign-in-modal v-model="signInModal" />
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
