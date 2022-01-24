import Vue from 'vue'

const Utils = {
  install(Vue) {
    const utils = Vue.observable({
      windowHeight: 0,
      windowWidth: 0,
      breakpoint: 'xs',
    })

    const breakpoints = {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    }

    Vue.mixin({
      computed: {
        $utils() {
          let sizeUtils = {}

          for (const [key, value] of Object.entries(breakpoints)) {
            const breakpointUtils = {
              [`${key}AndDown`]: utils.windowWidth <= value,
              [`${key}AndUp`]: utils.windowWidth >= value,
              [`${key}Down`]: utils.windowWidth < value,
              [`${key}Up`]: utils.windowWidth > value,
            }

            sizeUtils = { ...sizeUtils, ...breakpointUtils }
          }

          return { ...utils, ...sizeUtils }
        },
      },
    })

    const handleResize = () => {
      utils.windowHeight = window.innerHeight
      utils.windowWidth = window.innerWidth

      for (const breakpoint in breakpoints) {
        // check if object has a property
        if (Object.prototype.hasOwnProperty.call(breakpoints, breakpoint)) {
          if (window.innerWidth >= breakpoints[breakpoint]) {
            utils.breakpoint = breakpoint
          }
        }
      }
    }

    // Something like debounce...
    const throttle = (func, limit) => {
      let inThrottle
      return function () {
        const args = arguments
        const context = this

        if (!inThrottle) {
          inThrottle = true
          setTimeout(() => {
            inThrottle = false
            func.apply(context, args)
          }, limit)
        }
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', throttle(handleResize, 200))
      handleResize()
    }
  },
}

Vue.use(Utils)
