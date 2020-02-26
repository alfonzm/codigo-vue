<template lang="pug">
  .app
    toolbar.app__toolbar
    .app__workspace
      sidebar.workspace__sidebar(v-if="isVisible.sidebar")
      editor.workspace__editor(v-if="isVisible.editor")
      preview.workspace__preview(v-if="isVisible.preview")
</template>

<script>
import { mapState } from 'vuex'

import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'
import Sidebar from './components/Sidebar.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    Editor,
    Preview,
    Sidebar,
    Toolbar,
  },
  computed: {
    ...mapState({
      isVisible: state => state.ui.isVisible
    })
  }
}
</script>

<style lang="sass">
.app
  @apply tw-h-screen tw-flex tw-flex-col

  &__toolbar
    @apply tw-flex-grow-0 tw-flex-shrink-0 
    flex-basis: 40px

  &__workspace
    @apply tw-flex tw-flex-grow tw-h-full tw-overflow-scroll

.workspace
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
