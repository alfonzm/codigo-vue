<template lang="pug">
  .editor-wrapper
    ace-editor.editor(
      ref="editor"
      v-model="text"
      :theme="theme"
      lang="markdown"
    )
</template>

<script>
import _ from 'lodash'
import AceEditor from 'vue2-ace-editor'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Editor',
  components: {
    AceEditor,
  },
  data() {
    return {
      theme: 'xcode',
    }
  },
  computed: {
    ...mapState({
      notes: state => state.note.notes,
    }),
    ...mapGetters({
      currentNote: 'note/currentNote',
    }),

    // this bidirectionally maps the text in Ace Editor to text of current note in state
    // see: https://vuex.vuejs.org/guide/forms.html
    text: {
      get () {
        const text = this.currentNote ? this.currentNote.text : ''
        console.log('get', text)
        return text
      },
      set (text) {
        if(this.currentNote.text != text) {
          this.$store.dispatch('note/updateText', text)
        }
      }
    }
  },
  async mounted() {
    this.setupAceEditor()

    if(_.keys(this.notes).length > 2) {
      this.loadFirstNote()
    } else {
      const { id } = await this.$store.dispatch('note/createNewNote')
      this.$store.dispatch('note/selectNote', id)
    }
  },
  methods: {
    loadFirstNote() {
      const id = _.keys(this.notes)[0]
      if (id) {
        this.$store.dispatch('note/selectNote', id)
      }
    },
    setupAceEditor() {
      require('brace/mode/markdown')                
      require(`brace/theme/${this.theme}`)

      let editor = this.$refs.editor.editor
      editor.setOptions({
        highlightActiveLine: false,
        showGutter: false,
        showPrintMargin: false,
        cursorStyle: 'smooth',
      })
    }
  },
}
</script>

<style lang="sass">
.editor-wrapper
  @apply tw-p-2

.editor
  @apply tw-h-screen tw-w-full
  // height: 100vh !important
</style>
