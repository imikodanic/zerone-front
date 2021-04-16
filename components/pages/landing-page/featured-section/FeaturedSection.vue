<script>
import ProjectCard from '@/components/pages/landing-page/featured-section/ProjectCard'
export default {
  name: 'FeaturedSection',
  components: { ProjectCard },
  data() {
    return {
      projects: [
        {
          id: 'project1',
          title: 'Healthier together',
          image:
            'https://cdn.jpegmini.com/user/images/slider_puffin_before_mobile.jpg',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. dasd as das...',
        },
        {
          id: 'project2',
          title: 'STEAMFUL',
          image:
            'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. dasd as das...',
        },
        {
          id: 'project3',
          title: 'KreativnOSt',
          image:
            'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. dasd as das...',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="mb-32">
    <h2 class="text-6xl text-center font-bold">Featured projects</h2>
    <div
      class="mx-auto w-32 h-3 bg-primary-yellow mt-10 mb-14 rounded-full"
    ></div>
    <div class="flex justify-around flex-wrap">
      <project-card
        v-for="project in projects"
        :key="`project-${project.name}`"
        :project="project"
        class="mx-5 mb-5"
      />
    </div>
  </div>
</template>
