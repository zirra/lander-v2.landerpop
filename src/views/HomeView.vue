<template>
  <div class="home">
    {{ appDomain }}<br/><br/>
    <menu-card
      v-for="(segment, id) in application.content"
      :key="id"
      :context="segment" />
  </div>
</template>

<script>
import MenuCard from '@/components/cards/MenuCard.vue'
export default {
  components: { MenuCard },
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
