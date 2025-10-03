<template>
  <div>
    Property: {{ domain.split('.')[0] }}<br/><br/>
    Segment: {{ segment }}
  </div>
</template>

<script>
export default {
  name: 'SegmentView',
  async mounted () {
    if(this.$route.params.segmentId) {
      this.setSegment(this.$route.params.segmentId)
    }
  }
}
</script>

<style>

</style>