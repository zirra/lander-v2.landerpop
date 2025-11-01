<template>
  <footer>
    <div>
      <span class="material-symbols-outlined"
        @click="mainMenu"
        v-if="!isMain">
        home
      </span>
      <span class="material-symbols-outlined"
        @click="showMenu">
        menu
      </span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterCard'
}
</script>

<style>

</style>