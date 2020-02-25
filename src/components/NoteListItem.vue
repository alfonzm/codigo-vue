<template lang="pug">
  .note(:class="{ 'selected': isSelected }" @click="selectNote")
    span.note__title {{ note.title }}
    p.note__excerpt {{ note.excerpt }}
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'NoteListItem',
  props: ['note'],
  computed: {
    ...mapState({
      currentNoteId: state => state.note.currentNoteId,
    }),
    isSelected() {
      return this.note.id == this.currentNoteId
    },
  },
  methods: {
    selectNote() {
      if(this.isSelected) { return }
      this.$store.dispatch('note/selectNote', this.note.id)
    },
  },
}
</script>

<style lang="sass" scoped>
@mixin one-line
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.note
  @apply tw-p-2 tw-text-xs tw-border-b tw-border-gray-100

  &.selected
    @apply tw-bg-gray-200 // tw-text-white

  &:hover
    @apply tw-cursor-pointer

    &:not(.selected)
      @apply tw-bg-gray-100

  &__title, &__excerpt
    @include one-line

  &__title
    @apply tw-font-bold

  &__excerpt
    @apply tw-text-gray-500

  // &:not(.selected) .note__excerpt
  //   @apply tw-text-gray-400
</style>
