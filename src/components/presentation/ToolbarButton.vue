<template lang="pug">
  button.toolbar-button(@click="$emit('click')")
    slot
</template>

<script>

export default {
  name: 'ToolbarButton',
  props: ['click'],
  components: {
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="sass">
.toolbar-button
  @apply tw-px-3 tw-py-1 tw-border tw-border-gray-300 tw-text-xs tw-rounded tw-outline-none

  &:hover
    @apply tw-border-gray-400 tw-cursor-pointer
</style>
