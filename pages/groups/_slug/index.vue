<script>
import ProjectPreviewCard from '@/components/pages/projects/ProjectPreviewCard'
export default {
  components: { ProjectPreviewCard },
  computed: {
    projectData() {
      const projects = [
        {
          id: 'project1',
          title: 'Detektivske priče',
          image:
            'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
          users: 27,
          published_on: 'May 1st, 2021.',
        },
        {
          id: 'project2',
          title: 'Math in media',
          image:
            'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/gettyimages-1217538342.png?crop=0.662xw:1.00xh;0.173xw,0&resize=640:*',
          users: 10,
          published_on: 'May 1st, 2021.',
        },
        {
          id: 'project3',
          title: 'Neki projekt',
          image:
            'https://cdn.discordapp.com/attachments/773590074133577808/832506191921545226/city-6156596_960_720.png',
          users: 19,
          published_on: 'May 1st, 2021.',
        },
      ]

      const title = 'eTwinning projects'

      return { projects, title }
    },
  },
}
</script>

<template>
  <div class="projects-container">
    <h1 class="text-4xl font-bold mt-14">
      {{ projectData.title }}
    </h1>
    <p class="text-2xl mt-4">
      These are all projects in the group
      <span class="text-primary-purple font-bold"> {{ projectData.title }}</span
      >.
    </p>

    <div
      class="mt-9 flex flex-col items-center flex-wrap gap-10 md:flex-row md:px-16"
    >
      <project-preview-card
        v-for="project in projectData.projects"
        :key="`project-${project.id}`"
        :project="project"
      />
    </div>
  </div>
</template>

<style scoped>
.projects-container {
  background-image: url('~/static/pages/projects/bg-dots.svg');
  @apply bg-no-repeat;
  @apply bg-contain;
  @apply bg-center;

  @apply px-5 lg:px-28;
}
</style>
