export default {
  state() {
    return {
      activeLanguage: 'hr',
      languageOptions: [
        { name: 'Hrvatski', slug: 'hr' },
        { name: 'English', slug: 'en' },
      ],
    }
  },
  getters: {
    activeLanguageName(state) {
      const fullActiveLang = state.languageOptions.find(
        (lang) => lang.slug === state.activeLanguage
      )

      return fullActiveLang?.name || 'Hrvatski'
    },
  },
  actions: {
    setLanguage({ commit, state }, { slug, saveCookie = true }) {
      if (slug === state.language) return

      commit('updateLanguage', slug)

      if (saveCookie) this.$cookies.set('FVRS_Locale', slug)
    },
    setLanguageOptions({ commit }, options) {
      commit('updateLanguageOptions', options)
    },
  },
  mutations: {
    updateLanguage(state, slug) {
      state.activeLanguage = slug
      this.$i18n.setLocale(slug)
    },
    updateLanguageOptions(state, options) {
      state.languageOptions.splice(0, state.languageOptions.length, ...options)
    },
  },
}
