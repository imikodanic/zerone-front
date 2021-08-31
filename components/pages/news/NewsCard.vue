<script>
export default {
  name: 'NewsCard',
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
}
</script>

<template>
  <nuxt-link :to="`/news/${news.slug}`" class="max-w-3xl">
    <br />
    <br />
    <div class="mx-5">
      <div
        class="grid grid-cols-3 grid-rows-7 grid-flow-row overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out"
      >
        <div class="col-span-3 row-span-2">
          <a href="#">
            <img
              src="https://picsum.photos/640/400/?random"
              alt="Placeholder"
              class="rounded-t-xl object-cover h-64 w-full"
            />
          </a>
        </div>

        <div class="ml-4 mt-4">
          <p class="text-blue-700 font-medium">{{ $t('newscard.type') }}</p>
        </div>

        <div class="col-span-3 row-span-1">
          <header
            class="flex items-center justify-between leading-tight p-2 md:p-4"
          >
            <h1 class="text-lg">
              <a
                class="no-underline hover:underline text-black font-bold"
                href="#"
              >
                {{ news.title }}
              </a>
            </h1>
          </header>
        </div>

        <div class="col-span-3 row-span-1 ml-4">
          <p>
            {{ news.description }}
          </p>
        </div>

        <div class="col-span-3 row-span-1 mt-2">
          <div class="flex align-bottom flex-col leading-none p-2 md:p-4">
            <div class="flex flex-row justify-between items-center">
              <a
                class="flex items-center no-underline hover:underline text-black"
                href="#"
              >
                <img
                  alt="Placeholder"
                  class="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <div class="flex flex-col">
                  <span class="ml-2 text-sm font-semibold">
                    {{ news.author }}
                  </span>
                  <span class="ml-2 text-sm"> {{ news.date }}</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
