<template>
  <div class="pt-10 px-5 justify-center">
    <h1 class="text-5xl sm:text-6xl text-center">
      {{ $t('page.whatwedo.title') }}
    </h1>
    <div
      class="flex flex-col lg:flex-row lg:w-full mt-24 gap-12 mx-auto max-w-7xl"
    >
      <div class="w-1/2">
        <img
          src="https://picsum.photos/540/420/?random"
          alt="Placeholder image"
        />
      </div>
      <div class="text-3xl w-1/2 justify-center">
        {{ $t('page.whatwedo.content') }}
      </div>
    </div>
  </div>
</template>
