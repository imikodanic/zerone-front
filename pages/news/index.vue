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
          title: 'Elpros',
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
  <div>
    <div
      class="font-sans text-black bg-white flex items-center justify-end mr-72 mt-20"
    >
      <div class="border rounded overflow-hidden flex">
        <input type="text" class="px-4 py-2" placeholder="Search news..." />
        <button class="flex items-center justify-center px-4 border-l">
          <svg
            class="h-4 w-4 text-grey-dark"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div class="flex flex-wrap justify-center items-center">
      <br />
      <news-card
        v-for="item in news"
        :key="item.id"
        :news="item"
        class="w-full"
      />
    </div>
  </div>
</template>
