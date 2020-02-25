<template lang="pug">
  .note-list
    note-list-item(v-for="note in notes" :note="note")
  
</template>

<script>
import NoteListItem from '@/components/NoteListItem'

export default {
  name: 'NoteList',
  components: {
    NoteListItem,
  },
  props: ['notes']
}
</script>

<style lang="sass">
</style>
