<script>
import ProjectPreviewCard from '@/components/pages/projects/ProjectPreviewCard'
export default {
  components: { ProjectPreviewCard },
  data() {
    return {
      groups: [
        {
          id: 'group1',
          title: 'Erasmus + Projects',
          projects: [
            {
              id: 'project1',
              title: 'Healthier together',
              image:
                'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
              users: 5,
              published_on: 'May 1st, 2021.',
            },
            {
              id: 'project2',
              title: 'STEAMFUL',
              image:
                'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
              users: 10,
              published_on: 'May 5th, 2021.',
            },
            {
              id: 'project3',
              title: 'KreativnOSt',
              image:
                'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              title: 'Random project',
              image:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
              users: 9,
              published_on: 'May 1st, 2021.',
            },
          ],
        },
        {
          id: 'group3',
          title: 'e-Twinning Projects',
          projects: [
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
          ],
        },
        {
          id: 'group2',
          title: 'Other projects',
          projects: [
            {
              id: 'project1',
              title: 'Projekt iz povijesti',
              image:
                'https://i.pinimg.com/originals/27/64/e7/2764e720f8bba785e3b88d2072f403ae.jpg',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              id: 'project2',
              title: 'Projekt za biologiju',
              image:
                'https://media.discordapp.net/attachments/773590074133577808/832506379754536990/laptop-5987093_960_720.png',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <div class="projects-container">
    <h1 class="text-4xl font-bold mt-14">All projects</h1>
    <p class="text-2xl mt-4">
      These are all projects in our database from which you can get
      <span class="text-primary-purple font-bold">all the information</span>.
    </p>
    <div v-for="group in groups" :key="`group-${group.id}`" class="mt-20">
      <div class="flex items-center">
        <div class="w-10 h-2 bg-primary-yellow rounded-full mr-5"></div>
        <h1 class="text-3xl font-bold">{{ group.title }}</h1>
      </div>
      <div
        class="mt-9 flex flex-col items-center flex-wrap gap-10 md:flex-row md:px-16"
      >
        <project-preview-card
          v-for="project in group.projects"
          :key="`group-${group.id}-project-${project.id}`"
          :project="project"
        />
      </div>
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
