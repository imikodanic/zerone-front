<script>
import SectionType from '@/enums/SectionType'

export default {
  name: 'SectionTypePickerModal',
  data() {
    return {
      opened: false,
      SectionType,
      typeOptions: [
        { label: 'Text', icon: 'icon-type', value: SectionType.Text },
        { label: 'Gallery', icon: 'icon-image', value: SectionType.Gallery },
        { label: 'Video', icon: 'icon-video', value: SectionType.Video },
      ],
    }
  },
  methods: {
    open() {
      this.opened = true
    },
    close() {
      this.opened = false
    },
    addSection(type) {
      this.$emit('add-section', type)
      this.close()
    },
  },
}
</script>

<template>
  <t-modal :value="opened" width="max-w-3xl" @close="close">
    <div class="w-full pb-10 px-5">
      <h2 class="text-2xl font-medium mb-7">Choose a section type:</h2>
      <div class="flex flex-wrap gap-6">
        <div
          v-for="type in typeOptions"
          :key="`type-${type.value}`"
          class="shadow-lg w-52 h-52 flex flex-col items-center justify-center rounded-xl border cursor-pointer hover:bg-gray-100"
          @click="addSection(type.value)"
        >
          <custom-icon :icon="type.icon" class="w-36 h-36" />
          <span class="text-2xl font-medium">{{ type.label }}</span>
        </div>
      </div>
    </div>
  </t-modal>
</template>
