<template>
  <div class="settings-view">
    <h2 v-if="user">User:</h2>
    <span v-if="user">{{ user }}</span>
    <h2>PropertyId:</h2>
    <p>{{ propertyId }}</p>
    <a @click="$router.go(-1)">BACK</a>
  </div>
</template>

<script>
export default {
  name: 'SettingsView'
}
</script>

<style>

</style>