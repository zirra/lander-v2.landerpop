<template>
  <router-view/>
  <footer-card />
</template>

<script>
import FooterCard from "./components/cards/FooterCard.vue"

export default {
  components: { FooterCard }
}
</script>

<style lang="scss">
@import 'assets/scss/style';
</style>
