<template>
  <div>
   <image-item :context="{ url: context.image, alt: context.title }" />
  </div>
</template>

<script>
import ImageItem from './ImageItem.vue'
export default {
  components: { ImageItem },
  name: 'ContestItem',
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