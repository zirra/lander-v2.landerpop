<template>
  <div class="menu-card">
    <img 
      :src="`${imageRoot}${application.propertyId}/${context.image}`" 
      @click="$router.push(context.routeName)"/><br/>
    <p>
      <a @click="$router.push(context.routeName)">View {{ context.segmentName }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'MenuCard',
  props: {
    context: {
      type: Object,
      required: true
    }
  }
}
</script>