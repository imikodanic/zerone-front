<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <div class="w-96 shadow-lg rounded-3xl">
    <div class="h-64 rounded-t-3xl bg-gray-300">
      <img
        :src="project.image"
        alt="Demo"
        class="object-cover rounded-t-3xl w-full h-full"
      />
    </div>
    <div class="h-72 px-8 mt-4">
      <h3 class="text-2xl lg:text-3xl font-bold">
        {{ project.title }}
      </h3>
      <p class="text-grayscale-gray mt-2">
        {{ project.description }}
      </p>
      <button
        class="float-right bg-primary-purple font-bold mt-4 px-12 py-2 mb-4 rounded-full"
      >
        <span class="text-shadow text-grayscale-white"> View </span>
      </button>
    </div>
  </div>
</template>
