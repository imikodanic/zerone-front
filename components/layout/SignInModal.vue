<script>
export default {
  name: 'SignInModal',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
    }
  },
  methods: {
    closeModal() {
      this.$emit('input', false)
    },
    async signIn() {
      try {
        await this.$auth.loginWith('local', {
          data: this.form,
        })

        this.$toast.success('Successfully signed in!')
        this.closeModal()
      } catch (e) {
        this.$toast.error(this.$extractError(e))
      }
    },
  },
}
</script>

<template>
  <t-modal :value="value" width="max-w-3xl" @close="closeModal">
    <div class="w-full">
      <div class="pt-5 sm:pt-10 pb-4 flex justify-center">
        <img src="/logos/logo-horizontal.svg" alt="Logo" />
      </div>
      <div class="px-12 sm:px-24 md:px-48 lg:px-12 xl:px-24 xl:max-w-2xl">
        <div class="my-12">
          <form>
            <div>
              <div class="text-sm font-bold tracking-wide">Email Address</div>
              <input
                v-model="form.email"
                class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="email"
                placeholder="Enter your e-mail address"
                @keyup.enter="signIn"
              />
            </div>
            <div class="mt-8">
              <div class="flex justify-between items-center">
                <div class="text-sm font-bold text-gray-700 tracking-wide">
                  Password
                </div>
                <!--                <div>-->
                <!--                  <a-->
                <!--                    class="text-xs font-display font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"-->
                <!--                  >-->
                <!--                    Forgot Password?-->
                <!--                  </a>-->
                <!--                </div>-->
              </div>
              <input
                v-model="form.password"
                class="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                type="password"
                placeholder="Enter your password"
                @keyup.enter="signIn"
              />
            </div>
            <div class="mt-10 sm:w-1/2 mx-auto">
              <t-button class="py-2.5 sm:py-3 text-xl" @click="signIn">
                Sign in
              </t-button>
            </div>
          </form>
          <!--          <div-->
          <!--            class="text-sm font-display font-semibold text-gray-700 text-center"-->
          <!--          >-->
          <!--            Don't have an account ?-->
          <!--            <a class="cursor-pointer text-indigo-600 hover:text-indigo-800">-->
          <!--              Sign up-->
          <!--            </a>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </t-modal>
</template>
