<template>
  <div>
    <image-item :context="{ url: context.image, alt: context.title }" />
  </div>
</template>

<script>
import ImageItem from './ImageItem.vue'
export default {
  name: 'ContentItem',
  components: { ImageItem },
  props: {
    context: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>