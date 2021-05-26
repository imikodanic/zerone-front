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
    <h3 class="text-4xl font-bold">All projects are organized into groups</h3>
    <p class="text-2xl mt-4">
      We organized all of our projects in separate groups so you can easily
      navigate
      <br />
      and learn faster about things you’re interested in.
    </p>
    <div class="mt-10 flex flex-wrap justify-between">
      <div
        v-for="group in projectGroups"
        :key="`group-${group.title}`"
        class="w-full md:w-1/2 p-8"
      >
        <group-card :group="group" />
      </div>
    </div>
  </div>
</template>
