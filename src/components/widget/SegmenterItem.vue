<template>
  <div>
    <div v-if="context.contentId ==='content'"
      class="segment-block">
      <h2>{{ context.title }}</h2>
      <p v-html="context.content"></p><br/>
      <button @click="openUrl(context.link.url)">{{ context.link.button}}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SegmenterItem',
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