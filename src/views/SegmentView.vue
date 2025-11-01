<template>
  <div>
    <header-card />
    {{ segment }}
  </div>
</template>

<script>
import HeaderCard from "@/components/cards/HeaderCard.vue"

export default {
  
  components: { HeaderCard },
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
    this.setIsMain(false)
  }
}
</script>

<style>

</style>