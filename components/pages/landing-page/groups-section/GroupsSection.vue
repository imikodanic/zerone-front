<script>
import GroupCard from '@/components/pages/landing-page/groups-section/GroupCard'
export default {
  name: 'GroupsSection',
  components: { GroupCard },
  props: {
    projectGroups: {
      type: Array,
      required: true,
    },
  },
}
</script>

<template>
  <div>
    <!-- <h3 class="text-4xl font-bold">{{ $t('page.index.projects') }}</h3>
    <p class="text-2xl mt-4">
      {{ $t('page.index.projectsdesc') }}
    </p> -->
    <div class="mt-10 flex flex-wrap justify-between">
      <div
        v-for="group in projectGroups"
        :key="`group-${group.title}`"
        class="w-full md:w-1/2 py-8 sm:px-8"
      >
        <group-card :group="group" />
      </div>
    </div>
  </div>
</template>
