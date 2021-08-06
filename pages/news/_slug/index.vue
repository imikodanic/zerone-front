<template>
  <div>
    <div class="flex justify-center">
      <div class="max-w-3xl">
        <div class="text-5xl mt-32 font-bold">
          {{ title }}
        </div>
        <div class="my-4 text-lg">
          {{ sub }}
        </div>
        <a
          class="flex items-center no-underline hover:underline text-black"
          href="#"
        >
          <img
            alt="Profile picture"
            class="block rounded-full"
            src="https://picsum.photos/32/32/?random"
          />
          <div class="flex flex-col">
            <span class="ml-2 text-sm font-semibold"> Robert Vranješ </span>
            <span class="ml-2 text-sm"> Jul 17 2021 </span>
          </div>
        </a>
      </div>
    </div>
    <div class="my-5">
      <img
        alt="Article cover"
        class="w-full"
        src="https://picsum.photos/1920/1080/?random"
      />
    </div>
    <div class="flex justify-center">
      <div class="max-w-3xl">
        <div v-html="description" class="mt-8 my-14 text-lg"></div>
      </div>
    </div>

    <div class="flex justify-center">
      <img
        alt="First article image"
        class=""
        src="https://picsum.photos/600/400/?random"
      />
    </div>

    <div class="flex justify-center w-full">
      <div class="max-w-3xl">
        <div v-html="descriptiontwo" class="mt-8 mb-12 text-lg"></div>
      </div>
    </div>
    <div class="mt-5 flex justify-center">
      <a
        href=""
        class="border-2 rounded-3xl border-primary-yellow font-bold text-primary-yellow px-4 py-3 transition duration-300 ease-in-out hover:bg-primary-yellow hover:text-white mr-6"
      >
        School
      </a>
      <a
        href=""
        class="border-2 rounded-3xl border-primary-yellow font-bold text-primary-yellow px-4 py-3 transition duration-300 ease-in-out hover:bg-primary-yellow hover:text-white mr-6"
      >
        Travel
      </a>
      <a
        href=""
        class="border-2 rounded-3xl border-primary-yellow font-bold text-primary-yellow px-4 py-3 transition duration-300 ease-in-out hover:bg-primary-yellow hover:text-white mr-6"
      >
        Math
      </a>
      <a
        href=""
        class="border-2 rounded-3xl border-primary-yellow font-bold text-primary-yellow px-4 py-3 transition duration-300 ease-in-out hover:bg-primary-yellow hover:text-white mr-6"
      >
        English
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Healthier together u sklopu škole',
      sub: 'Razvoj Erasmus projekata na području Osječko-baranjske županije.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut mi gravida, malesuada lorem vel, venenatis lectus. Suspendisse eros sem, vehicula ac ex eget, tristique mattis dolor. Etiam eleifend tortor vel aliquet elementum. Nullam et diam consectetur mauris fermentum bibendum. <br>  <br> \n' +
        'Etiam et lorem magna. Suspendisse volutpat rhoncus nunc in molestie. Sed lectus nulla, faucibus a mi euismod, viverra malesuada augue. Vestibulum id ex nec massa consequat malesuada. Fusce mollis maximus elit, sit amet condimentum ex scelerisque sed.  <br> \n' +
        'Cras pharetra diam ac ligula finibus, at tempor tellus facilisis. <br> <br> \n' +
        'In in arcu sed lacus finibus elementum sit amet vel lorem. Nullam pulvinar tempus viverra. Duis tempor tristique lacus, et consectetur velit bibendum in. Nunc facilisis imperdiet orci sit amet consectetur. Phasellus et ipsum ligula. <br> \n' +
        'Duis condimentum arcu sit amet aliquam mattis. Sed non congue orci, et sagittis velit. Sed sem arcu, dapibus in semper ut, tincidunt a ex.',
      descriptiontwo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ut mi gravida, malesuada lorem vel, venenatis lectus. Suspendisse eros sem, vehicula ac ex eget, tristique mattis dolor. Etiam eleifend tortor vel aliquet elementum. Nullam et diam consectetur mauris fermentum bibendum. <br>  <br> \n' +
        'Etiam et lorem magna. Suspendisse volutpat rhoncus nunc in molestie. Sed lectus nulla, faucibus a mi euismod, viverra malesuada augue. Vestibulum id ex nec massa consequat malesuada. Fusce mollis maximus elit, sit amet condimentum ex scelerisque sed.  <br> \n' +
        'Cras pharetra diam ac ligula finibus, at tempor tellus facilisis. <br> <br> \n' +
        'In in arcu sed lacus finibus elementum sit amet vel lorem. Nullam pulvinar tempus viverra. Duis tempor tristique lacus, et consectetur velit bibendum in. Nunc facilisis imperdiet orci sit amet consectetur. Phasellus et ipsum ligula. <br> \n' +
        'Duis condimentum arcu sit amet aliquam mattis. Sed non congue orci, et sagittis velit. Sed sem arcu, dapibus in semper ut, tincidunt a ex.',
      author: 'Predrag Perić',
    }
  },
}
</script>

<style></style>
