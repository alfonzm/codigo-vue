<template lang="pug">
  .note(:class="{ 'selected': isSelected }" @click="selectNote" @click.meta="addNoteToSelection")
    button.note__delete(@click="deleteNote") ×
    p.note__title {{ note.title || 'New note' }}
    p.note__subtitle
      span.note__timestamp {{ prettyTimestamp }}
      |
      span.note__excerpt {{ note.excerpt || 'No text...' }}
</template>

<script>
import moment from 'moment'
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
    prettyTimestamp() {
      const momentDate = moment(this.note.timestamp)
      const now = moment()
      if(now.isSame(momentDate, 'd')) {
        return momentDate.format('h:mm A')
      } else if(now.isSame(momentDate, 'w')) {
        return momentDate.format('dddd')
      } else {
        return momentDate.format('M/D/YY')
      }
    }
  },
  methods: {
    selectNote() {
      if(this.isSelected) { return }
      this.$store.dispatch('note/selectNote', this.note.id)
    },
    addNoteToSelection() {
      // TODO: add to selection
    },
    deleteNote() {
      if(confirm('Are you sure you want to delete this note?')) {
        this.$store.dispatch('note/deleteNote', this.note.id)
      }
    }
  },
}
</script>

<style lang="sass" scoped>
@mixin one-line
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis

.note
  @apply tw-py-3 tw-px-3 tw-pr-5 tw-m-2 tw-rounded-lg
  @apply tw-relative tw-text-sm
  // @apply tw-border-b tw-border-gray-100

  &.selected
    @apply tw-bg-gray-200 // tw-text-white

  &:hover
    @apply tw-cursor-pointer

    &:not(.selected)
      @apply tw-bg-gray-100

    .note__delete
      @apply tw-block

  &__title, &__subtitle
    @include one-line

  &__title
    @apply tw-font-bold

  &__subtitle
    @apply tw-text-xs tw-text-gray-500

  &__timestamp
    @apply tw-mr-2 tw-text-gray-800

  // &:not(.selected) .note__excerpt
  //   @apply tw-text-gray-400

  &__delete
    @apply tw-absolute tw-text-base tw-font-hairline tw-text-gray-400 tw-cursor-pointer tw-outline-none tw-hidden
    right: 4px
    top: -1px

    &:hover
      @apply tw-text-gray-900

</style>
