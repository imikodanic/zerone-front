<script>
import NewsCard from '@/components/pages/news/NewsCard'

export default {
  components: { NewsCard },
  data() {
    return {
      news: [
        {
          title: 'eTwinning',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Robert Vranješ',
          date: 'Mar 15, 2020',
          slug: 'etwinning',
        },
        {
          title: 'Healthier Together',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Robert Vranješ',
          date: 'Mar 15, 2020',
          slug: 'healthier-together',
        },
        {
          title: 'Math in Media',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Robert Vranješ',
          date: 'Mar 15, 2020',
          slug: 'math-in-media',
        },
        {
          title: 'Inshallah',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Robert Vranješ',
          date: 'Mar 15, 2020',
          slug: 'inshallah',
        },
        {
          title: 'Lorem Ipsum',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Robert Vranješ',
          date: 'Mar 15, 2020',
          slug: 'lorem-ipsum',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="flex flex-wrap gap-20 justify-between items-center">
    <br />
    <news-card
      v-for="item in news"
      :key="item.id"
      :news="item"
      class="w-full md:w-1/2"
    />
  </div>
</template>
