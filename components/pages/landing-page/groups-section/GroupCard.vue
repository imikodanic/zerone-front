<script>
export default {
  name: 'GroupCard',
  props: {
    group: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="shadow rounded-3xl p-4 pt-0 sm:p-8">
    <!-- Box with title, desc and image -->
    <div class="flex justify-between flex-col xl:flex-row items-center">
      <!-- Title, desc and button on 2xl screen -->
      <div
        class="mt-5 flex flex-col justify-center order-2 xl:order-1 xl:mr-6 xl:mt-0 2xl:items-start"
      >
        <h3 class="text-3xl font-extrabold text-center xl:text-left">
          {{ group.title }}
        </h3>
        <p
          class="mt-2 max-w-full text-center 2xl:text-base xl:hidden 2xl:block 2xl:text-left"
        >
          {{ group.description }}
        </p>
        <nuxt-link :to="`/group/${group.id}`">
          <t-button class="mt-4 px-12 py-2 md:w-auto hidden 2xl:block">
            Open
          </t-button>
        </nuxt-link>
      </div>
      <!-- Image -->
      <div class="w-72 h-72 xl:w-56 xl:h-56 flex-shrink-0 order-1 xl:order-2">
        <img
          :src="group.image || '/logos/logo.svg'"
          alt="Demo"
          class="object-cover w-full h-full rounded-2xl"
        />
      </div>
    </div>
    <!-- Full width button (hidden on 2xl screen) -->
    <nuxt-link :to="`/group/${group.id}`">
      <t-button class="mt-8 px-12 py-2 block w-full 2xl:hidden">
        Open
      </t-button>
    </nuxt-link>
  </div>
</template>
