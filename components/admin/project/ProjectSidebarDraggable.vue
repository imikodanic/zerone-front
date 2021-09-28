<template>
  <draggable
    class="dragArea"
    tag="ul"
    animation="300"
    :value="pages"
    :group="{ name: 'g1', put: checkPut, pull: true }"
    @change="log"
  >
    <li v-for="page in pages" :key="page.id">
      <project-sidebar-item :page="page" />
      <project-sidebar-draggable
        class="ml-4"
        :pages="page.pages"
        :page-id="page.id"
        @add-page="$emit('add-page', $event)"
        @remove-page="$emit('remove-page', $event)"
        @move-page="$emit('move-page', $event)"
      />
    </li>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import ProjectSidebarItem from '~/components/admin/project/ProjectSidebarItem'
export default {
  name: 'ProjectSidebarDraggable',
  components: { draggable, ProjectSidebarItem },
  props: {
    pages: {
      type: Array,
      required: true,
    },
    pageId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    log(e) {
      if (e.added) {
        this.$emit('add-page', {
          toPageId: this.pageId,
          eventData: e.added,
        })
      } else if (e.removed) {
        this.$emit('remove-page', {
          fromPageId: this.pageId,
          eventData: e.removed,
        })
      } else if (e.moved) {
        this.$emit('move-page', {
          inPageId: this.pageId,
          eventData: e.moved,
        })
      }
    },
    checkPut(e) {
      return this.pageId !== 0
    },
  },
}
</script>

<style scoped>
.dragArea {
  /*min-height: 50px;*/
  /*outline: 1px dashed;*/
}
</style>
