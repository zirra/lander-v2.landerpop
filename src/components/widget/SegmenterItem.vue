<template>
  <div>
    <div v-if="context.contentId ==='content'"
      class="segment-block">
      <content-item :context="context" id="context.id"/>
    </div>
    <div v-if="context.contentId ==='contest'"
      class="segment-block">
      <contest-item :context="context" id="context.id" />
    </div>
    <div v-if="context.contentId ==='commerce'"
      class="segment-block">
      <commerce-item :context="context" id="context.id" />
    </div>
  </div>
</template>

<script>
import CommerceItem from '@/components/items/CommerceItem.vue'
import ContentItem from '@/components/items/ContentItem.vue'
import ContestItem from '@/components/items/ContestItem.vue'

export default {
  name: 'SegmenterItem',
  components: {
    CommerceItem, ContentItem, ContestItem
  },
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