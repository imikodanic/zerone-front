<script>
export default {
  name: 'Footer',
}
</script>

<template>
  <div class="footer_container h-full sm:h-52 mt-20 ml">
    <div
      class="px-5 lg:px-32 flex justify-between flex-col items-center sm:items-start sm:flex-row"
    >
      <div class="pb-10 sm:pb-0">
        <h6
          class="uppercase text-sm font-bold text-grayscale-gray-light section_title pb-2 text-center sm:text-left"
        >
          {{ $t('footer.follow') }}
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
          {{ $t('footer.information.title') }}
        </h6>
        <locale-link to="/about" class="mr-20">
          {{ $t('footer.information.about') }}</locale-link
        >
        <locale-link to="/creators2">{{
          $t('footer.information.creators')
        }}</locale-link>
        <br />
        <locale-link to="/terms-of-service" class="mr-14">
          {{ $t('footer.information.tos') }}
        </locale-link>
        <locale-link to="/privacy-policy">{{
          $t('footer.information.privacy')
        }}</locale-link>
      </div>

      <div class="pb-10 sm:pb-0">
        <h6
          class="uppercase text-sm font-bold text-grayscale-gray-light section_title pb-2 text-center sm:text-left"
        >
          {{ $t('footer.contact') }}
        </h6>
        <a
          href="mailto:zerone@elpros.net"
          class="text-primary-purple text-3xl font-bold"
        >
          zerone@elpros.net
        </a>
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
.ml{
  margin-left:25%;
}

</style>
