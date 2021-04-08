<script>
import GroupCard from '@/components/pages/landing-page/groups-section/GroupCard'
export default {
  name: 'GroupsSection',
  components: { GroupCard },
  data() {
    return {
      groups: [
        {
          title: 'eTwinning projects',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. Nulla eget hendrerit enim. asdasdass',
          image:
            'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg',
        },
        {
          title: 'Erasmus + projects',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. Nulla eget hendrerit enim. asdasdass',
          image:
            'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        },
        {
          title: 'ELPROS Projects',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. Nulla eget hendrerit enim. asdasdass',
          image:
            'https://www.perma-horti.com/wp-content/uploads/2019/02/image-2.jpg',
        },
        {
          title: 'Other projects',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vel enim ultrices justo consequat varius quis at eros. Proin dictum bibendum libero, quis luctus dolor. Nulla eget hendrerit enim. asdasdass',
          image:
            'https://www.publicdomainpictures.net/pictures/320000/velka/background-image.png',
        },
      ],
    }
  },
}
</script>

<template>
  <div class="mb-20">
    <h3 class="text-4xl font-bold">All projects are organized into groups</h3>
    <p class="text-2xl mt-4">
      We organized all of our projects in separate groups so you can easily
      navigate
      <br />
      and learn faster about things you’re interested in.
    </p>
    <div class="mt-10 flex flex-wrap justify-between">
      <div
        v-for="group in groups"
        :key="`group-${group.title}`"
        class="w-full md:w-1/2 p-8"
      >
        <group-card :group="group" />
      </div>
    </div>
  </div>
</template>
