<template>
  <div>
    Property: {{ domain.split('.')[0] }}<br/><br/>
    {{ segment }}
  </div>
</template>

<script>
export default {
  name: 'SegmentView',
  async mounted () {
    this.setBranding(this.application.branding)
    this.setPropertyId(this.application.propertyId)
    if(this.$route.params.segmentId) {
      const seg = this.application.content.find(item => item.routeName === this.$route.params.segmentId)
      if( seg ) {
        this.setSegment(seg)
      } else {
        this.setSegment('main')
        this.$router.push({name: 'home'})
      }
    } else {
      this.setSegment('main')
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style>

</style>