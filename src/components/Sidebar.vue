<template lang="pug">
  .sidebar
    .sidebar__search
      input-text(
        ref="searchField"
        icon="search-outline"
        v-model="searchText"
        placeholder="Search notes..."
        className="sidebar__search-input"
      )
    note-list(:notes="notes")
</template>

<script>
import { ipcRenderer } from 'electron'
import { mapGetters } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

import MenuEvents from '@/menuEvents'

import InputText from '@/components/presentation/InputText'
import NoteList from '@/components/NoteList'

const { mapFields } = createHelpers({
  getterType: 'note/getField',
  mutationType: 'note/updateField',
})

export default {
  name: 'Sidebar',
  components: {
    NoteList,
    InputText,
  },
  computed: {
    ...mapFields(['searchText']),
    ...mapGetters({
      notes: 'note/notesList'
    })
  },
  mounted() {
    ipcRenderer.on(MenuEvents.FIND_NOTE, () => {
      this.$refs.searchField.focus()
    })
  },
}
</script>

<style lang="sass" scoped>
.sidebar
  &__search
    @apply tw-p-2 tw-border-b

  /deep/ &__search-input
    @apply tw-border-0
    // @apply tw-p-2 
    // @apply tw-border-0 tw-border-b tw-border-gray-300

</style>
