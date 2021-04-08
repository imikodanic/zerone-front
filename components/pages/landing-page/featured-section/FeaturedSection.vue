<script>
import ProjectCard from '@/components/pages/landing-page/featured-section/ProjectCard'
export default {
  name: 'FeaturedSection',
  components: { ProjectCard },
  data() {
    return {
      projects: [
        {
          title: 'Healthier together - Erasmus + project',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. dasd as das...',
          image:
            'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
        },
        {
          title: 'Healthier together - Erasmus + project',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. dasd as das...',
          image:
            'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
        },
        {
          title: 'Healthier together - Erasmus + project',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. dasd as das...',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png',
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
