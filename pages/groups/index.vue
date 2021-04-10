<script>
export default {}
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
  </div>
</template>

<style scoped>
.groups-container {
  background-image: url('~/static/pages/projects/bg-dots.svg');
  @apply bg-no-repeat;
  @apply bg-contain;
  @apply bg-center;

  @apply px-5 lg:px-28;
}
.highlighted-word {
  @apply text-primary-purple font-bold;
}
</style>
