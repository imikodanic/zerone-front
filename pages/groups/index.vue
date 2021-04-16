<script>
import GroupPreviewCard from '@/components/pages/groups/GroupPreviewCard'
export default {
  components: { GroupPreviewCard },
  data() {
    return {
      groups: [
        {
          id: 11,
          title: 'eTwinning projects',
          image:
            'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et augue ullamcorper felis facilisis convallis non quis dolor. Nunc feugiat pharetra ex, non euismod enim eleifend a. Curabitur metus magna, ornare et eleifend sit amet, convallis vitae sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          coordinator: 'Karolina Brleković',
          projects: 10,
          members: 20,
        },
        {
          id: 12,
          title: 'Erasmus + projects',
          image:
            'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et augue ullamcorper felis facilisis convallis non quis dolor. Nunc feugiat pharetra ex, non euismod enim eleifend a. Curabitur metus magna, ornare et eleifend sit amet, convallis vitae sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          coordinator: 'Marin Kanaet',
          projects: 6,
          members: 12,
        },
        {
          id: 14,
          title: 'Ostali projekti',
          image:
            'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et augue ullamcorper felis facilisis convallis non quis dolor. Nunc feugiat pharetra ex, non euismod enim eleifend a. Curabitur metus magna, ornare et eleifend sit amet, convallis vitae sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          coordinator: 'Ivan Marušić',
          projects: 1,
          members: 23,
        },
        {
          id: 13,
          title: 'Povijest projekti',
          image:
            'https://images.ctfassets.net/hrltx12pl8hq/7yQR5uJhwEkRfjwMFJ7bUK/dc52a0913e8ff8b5c276177890eb0129/offset_comp_772626-opt.jpg?fit=fill&w=800&h=300',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam et augue ullamcorper felis facilisis convallis non quis dolor. Nunc feugiat pharetra ex, non euismod enim eleifend a. Curabitur metus magna, ornare et eleifend sit amet, convallis vitae sapien. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
          coordinator: 'Davor Cvenić',
          projects: 2,
          members: 32,
        },
      ],
    }
  },
}
</script>

<template>
  <div class="groups-container">
    <h1 class="text-4xl font-bold mt-14">Zerone Project Groups</h1>
    <p class="text-2xl mt-4">
      Browse through
      <span class="highlighted-word">5 project groups</span> and explore the
      ones you're interested in.
      <br />
      Our projects are carefully organized so you can get
      <span class="highlighted-word"> the right information </span> faster.
    </p>
    <div class="flex flex-col items-center mt-10 gap-10 pb-2">
      <group-preview-card
        v-for="group in groups"
        :key="`group-${group.id}`"
        :group="group"
      />
    </div>
  </div>
</template>

<style scoped>
.groups-container {
  background-image: url('~/static/pages/projects/bg-dots.svg');
  @apply bg-no-repeat;
  @apply bg-contain;
  @apply bg-center;
  @apply px-5 lg:px-28;

  min-height: calc(100vh - 160px);
}
.highlighted-word {
  @apply text-primary-purple font-bold;
}
</style>
