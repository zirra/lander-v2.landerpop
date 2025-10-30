<template>
  <div class="home">
    <header-card />
    <menu-card
      v-for="(segment, id) in application.content"
      :key="id"
      :context="segment" />
  </div>
</template>

<script>
import MenuCard from '@/components/cards/MenuCard.vue'
import HeaderCard from '@/components/cards/HeaderCard.vue'
export default {
  components: { MenuCard, HeaderCard },
  name: 'HomeView',
  data: () => ({
    appDomain: null
  }),
  async mounted () {
    this.appDomain = this.domain.split('.')[0]
    this.setBranding(this.application.branding)
    this.setPropertyId(this.application.propertyId)
  }
}
</script>
