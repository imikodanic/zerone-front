<script>
import SignInModal from '@/components/layout/SignInModal'
import UserPopup from '@/components/layout/UserPopup'
import LogoHorizontal from '~/static/logos/logo-horizontal.svg?inline'
import MenuIcon from '~/static/pages/landing-page/menu-icon.svg?inline'
import CloseIcon from '~/static/pages/landing-page/close-icon.svg?inline'
// import LanguageIcon from '~/static/pages/landing-page/language-icon.svg?inline'

export default {
  name: 'Navbar',
  components: {
    UserPopup,
    LogoHorizontal,
    MenuIcon,
    CloseIcon,
    SignInModal,
    // LanguageIcon,
  },
  data() {
    return {
      openedMenu: false,
      signInModal: false,
    }
  },
  computed: {
    inactiveLanguageIcon() {
      return this.$store.state.language.activeLanguage === 'hr'
        ? 'icon-lang-en'
        : 'icon-lang-hr'
    },
    navbarItems() {
      return [
        /* { title: this.$t('navbar.home'), to: '/'},
         { title: this.$t('navbar.projects'), to: '/projects' },
         { title: this.$t('navbar.news'), to: '/news' },
         { title: this.$t('navbar.creators'), to: '/creators2' },
         { title: this.$t('navbar.aboutus'), to: '/about' },
         { title: this.$t('navbar.contact'), to: '/contact' }, */
        { title: this.$t('Home'), to: '/' },
        { title: this.$t('Projects'), to: '/projects' },
        { title: this.$t('News'), to: '/news' },
        { title: this.$t('About'), to: '/about' },
        { title: this.$t('Contact'), to: '/contact' },
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
    logout() {
      this.$auth.logout()
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
    <div class="fixed z-100 h-20 lg:h-24 w-full bg-grayscale-white navbar-shadow sidebar">
      <!-- DESKTOP -->
      <div class="lg:flex flex-col hidden h-full items-center">
        <locale-link to="/" class="zerone-logo">
          <logo-horizontal class="cursor-pointer" />
        </locale-link>
        <div class="flex flex-col ul-sidebar">
          <div v-for="(item) in navbarItems" :key="`item-${item.to}`" class="inline">
            <locale-link :to="item.to" class="sidebar-link">
              {{ item.title }}
            </locale-link>
          </div>
        </div>
        <hr>
        <div class="flex gap-4 items-center cursor-pointer">
          <!--          <custom-icon-->
          <!--            :icon="inactiveLanguageIcon"-->
          <!--            class="max-h-10 w-10"-->
          <!--            @click.native="switchLanguage"-->
          <!--          />-->
          <div v-show="!$auth.loggedIn" class="flex-shrink-0">
            <t-button
              class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
              @click="openSignIn">
              {{ $t('navbar.signin') }}
            </t-button>
          </div>
          <user-popup v-if="$auth.loggedIn" @logout="logout" />
        </div>
      </div>
      <!-- MOBILE -->
      <div class="menu flex lg:hidden h-full items-center justify-between px-4 py-4">
        <menu-icon class="cursor-pointer" aria-label="Open menu" @click="toggleMenu" />

        <button
          class="bg-primary-purple text-lg font-bold px-8 py-2 rounded-lg hover:bg-secondary-purple transition-colors"
          @click="openSignIn">
          <span class="text-shadow text-grayscale-white"> Sign in </span>
        </button>
      </div>
      <!-- MOBILE MENU -->
      <div
        class="fixed flex-row justify-between z-50 top-0 h-0 w-screen transition-all duration-500 ease-in-out overflow-y-hidden bg-grayscale-white"
        :class="{ 'h-screen': openedMenu }">
        <div class="flex items-center justify-between px-5 w-full pt-5">
          <div class="hidden md:block"></div>
          <locale-link to="/" @click.native="toggleMenu">
            <img src="@/static/logos/logo-horizontal.svg" alt="" />
          </locale-link>
          <close-icon class="inline-block cursor-pointer" aria-label="Close menu" @click="toggleMenu" />
        </div>
        <div class="mx-10">
          <locale-link v-for="item in navbarItems" :key="`item-${item.to}`" :to="item.to"
            class="text-primary-purple text-4xl block my-8 md:text-center" @click.native="toggleMenu">
            {{ item.title }}
          </locale-link>
          <!--          <language-icon class="max-h-14" @click="switchLanguage" />-->
        </div>
        <div></div>
        <div class="px-10 mb-20">
          <button
            class="bg-primary-purple text-2xl font-bold w-full px-8 py-3 rounded-lg hover:bg-secondary-purple transition-colors"
            @click="openSignIn">
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

.sidebar {
  height: 100% !important;
  width: 20%;
}

.zerone-logo {
  padding: 2rem;
}

.sidebar-link {
  font-size: 2rem;
}

.ul-sidebar {
  margin-top: 3.5rem;
  margin-bottom: 3.5rem;
}

.ul-sidebar>div {
  margin-bottom: 1.5rem;
}

hr {
  border: 1px solid black;
  border-radius: 50%;
  width: 15vw;
}

/*noinspection CssUnusedSymbol*/
a.nuxt-link-exact-active {
  @apply text-primary-black;
  @apply font-bold;
  transition: font-weight 0.1s;
}
</style>
