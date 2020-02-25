<template lang="pug">
  .sidebar
    note-list(:notes="notes")
</template>

<script>
import { mapGetters } from 'vuex'

import NoteList from '@/components/NoteList'

export default {
  name: 'Sidebar',
  components: {
    NoteList,
  },
  computed: {
    ...mapGetters({
      notes: 'note/notesList'
    })
  },
}
</script>

<style lang="sass">
</style>
