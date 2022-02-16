<script>
import Group from '@/classes/admin/Group'
import { required, maxLength } from 'vuelidate/lib/validators'

export default {
  layout: 'admin',
  data() {
    return {
      form: new Group(),
    }
  },
  async created() {
    try {
      const { id } = this.$route.params
      if (!id) return

      const { data } = await this.$axios.$get(`/admin/project-groups/${id}`)

      this.form = new Group(data)
    } catch {}
  },
  methods: {
    async save() {
      const { id } = this.$route.params
      const method = id ? 'patch' : 'post'
      const url = id ? `/admin/project-groups/${id}` : '/admin/project-groups'

      const payload = { ...this.form, media_id: this.form.media_id?.id }

      await this.$axios[method](url, payload)
    },
  },
  validations() {
    return {
      form: {
        title: { required },
        description: { required, maxLength: maxLength(254) },
      },
    }
  },
}
</script>

<template>
  <t-form hide-language-switch :save-method="save">
    <div class="flex flex-col md:flex-row gap-5 md:items-center mb-4">
      <t-input
        id="group-name"
        v-model="form.title"
        :validator="$v.form.title"
        label="Title"
        class="w-full md:w-1/2"
      />
      <t-checkbox
        id="group-is-visible"
        v-model="form.is_visible"
        label="Is visible"
        class="md:mt-3 flex-shrink-0"
      />
    </div>

    <t-file-upload
      id="group-media"
      v-model="form.media_id"
      accept=".gif,.jpg,.jpeg,.jfif,.pjpeg,.pjp,.png"
      label="Group image"
      class="mb-5"
    />

    <t-text-area
      id="group-description"
      v-model="form.description"
      :validator="$v.form.description"
      label="Description"
      rows="5"
      class="mb-5"
    />
  </t-form>
</template>
