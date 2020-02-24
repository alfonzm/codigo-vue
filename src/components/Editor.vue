<template lang="pug">
  div
    ace-editor#editor(v-model="text")
</template>

<script>
import AceEditor from 'vue2-ace-editor'

export default {
  name: 'Editor',
  components: {
    AceEditor,
  },
  computed: {
    text: {
      get () {
        return this.$store.state.text
      },
      set (newText) {
        this.$store.commit('UPDATE_TEXT', newText)
      }
    }
  }
}
</script>

<style lang="sass">
#editor
  height: 100vh !important
</style>
