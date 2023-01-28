<script>
import GroupCard from '@/components/pages/landing-page/groups-section/GroupCard'
import NewsCard from '@/components/pages/news/NewsCard'
export default {
  name: 'GroupsSection',
  components: { GroupCard, NewsCard },
  props: {
    projectGroups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      featuredNews: [],
      news: [
        {
          title: 'eTwinning',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'etwinning',
        },
        {
          title: 'Healthier Together',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'healthier-together',
        },
        {
          title: 'Math in Media',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'math-in-media',
        },
        {
          title: 'Elpros',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'inshallah',
        },
        {
          title: 'Lorem Ipsum',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'lorem-ipsum',
        },
        {
          title: 'Lorem Ipsum',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'lorem-ipsum',
        },
        {
          title: 'Lorem Ipsum',
          description:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto\n' +
            '            accusantium praesentium eius, ut atque fuga culpa, similique sequi\n' +
            '            cum eos quis dolorum.',
          author: 'Domagoj Vukosavljević',
          date: 'Mar 15, 2023',
          slug: 'lorem-ipsum',
        }
      ],
    }
  },
  created () {
    this.featuredNews = this.news.slice(0,1);
    this.news = this.news.slice(1,this.news.length)
  }
}
// ovako ces odradit; znaci napravit ces za svaki post novu komponentu na koju ces odvest kad klikne i copy pejstas svaku istu komponentu sam promjenis content vrlo jednostavno nakon prve vjv
// i onda si s tim gootov a za projekte ces morat napravit 4 razliite komponente koje imaju nekakkav kao wrapper ustv uzmi onaj od group elemenata i onda  napravi jos novih komponenata na kojima se nalaze ove
// i tu si gotov za prikrivanje toga
</script>

<template>
  <div>
      <news-card v-for="newItem in featuredNews" :key="newItem.id" :news="newItem" class="w-full" />
  <div class="grid grid-cols-2">
    <!-- <h3 class="text-4xl font-bold">{{ $t('page.index.projects') }}</h3>
    <p class="text-2xl mt-4">
      {{ $t('page.index.projectsdesc') }}
    </p> -->
    <news-card v-for="item in news" :key="item.id" :news="item" class="w-full" />
    <div class="mt-10 flex flex-wrap justify-between">
      <news-card v-for="group in projectGroups" :key="`group-${group.title}`" class="w-full md:w-1/2 py-8 sm:px-8">
        <group-card :group="group" />
      </news-card>
    </div>
  </div>
  </div>
</template>
