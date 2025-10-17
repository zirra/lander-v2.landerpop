<template>
  <header-card/>
  <router-view/>
</template>

<script>
import HeaderCard from './components/cards/HeaderCard.vue'
export default {
  components: { HeaderCard },
  
}
</script>

<style lang="scss">
@import 'assets/scss/style';
</style>
