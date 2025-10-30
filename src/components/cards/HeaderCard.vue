<template>
  <header v-if="application.branding.logo">
    <image-item :context="application.branding.logo" />
  </header>
</template>

<script>
import ImageItem from '../items/ImageItem.vue'
export default {
  components: { ImageItem },
  name: 'HeaderCard'
}
</script>

<style>

</style>