<script>
export default {
  name: 'Footer',
}
</script>

<template>
  <div class="footer_container -mx-5 lg:-mx-32 h-full sm:h-52">
    <div
      class="px-5 lg:px-32 flex justify-between flex-col items-center sm:flex-row"
    >
      <div class="pb-10 sm:pb-0">
        <h6
          class="uppercase text-sm font-bold text-grayscale-gray-light section_title pb-2 text-center sm:text-left"
        >
          Follow us
        </h6>
        <a href="http://elpros.net/" target="_blank">
          <img
            src="@/static/pages/landing-page/icon-website.svg"
            alt="ELPROS Website"
            class="inline"
          />
        </a>
        <a
          href="https://www.facebook.com/knjiznica.elpros.osijek"
          target="_blank"
        >
          <img
            src="@/static/pages/landing-page/icon-facebook.svg"
            alt="Facebook"
            class="inline mx-4"
          />
        </a>
        <a
          href="https://www.youtube.com/channel/UCjfN6w-DNjB7fShkNK7Hryg"
          target="_blank"
        >
          <img
            src="@/static/pages/landing-page/icon-youtube.svg"
            alt="Youtube"
            class="inline"
          />
        </a>
      </div>
      <div class="pb-10 sm:pb-0">
        <h6
          class="uppercase text-sm font-bold text-grayscale-gray-light section_title pb-2 text-center sm:text-left"
        >
          Information
        </h6>
        <nuxt-link to="/about" class="mr-20"> About Zerone</nuxt-link>
        <nuxt-link to="/creators">Creators</nuxt-link>
        <br />
        <nuxt-link to="/terms-of-service" class="mr-14">
          Terms of Service
        </nuxt-link>
        <nuxt-link to="/privacy-policy">Privacy Policy</nuxt-link>
      </div>

      <div class="pb-10 sm:pb-0">
        <h6
          class="uppercase text-sm font-bold text-grayscale-gray-light section_title pb-2 text-center sm:text-left"
        >
          Contact us
        </h6>
        <h2 class="text-primary-purple text-3xl font-bold">
          zerone@elpros.net
        </h2>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer_container {
  background-image: url('~/static/pages/landing-page/bg-footer-wave.svg');
  @apply bg-bottom;
  @apply bg-no-repeat;
  @apply bg-contain;
}
.section_title {
  letter-spacing: 2.5px;
}
</style>
