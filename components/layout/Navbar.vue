<script>
import SignInModal from '@/components/layout/SignInModal'
import LogoHorizontal from '~/static/logos/logo-horizontal.svg?inline'
import MenuIcon from '~/static/pages/landing-page/menu-icon.svg?inline'
import CloseIcon from '~/static/pages/landing-page/close-icon.svg?inline'
import LanguageIcon from '~/static/pages/landing-page/language-icon.svg?inline'

export default {
  name: 'Navbar',
  components: {
    LogoHorizontal,
    MenuIcon,
    CloseIcon,
    SignInModal,
    LanguageIcon,
  },
  data() {
    return {
      openedMenu: false,
      signInModal: false,
    }
  },
  computed: {
    inactiveLanguage() {
      return this.$store.state.language.activeLanguage === 'hr'
        ? 'English'
        : 'Hrvatski'
    },
    navbarItems() {
      return [
        { title: this.$t('navbar.projects'), to: '/projects' },
        { title: this.$t('navbar.news'), to: '/news' },
        { title: this.$t('navbar.creators'), to: '/creators2' },
        { title: this.$t('navbar.aboutus'), to: '/about' },
      ]
    },
  },
  methods: {
    toggleMenu() {
      this.openedMenu = !this.openedMenu
    },
    openSignIn() {
      this.signInModal = true
      this.openedMenu = false
    },
    switchLanguage() {
      const { state, dispatch } = this.$store
      const slug = state.language.activeLanguage === 'hr' ? 'en' : 'hr'
      dispatch('language/setLanguage', { slug })
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
        <div class="flex gap-4 items-center cursor-pointer">
          <language-icon class="max-h-14" @click="switchLanguage" />
          <div v-show="!$auth.loggedIn" class="flex-shrink-0">
            <t-button
              class="px-12 py-4 text-2xl flex-grow-0"
              @click="openSignIn"
            >
              {{ $t('navbar.signin') }}
            </t-button>
          </div>
          <!-- TODO: styling -->
          <div class="font-bold" v-if="$auth.loggedIn">
            <div
              class="min-h-screen py-6 flex flex-col justify-center sm:py-12"
            >
              <div class="flex items-center justify-center p-12">
                <div class="relative inline-block text-left dropdown">
                  <span class="rounded-md shadow-sm"
                    ><button
                      class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
                      type="button"
                      aria-haspopup="true"
                      aria-expanded="true"
                      aria-controls="headlessui-menu-items-117"
                    >
                      <span class="font-bold"> {{ $auth.user.fullname }}</span>
                      <svg
                        class="w-5 h-5 ml-2 -mr-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg></button
                  ></span>
                  <div
                    class="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95"
                  >
                    <div
                      class="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                      aria-labelledby="headlessui-menu-button-1"
                      id="headlessui-menu-items-117"
                      role="menu"
                    >
                      <div class="px-4 py-3">
                        <p class="text-sm leading-5">Signed in as</p>
                        <p
                          class="text-sm font-medium leading-5 text-gray-900 truncate"
                        >
                          username@gmail.com
                        </p>
                      </div>
                      <div class="py-1">
                        <a
                          href="http://localhost:3000/en/admin"
                          tabindex="0"
                          class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                          role="menuitem"
                          >Dashboard</a
                        >
                        <span
                          role="menuitem"
                          tabindex="-1"
                          class="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                          aria-disabled="true"
                          >New feature (soon)</span
                        >
                      </div>
                      <div class="py-1">
                        <a
                          href="javascript:void(0)"
                          tabindex="3"
                          class="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                          role="menuitem"
                          >Sign out</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <style>
              .dropdown:focus-within .dropdown-menu {
                opacity: 1;
                transform: translate(0) scale(1);
                visibility: visible;
              }
            </style>
          </div>
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
          <language-icon class="max-h-14" @click="switchLanguage" />
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
