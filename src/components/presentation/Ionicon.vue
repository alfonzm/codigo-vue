<template lang="pug">
  ion-icon.ion-icon(:name="icon")
</template>

<script>

export default {
  name: 'Ionicon',
  props: [
    'icon',
  ],
}
</script>

<style lang="sass" scoped>
.ion-icon
  @apply tw-inline-block
</style>
