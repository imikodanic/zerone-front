<script>
import Editor from '@tinymce/tinymce-vue'

export default {
  name: 'SectionText',
  components: { Editor },
  props: {
    value: {
      type: String,
      default: null,
    },
    edit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    setValue(value) {
      this.$emit('input', value)
    },
  },
}
</script>

<template>
  <div>
    <editor
      v-if="edit"
      :value="value"
      api-key="0np66yimd22albamx81hzgkh901xgap5cagf3iytsid7qpsp"
      :init="{
        height: '60vh',
        selector: 'textarea',
        plugins:
          'link casechange formatpainter linkchecker autolink lists checklist mediaembed pageembed permanentpen powerpaste table advtable tinymcespellchecker',
        toolbar:
          'undo redo | formatselect | bold italic backcolor | \
                     alignleft aligncenter alignright alignjustify | \
                     bullist numlist outdent indent | removeformat | help',
        toolbar_mode: 'floating',
      }"
      @input="setValue"
    />
    <div v-else v-html="value" class="unreset"></div>
  </div>
</template>
