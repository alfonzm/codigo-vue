<template lang="pug">
  .workspace
    editor.workspace__editor
    preview.workspace__preview
</template>

<script>
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'

export default {
  name: 'App',
  components: {
    Editor,
    Preview,
  }
}
</script>

<style lang="sass" scoped>

.workspace
  @apply tw-flex tw-h-screen

  &__editor, &__preview
    @apply tw-flex-grow tw-h-full tw-overflow-y-scroll
    flex-basis: 0

  &__editor
    @apply tw-border-r

</style>
