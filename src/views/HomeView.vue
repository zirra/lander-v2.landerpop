<template>
  <div class="home">
    {{ appDomain }}<br/><br/>
    <div v-for="(segment, id) in application.content"
      :key="id">
      {{ segment }}<br/><br/>
      <a @click="$router.push(segment.routeName)">View</a><br/><br/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data: () => ({
    appDomain: null
  }),
  async mounted () {
    this.appDomain = this.domain.split('.')[0]
  }
}
</script>
