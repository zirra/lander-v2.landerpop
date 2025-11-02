<template>
  <div>
    <h2>{{ context.title }}</h2>
    <p v-html="context.content"></p><br/>
    <button @click="openUrl(context.link.url)">{{ context.link.button}}</button>
  </div>
</template>

<script>
export default {
  name: 'ContentItem',
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