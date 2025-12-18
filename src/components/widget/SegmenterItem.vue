<template>
  <div class="lander-segment">
    
    <div class="pyramid"
      v-if="context.layout === 'pyramid'">

      <h2>{{ segment.segmentName }}</h2>

      <contest-item 
        :context="getSegment('contest')"
        :key="`contest_cat_`"
        class="feature"
        />
      
      <div class="subfeatures">
        
        <content-item 
          :context="getSegment('content')"
          :key="`content_cat_`"
          class="subfeature-l"
          />

        <commerce-item 
          :context="getSegment('commerce')"
          :key="`commerce_cat_`"
          class="subfeature-r"
          />

      </div>

    </div>

    <div class="hamburger"
      v-if="context.layout === 'hamburger'">

      <h2>{{ segment.segmentName }}</h2>

      <div class="hamburger-box">
        <contest-item 
          :context="getSegment('contest')"
          :key="`contest_cat_`"
          class="feature"
          />
          
        <content-item 
          :context="getSegment('content')"
          :key="`content_cat_`"
          class="feature"
          />

        <commerce-item 
          :context="getSegment('commerce')"
          :key="`commerce_cat_`"
          class="feature"
          />
      </div>

    </div>

    <div class="tower"
      v-if="context.layout === 'tower'">

      <h2>{{ segment.segmentName }}</h2>

      <div class="skyline">
        <contest-item 
          :context="getSegment('contest')"
          :key="`contest_cat_`"
          class="feature"
          />
          
        <content-item 
          :context="getSegment('content')"
          :key="`content_cat_`"
          class="feature"
          />

        <commerce-item 
          :context="getSegment('commerce')"
          :key="`commerce_cat_`"
          class="feature"
          />
      </div>
    </div>

  </div>
</template>

<script>
//import ImageItem from '@/components/items/ImageItem.vue'
import CommerceItem from '@/components/items/CommerceItem.vue'
import ContentItem from '@/components/items/ContentItem.vue'
import ContestItem from '@/components/items/ContestItem.vue'

export default {
  name: 'SegmenterItem',
  components: {
    CommerceItem, ContentItem, ContestItem,
  },
  props: {
    context: {
      type: Object,
      required: true
    }
  },
  methods: {
    getSegment (_segment) {
      const segments = this.context.segments
      return segments.find(
        segment => segment.contentId === _segment
      );
    }
  }
}
</script>

<style>

</style>