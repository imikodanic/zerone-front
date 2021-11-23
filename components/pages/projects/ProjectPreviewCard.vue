<script>
import UsersIcon from '~/static/icons/icon-users.svg?inline'
import CalendarIcon from '~/static/icons/icon-calendar.svg?inline'

export default {
  name: 'ProjectPreviewCard',
  components: { UsersIcon, CalendarIcon },
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
  methods: {},
}
</script>

<template>
  <div class="w-full sm:w-80 shadow-lg rounded-lg bg-grayscale-white">
    <div class="h-64 rounded-t-lg bg-gray-300">
      <img
        :src="project.image || '/logos/logo.svg'"
        alt="Demo"
        class="object-cover rounded-t-lg w-full h-full"
      />
    </div>
    <div class="h-56 px-6 mt-4 pb-6 w-full flex flex-col justify-between">
      <div>
        <h3 class="text-2xl font-semibold">
          {{ project.title }}
        </h3>
        <div class="w-1/3 h-1 bg-primary-yellow rounded-full"></div>
        <div class="flex flex-col justify-between mt-1 sm:flex-row">
          <div class="flex items-end">
            <users-icon class="inline" />
            <span class="font-bold text-lg mb-1">{{ project.users || 1 }}</span>
          </div>
          <div class="flex items-end">
            <calendar-icon class="inline" />
            <span class="font-bold text-lg mb-1">
              {{ project.updated_at | formatDate }}
            </span>
          </div>
        </div>
      </div>
      <locale-link :to="`/project/${project.title}/${project.id}`">
        <t-button class="py-2 mt-4">View</t-button>
      </locale-link>
    </div>
  </div>
</template>
