<script>
import ProjectPreviewCard from '@/components/pages/projects/ProjectPreviewCard'
export default {
  name: 'ProjectGroupSection',
  components: { ProjectPreviewCard },
  props: {
    projectGroup: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: true,
    }
  },
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded
      if (!this.isExpanded) return

      this.$nextTick(() =>
        this.$scrollTo(`#group-${this.projectGroup.id}`, { offset: -120 })
      )
    },
  },
}
</script>

<template>
  <div :id="`group-${projectGroup.id}`" class="mt-20">
    <div class="flex items-center">
      <div
        class="relative w-10 h-10 mr-6 inline-block cursor-pointer"
        @click="toggleExpand"
      >
        <div
          class="w-9 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-yellow"
        ></div>
        <div
          v-if="!isExpanded"
          class="w-2 h-9 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary-yellow"
        ></div>
      </div>
      <h1 class="text-3xl font-bold">{{ projectGroup.title }}</h1>
    </div>
    <div
      class="mt-9 flex flex-col items-center flex-wrap gap-10 md:flex-row md:px-16 overflow-y-hidden h-full transition-all duration-500"
      :class="{
        'max-h-0': !isExpanded,
      }"
      style="height: 530px"
      :style="isExpanded && `max-height: 530px;`"
    >
      <project-preview-card
        v-for="project in projectGroup.projects"
        :key="`project-${project.id}`"
        :project="project"
      />
    </div>
  </div>
</template>
