<template>
  <div v-if="segment">
    
    <header-card />

    <h2>{{ segment.segmentName }}</h2>
    <image-item 
      :context="{url: segment.image, alt: segment.segmentName }" 
      />

    <segmenter-item 
      v-for="(seg, id) in segment.segments"
      :context="seg"
      :key="id" />
      
  </div>
</template>

<script>
import HeaderCard from "@/components/cards/HeaderCard.vue"
import ImageItem from '@/components/items/ImageItem.vue'
import SegmenterItem from '@/components/widget/SegmenterItem.vue'

export default {
  
  components: { HeaderCard, ImageItem, SegmenterItem },
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