<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  components: { Editor },
  layout: 'project',
  data() {
    return { value: {} }
  },
  methods: {
    save() {
      const { parent_id } = this.$route.query

      this.$emit('create-page', {
        ...this.value,
        parent_id: Number(parent_id),
      })
    },
  },
}
</script>

<template>
  <div>
    <t-input id="page-title" v-model="value.title" label="Title" class="mb-3" />
    <t-checkbox
      id="page-visible"
      v-model="value.is_visible"
      label="Is visible"
      class="mb-3"
    />
    <editor
      id="page-description"
      v-model="value.description"
      api-key="0np66yimd22albamx81hzgkh901xgap5cagf3iytsid7qpsp"
      :init="{
        height: '60vh',
        selector: 'textarea',
        plugins:
          'link casechange formatpainter linkchecker image autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinymcespellchecker',
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
                     alignleft aligncenter alignright alignjustify | \
                     bullist numlist outdent indent | removeformat | help',
        toolbar_mode: 'floating',
      }"
    />
    <div class="mt-5 flex gap-4 justify-end">
      <t-button class="bg-grayscale-gray-light" style="width: 180px !important">
        Cancel
      </t-button>
      <t-button style="width: 150px !important" @click="save">Save</t-button>
    </div>
  </div>
</template>
