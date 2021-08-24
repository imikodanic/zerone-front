<script>
import Navbar from '@/components/layout/Navbar'
import DefaultFooter from '@/components/layout/Footer'

export default {
  components: {
    Navbar,
    DefaultFooter,
  },
  created() {
    this.setLanguageOnLoad()
  },
  methods: {
    setLanguageOnLoad() {
      const routeName = this.$route.name?.split('___')

      // get locale from the route name... if user edits locale slug in the URL manually
      const routeLocale = routeName ? routeName[routeName.length - 1] : 'hr'
      const cookieLocale = this.$cookies.get('FVRS_Locale')

      // if someone sends a user a link where its domain.com/en it should use the "en" locale
      // but it mustn't save it to cookie because user didn't set the language on purpose

      // if someone sends you a link where its domain.com then it should use a locale defined in the cookie "FVRS_Locale"
      const slug = routeLocale === 'default' ? cookieLocale : routeLocale

      this.$store.dispatch('language/setLanguage', {
        slug,
        saveCookie: false,
      })
    },
  },
}
</script>

<template>
  <div class="default-layout">
    <navbar />
    <div class="pt-20 lg:pt-24">
      <Nuxt class="min-h-page" />
      <default-footer />
    </div>
  </div>
</template>

<style scoped>
.min-h-page {
  min-height: calc(100vh - 288px - 96px);
}

@media screen and (max-width: 1024px) {
  .min-h-page {
    min-height: calc(100vh - 288px - 80px);
  }
}

@media screen and (max-width: 640px) {
  .min-h-page {
    min-height: calc(100vh - 408px - 80px);
  }
}
</style>
