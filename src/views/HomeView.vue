<template>
  <div class="home">
    {{ appDomain }}<br/><br/>
    {{ application }}<br/>
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
