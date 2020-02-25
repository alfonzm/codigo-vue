<template lang="pug">
  .workspace
    sidebar.workspace__sidebar
    editor.workspace__editor
    preview.workspace__preview
</template>

<script>
import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Editor,
    Preview,
    Sidebar,
  }
}
</script>

<style lang="sass">
.workspace
  @apply tw-flex tw-h-screen

  &__editor, &__preview, &__sidebar
    @apply tw-overflow-y-scroll

  &__editor, &__preview
    @apply tw-flex-grow tw-h-full
    flex-basis: 0

  &__sidebar
    @apply tw-flex-grow-0 tw-flex-shrink-0
    flex-basis: 180px

  &__sidebar, &__editor
    @apply tw-border-r

</style>
