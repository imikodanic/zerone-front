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
    <div class="word-break">
      <template v-for="section in page.sections">
        <div :key="section.id || section._key" v-html="section.value"></div>
      </template>
    </div>
  </div>
</template>
