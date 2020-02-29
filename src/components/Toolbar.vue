<template lang="pug">
  .toolbar
    .toolbar__start
      toolbar-button.toolbar__btn(@click="createNewNote") New Note +
      toolbar-button.toolbar__btn(@click="deleteAllNotes") Delete All x
    .toolbar__end
      toolbar-button.toolbar__btn(@click="togglePane('editor')") Toggle Editor
      toolbar-button.toolbar__btn(@click="togglePane('sidebar')") Toggle Sidebar
      toolbar-button.toolbar__btn(@click="togglePane('preview')") Toggle Preview
</template>

<script>

import ToolbarButton from '@/components/presentation/ToolbarButton'

export default {
  name: 'Toolbar',
  components: {
    ToolbarButton,
  },
  computed: {
  },
  methods: {
    createNewNote() {
      this.$store.dispatch('note/createNewNote', true)
    },
    deleteAllNotes() {
      if(confirm('Delete all notes?')) {
        this.$store.dispatch('note/deleteAllNotes')
      }
    },
    togglePane(paneName) {
      this.$store.dispatch('ui/toggleViewVisibility', paneName)
    },
  },
}
</script>

<style lang="sass">
.toolbar
  @apply tw-flex tw-justify-between

  &__btn
    @apply tw-mr-1
</style>
