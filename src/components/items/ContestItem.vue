<template>
  <div class="segment-card">
    <h2>{{ context.title }}</h2>
    <p v-html="context.content"></p><br/>
    <button @click="openUrl(context.link.url)" v-if="context.link" >{{ context.link.button}}</button>
  </div>
</template>

<script>
export default {
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