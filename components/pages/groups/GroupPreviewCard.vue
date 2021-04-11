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
    class="h-80 w-full bg-grayscale-white shadow-md rounded-md flex items-center p-8 xl:w-11/12 2xl:w-10/12"
  >
    <div class="w-64 h-64 rounded-lg bg-gray-300 flex-shrink-0">
      <img
        :src="group.image"
        alt="Group image"
        class="object-cover rounded-lg w-full h-full"
      />
    </div>
    <div class="h-full ml-6">
      <h1 class="text-4xl font-bold">{{ group.title }}</h1>
      <p class="text-lg mt-3 h-48 overflow-hidden">
        {{ group.description }}
      </p>
    </div>
    <div
      class="h-full w-1.5 bg-primary-yellow flex-shrink-0 rounded-full mx-6"
    ></div>
    <div class="flex-shrink-0 h-full py-5 flex flex-col justify-between">
      <div>
        <user-icon class="inline" />
        <span class="font-semibold">
          Coordinator is
          <span class="text-primary-purple">{{ group.coordinator }}</span>
        </span>
      </div>
      <div>
        <grid-icon class="inline" />
        <span class="font-semibold">
          Group contains
          <span class="text-primary-purple">{{ group.projects }} projects</span>
        </span>
      </div>
      <div>
        <users-icon class="inline" />
        <span class="font-semibold">
          There are
          <span class="text-primary-purple">{{ group.members }} members</span>
        </span>
      </div>
      <t-button>Open</t-button>
    </div>
  </div>
</template>
