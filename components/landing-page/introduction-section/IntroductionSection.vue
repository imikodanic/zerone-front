<script>
export default {
  name: 'IntroductionSection',
}
</script>

<template>
  <div>
    <div class="introduction-section -mx-32" style="height: 1300px">
      <div class="pt-20 text-center">
        <h1 class="text-8xl font-extrabold keyword-highlight">
          One
          <span class="relative">
            <span class="text-primary-red"> project </span>

            <!--            <span-->
            <!--              class="bg-primary-green absolute rounded-full inline w-full h-10 left-0 bottom-0"-->
            <!--            ></span>-->
          </span>
        </h1>
        <h2 class="text-6xl font-black mt-5">To rule them all</h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.introduction-section {
  background-image: url('~/static/landing-page/section-1/bg-section-1.svg');
  @apply bg-contain;
  @apply bg-no-repeat;
}
.keyword-highlight {
  text-shadow: 0 4px 0 #ffffff;
}
</style>
