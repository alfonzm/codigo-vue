<template lang="pug">
  span.input
    ionicon.input__icon(v-if="icon" :name="icon")
    input.input__field(
      ref="inputField"
      :id="id"
      :class="className"
      :value="value"
      :placeholder="placeholder"
      type="text"
      @input="$emit('input', $event.target.value)"
    )
</template>

<script>

import Ionicon from '@/components/presentation/Ionicon'

export default {
  name: 'InputText',
  props: [
    'id',
    'className',
    'value',
    'placeholder',
    'icon',
  ],
  components: {
    Ionicon
  },
  methods: {
    focus() {
      this.$refs.inputField.focus()
    },
  }
}
</script>

<style lang="sass" scoped>
.input
  @apply tw-flex tw-w-full tw-items-center

  &__icon
    @apply tw-text-sm

    /deep/ ion-icon
      @apply tw-text-gray-500

  &__field
    @apply tw-w-full tw-p-1 tw-text-xs tw-border tw-border-gray-300 tw-rounded

</style>
