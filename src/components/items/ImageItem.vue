<template>
  <img :src="`${imageRoot}${propertyId}/${context.url}`" :alt="context.alt" />
</template>

<script>
export default {
  name: 'ImageItem',
  props: {
    context: {
      type: Object,
      required: true
    }
  }
}
</script>