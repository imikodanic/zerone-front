<script>
import LogoHorizontal from '~/static/logos/logo-horizontal.svg?inline'

export default {
  name: 'Sidebar',
  components: { LogoHorizontal },
  data() {
    return {
      sections: [
        { label: 'Dashboard', to: '/admin', icon: 'icon-home' },
        { label: 'Groups', to: '/admin/groups', icon: 'icon-grid', count: 4 },
        {
          label: 'Projects',
          to: '/admin/projects',
          icon: 'icon-layout',
          count: 10,
        },
      ],
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user || {}
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<template>
  <div
    class="min-h-screen w-64 flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800"
  >
    <div class="fixed flex flex-col top-0 left-0 w-64 bg-white h-full border-r">
      <div class="flex items-center border-b pl-5 py-1">
        <locale-link to="/">
          <logo-horizontal class="w-2/3" />
        </locale-link>
      </div>
      <div class="overflow-y-auto overflow-x-hidden flex-grow">
        <ul class="flex flex-col py-4 space-y-1">
          <li v-for="section in sections" :key="section.to">
            <locale-link
              :to="section.to"
              exact-active-class="bg-gray-200"
              class="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 mx-2 rounded-lg text-gray-600 pr-6"
            >
              <span class="inline-flex justify-center items-center ml-4">
                <custom-icon :icon="section.icon" />
              </span>
              <span class="ml-2 text-sm tracking-wide truncate">
                {{ section.label }}
              </span>
              <span
                v-if="section.count"
                class="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full"
              >
                {{ section.count }}
              </span>
            </locale-link>
          </li>
        </ul>
      </div>
      <div
        class="h-20 flex pl-5 pr-2 gap-3 items-center border-t cursor-pointer hover:bg-gray-50"
      >
        <div
          class="flex-shrink-0 w-10 h-10 flex justify-center items-center rounded-full bg-grayscale-gray"
        >
          <!--          <img-->
          <!--            src="https://randomuser.me/api/portraits/men/44.jpg"-->
          <!--            alt="Profile"-->
          <!--            class="rounded-full h-11"-->
          <!--          />-->
          <span class="text-white text-lg">{{ user.initials }}</span>
        </div>
        <div class="flex flex-col flex-grow">
          <span class="text-sm text-gray-600 font-medium">
            {{ user.fullname }}
          </span>
          <span class="text-xs text-gray-600"> View profile </span>
        </div>
        <div class="hover:bg-gray-200 rounded-2xl">
          <custom-icon icon="icon-log-out" class="w-7" @click.native="logout" />
        </div>
      </div>
    </div>
  </div>
</template>
