<template>
  <div class="home">
    {{ appDomain }}<br/><br/>
    <div v-for="(segment, id) in application.content"
      :key="id"
      style="width: 94%; margin: 3%;">
      <img 
        :src="`${imageRoot}${application.propertyId}/${segment.image}`" 
        @click="$router.push(segment.routeName)"/><br/>
      <a 
        @click="$router.push(segment.routeName)">View {{ segment.segmentName }}
      </a>
        <br/><br/>
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
