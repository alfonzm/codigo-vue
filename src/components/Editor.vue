<template lang="pug">
  .editor-wrapper(ref="editor-wrapper")
    ace-editor.editor(
      @init="editorInit"
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
      theme: 'github',
    }
  },
  computed: {
    ...mapState({
      notes: state => state.note.notes,
      isVisible: state => state.ui.isVisible,
    }),
    ...mapGetters({
      currentNote: 'note/currentNote',
      notesList: 'note/notesList',
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
        // TODO: do not update timestamp when selecting
        if(this.currentNote.text != text) {
          this.$store.dispatch('note/updateText', text)
        }
      }
    }
  },
  watch: {
    isVisible() {
      // TODO: update/refresh/resize ace editor on toggle ui panes
    }
  },
  async mounted() {
    this.setupAceEditor()

    if(_.keys(this.notes).length > 0) {
      this.loadFirstNote()
    } else {
      await this.$store.dispatch('note/createNewNote', true)
    }
  },
  methods: {
    loadFirstNote() {
      const id = this.notesList[0].id
      if (id) {
        this.$store.dispatch('note/selectNote', id)
      }
    },
    setupAceEditor() {

      let editor = this.$refs.editor.editor
      editor.setOptions({
        // theme: `brace/theme${this.theme}`,
        highlightActiveLine: false,
        showGutter: false,
        // showPrintMargin: false,
        cursorStyle: 'smooth',
        wrap: true,
        fontFamily: 'Source Code Pro',
        fontSize: 14,
        printMargin: false,
      })
      // editor.setTheme('ace/theme/monokai')
    },
    editorInit() {
      require('brace/ext/language_tools')
      require('brace/mode/markdown')
      require(`brace/theme/${this.theme}`)
    }
  },
}
</script>

<style lang="sass">
.editor-wrapper
  @apply tw-p-3 tw-pr-0

.editor
  @apply tw-h-screen tw-w-full

// override padding inside ace editor
.ace_scroller
  // left: 10px !important
  // top: 10px !important
  // right: 10px !important
  // bottom: 10px !important
</style>
