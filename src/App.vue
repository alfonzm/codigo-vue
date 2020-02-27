<template lang="pug">
  .app
    toolbar.app__toolbar
    .app__workspace
      sidebar.workspace__sidebar(v-if="isVisible.sidebar")
      editor.workspace__editor(v-if="isVisible.editor")
      preview.workspace__preview(v-if="isVisible.preview")
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapState } from 'vuex'

import MenuEvents from './menuEvents'
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
  },
  mounted() {
    // Open all links in external browser
    let shell = require('electron').shell
    document.addEventListener('click', function (event) {
      if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
        event.preventDefault()
        shell.openExternal(event.target.href)
      }
    })
    
    ipcRenderer.on(MenuEvents.NEW_NOTE, () => {
      this.$store.dispatch('note/createNewNote', true)
    })

    ipcRenderer.on(MenuEvents.TOGGLE_SIDEBAR, () => {
      this.$store.dispatch('ui/toggleViewVisibility', 'sidebar')
    })

    ipcRenderer.on(MenuEvents.TOGGLE_PREVIEW, () => {
      this.$store.dispatch('ui/toggleViewVisibility', 'preview')
    })

    ipcRenderer.on(MenuEvents.TOGGLE_EDITOR, () => {
      this.$store.dispatch('ui/toggleViewVisibility', 'editor')
    })
  },
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
