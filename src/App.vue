<template lang="pug">
  #app
    editor
</template>

<script>
import Editor from './components/Editor.vue'

export default {
  name: 'App',
  components: {
    Editor
  }
}
</script>

<style lang="sass" scoped>

#app
  @apply bg-red-500

</style>
