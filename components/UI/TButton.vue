<template>
  <button
    type="button"
    class="bg-primary-purple w-full font-bold px-12 py-2 rounded-full hover:bg-secondary-purple transition-colors"
    @click="$emit('click')"
  >
    <span class="text-shadow text-grayscale-white">
      <slot />
    </span>
  </button>
</template>
