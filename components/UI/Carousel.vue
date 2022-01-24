<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

export default {
  components: {
    VueSlickCarousel,
  },
  props: {
    slides: {
      type: Array,
      default: () => [],
      required: false,
    },
    hideArrows: {
      type: Boolean,
      default: false,
    },
    slidesToShow: {
      type: Number,
      default: 3,
    },
    noCenter: {
      type: Boolean,
      default: false,
    },
    // Not the best way to do this but it works...
    arrowPosition: {
      type: String,
      default: '40',
    },
  },
  data() {
    return {
      currentSlide: 0,
      openedImage: null,
    }
  },
  computed: {
    carouselSettings() {
      const { lgAndDown, xlAndDown } = this.$utils

      const mobileSlides = this.slidesToShow - 2
      const tabletSlides = this.slidesToShow - 1
      const slidesToShow = lgAndDown
        ? mobileSlides
        : xlAndDown
        ? tabletSlides
        : this.slidesToShow

      const centerMode = !this.noCenter && this.slides.length < 3

      return {
        autoplay: true,
        autoplaySpeed: 5000,
        arrows: !this.hideArrows,
        dots: true,
        dotsClass: 'slider-dots',
        pauseOnDotsHover: true,
        pauseOnHover: true,
        draggable: false,
        slidesToShow,
        slidesToScroll: 1,
        centerMode,
      }
    },
  },
  methods: {
    openPreview(slide) {
      this.openedImage = slide
    },
    closePreview() {
      this.openedImage = null
    },
  },
}
</script>

<template>
  <div>
    <!-- PREVIEW MODAL -->
    <t-modal :value="!!openedImage" width="max-w-5xl">
      <div class="flex justify-end mb-5"></div>
      <!-- Don't render this slot if there's no openedImage because it returns slide as null so any reference to it would break -->
      <div v-if="openedImage" class="w-full h-auto">
        <slot name="slide" :slide="openedImage">
          <img :src="openedImage" alt="Image preview" class="border mx-auto" />
        </slot>
      </div>
    </t-modal>
    <vue-slick-carousel v-bind="carouselSettings">
      <!-- By default slide would be an image URL -->
      <div
        v-for="(slide, i) in slides"
        :key="`slide-${i}`"
        class="cursor-pointer"
        @click="openPreview(slide)"
      >
        <slot name="slide" :slide="slide">
          <img :src="slide" :alt="`Gallery slide ${i}`" />
        </slot>
      </div>
      <div v-if="!slides.length" class="text-center">No images</div>
    </vue-slick-carousel>
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
.slider-dots {
  width: fit-content;
  @apply mx-auto;
  @apply mt-4 lg:mt-7;
}
.slider-dots li {
  background-color: #2f80bc;
  border-radius: 50%;
  width: 7px;
  height: 7px;
  margin: 0 4px;
  cursor: pointer;
  display: inline-block;

  opacity: 0.5;
}
.slider-dots li button {
  display: none;
}
.slick-active {
  opacity: 1 !important;
}

.slick-slide {
  @apply px-0 md:px-2.5;
}
</style>
