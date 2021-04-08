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
                'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              title: 'Healthier together Erasmus + Projects',
              image:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              id: 'project1',
              title: 'Healthier together',
              image:
                'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              title: 'Healthier together Erasmus + Projects',
              image:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
              users: 23,
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
              title: 'Healthier together',
              image:
                'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              title: 'Healthier together Erasmus + Projects',
              image:
                'https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
            {
              id: 'project1',
              title: 'Healthier together',
              image:
                'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
              users: 23,
              published_on: 'May 1st, 2021.',
            },
          ],
        },
        {
          id: 'group2',
          title: 'Other projects',
          projects: [
            {
              id: 'project3',
              title: 'Healthier together',
              image:
                'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
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
    <div
      v-for="group in groups"
      :key="`group-${group.id}`"
      class="mt-10 lg:mt-24"
    >
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
