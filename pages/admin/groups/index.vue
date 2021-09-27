<script>
import TDataDisplay from '@/components/admin/containers/preview/TDataDisplay'
export default {
  components: {
    TDataDisplay,
  },
  layout: 'admin',
  data() {
    return {
      headers: [
        { title: 'Title', value: 'title', width: '25%' },
        { title: 'Description', value: 'description', width: '65%' },
        {
          title: 'Visible',
          value: 'is_visible',
          type: 'boolean',
          trueText: 'Visible',
          falseText: 'Invisible',
          width: '10%',
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <t-data-display
      title="Groups"
      api-url="/admin/project-groups"
      :headers="headers"
      fetch-delay="500"
    />
  </div>
</template>
