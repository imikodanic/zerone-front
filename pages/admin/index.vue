<script>
export default {
  layout: 'admin',

  head() {
    return {
      title: 'Zerone - Admin',
    }
  },
}
</script>

<template>
  <div class="flex flex-col gap-20 justify-center items-center h-screen">
    <h1 class="text-7xl sm:text-8xl font-extrabold text-center">
      Coming
      <span class="relative">
        <span class="text-6xl sm:text-8xl text-primary-red block sm:inline">
          soon
        </span>
      </span>
    </h1>
    <nuxt-link to="/" class="text-4xl underline">Go back</nuxt-link>
  </div>
</template>
