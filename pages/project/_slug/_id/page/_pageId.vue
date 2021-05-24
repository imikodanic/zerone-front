<script>
export default {
  async asyncData({ $axios, params }) {
    const { data } = await $axios.get(`/public/pages/${params.pageId}`)

    const page = data.data
    return { page }
  },
  data() {
    return { page: {} }
  },
}
</script>

<template>
  <div>
    <h2 class="text-4xl mb-3">
      {{ page.title }}
    </h2>
    <div class="break-words">
      <div v-html="page.description"></div>
    </div>
  </div>
</template>
