<script>
import UserIcon from '~/static/icons/icon-user.svg?inline'
import UsersIcon from '~/static/icons/icon-users.svg?inline'
import GridIcon from '~/static/icons/icon-grid.svg?inline'

export default {
  name: 'GroupPreviewCard',
  components: {
    UserIcon,
    UsersIcon,
    GridIcon,
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
}
</script>
<template>
  <div
    class="xl:h-80 w-full bg-grayscale-white shadow-md rounded-md items-center p-4 lg:p-6 md:p-8 flex flex-col xl:flex-row xl:w-11/12 2xl:w-10/12"
  >
    <div class="flex flex-col items-center md:flex-row">
      <div class="w-64 h-64 rounded-lg bg-gray-300 flex-shrink-0">
        <img
          :src="group.image"
          alt="Group image"
          class="object-cover rounded-lg w-full h-full"
        />
      </div>
      <div class="h-full md:ml-6 mt-3 md:mt-0 text-center md:text-left">
        <h1 class="text-4xl font-bold">{{ group.title }}</h1>
        <p class="text-lg mt-3 h-48 overflow-hidden">
          {{ group.description }}
        </p>
      </div>
    </div>

    <div
      class="bg-primary-yellow flex-shrink-0 rounded-full mx-6 h-1.5 w-full mt-5 xl:mt-0 xl:h-full xl:w-1.5"
    />
    <div
      class="flex-shrink-0 h-full pt-2 xl:pb-5 flex flex-col justify-between w-full lg:w-80"
    >
      <div>
        <user-icon class="inline" />
        <span class="font-semibold text-sm md:text-base">
          Coordinator is
          <span class="text-primary-purple">{{ group.coordinator }}</span>
        </span>
      </div>
      <div>
        <grid-icon class="inline" />
        <span class="font-semibold text-sm md:text-base">
          Group contains
          <span class="text-primary-purple">{{ group.projects }} projects</span>
        </span>
      </div>
      <div>
        <users-icon class="inline" />
        <span class="font-semibold text-sm md:text-base">
          There are
          <span class="text-primary-purple">{{ group.members }} members</span>
        </span>
      </div>
      <t-button
        class="mt-2 md:mt-0"
        @click="$router.push('/group/etwinning-projects')"
      >
        Open
      </t-button>
    </div>
  </div>
</template>
