<template>
  <div>
    Property: {{ domain.split('.')[0] }}<br/><br/>
    Segment: {{ segment }}<br/><br/>
    {{ propertyId }}<br/><br/>
    {{ application }}
  </div>
</template>

<script>
export default {
  name: 'SegmentView',
  async mounted () {
    this.setBranding(this.application.branding)
    this.setPropertyId(this.application.propertyId)
    if(this.$route.params.segmentId) {
      this.setSegment(this.$route.params.segmentId)
    } else {
      this.setSegment('welcome')
    }
  }
}
</script>

<style>

</style>