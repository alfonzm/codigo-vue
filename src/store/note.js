// Handles current selected note, saving/editing current note, etc

import _ from 'lodash'
import moment from 'moment'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import Store from 'electron-store'
import { v1 as uuidv1 } from 'uuid'

const store = new Store()

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
})

export default {
  namespaced: true,

  state: {
    currentNoteId: null,
    notes: store.get('notes', {}),
    saveTimeout: null,
  },
  getters: {
    currentNote(state) {
      console.log('current note', {...state.notes[state.currentNoteId]})
      return state.notes[state.currentNoteId]
    },
    textHtml(state, getters) {
      const currentNote = getters.currentNote
      return marked(currentNote ? currentNote.text : '')
    },
    notesCount(state) {
      return _.keys(state.notes).length
    },
    // used by sidebar. returns array of note obj: { id, text, timestamp, title, excerpt }
    notesList({ notes }) {
      const noteList = _.keys(notes).map(id => {
        let title
        let excerpt

        const note = notes[id]

        if(note.text.length > 0) {
          let textPerLine = note.text.split('\n')
          const titleIndex = _.findIndex(textPerLine, t => t.length > 0)
          const mdTitle = textPerLine[titleIndex]
          const mdExcerpt = _.find(textPerLine.slice(titleIndex+1), t => t.length > 0) // TODO: get 2nd non-blank line of text

          const htmlTitle = marked(mdTitle || '')
          const htmlExcerpt = marked(mdExcerpt || '')

          title = sanitizeHtml(htmlTitle, { allowedTags: [] })

          if(htmlExcerpt) {
            excerpt = sanitizeHtml(htmlExcerpt, { allowedTags: [] })
          }
        }

        return {
          id,
          title,
          excerpt,
          ...note,
        }
      })

      // const noteList = _.mapValues(notes, note => {
      //   return {
      //     title,
      //     excerpt,
      //     ...note,
      //   }

      // })
      return _.orderBy(noteList, ['timestamp'], ['desc'])
    },
  },
  mutations: {
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    SET_CURRENT_NOTE_ID(state, id) {
      state.currentNoteId = id
      console.log('done commit set current note id')
    },
    ADD_NOTE(state, { id, newNote }) {
      const updatedNotes = Object.assign({}, state.notes)
      updatedNotes[id] = newNote

      state.notes = updatedNotes
    },
    DELETE_NOTE(state, id) {
      console.log('after delete', _.omitBy(state.notes, (_, key) => key === id))
      state.notes = _.omitBy(state.notes, (_, key) => key === id)
    },
    UPDATE_CURRENT_NOTE(state, updatedNote) {
      const { notes, currentNoteId } = state
      const newNotes = Object.assign({}, notes)
      newNotes[currentNoteId] = updatedNote
      state.notes = newNotes
    },
    CLEAR_SAVE_TIMEOUT(state) {
      clearTimeout(state.saveTimeout)
      state.saveTimeout = null
    },
    DELETE_ALL_NOTES(state) {
      state.notes = []
    },
    SET_SAVE_TIMEOUT(state, timeout) {
      state.saveTimeout = timeout
    },
  },
  actions: {
    clear({ commit }) {
      store.clear()
      commit('DELETE_ALL_NOTES')
    },
    // selectAfterCreate = if true, select the newly created note after creating
    createNewNote({ commit, dispatch }, selectAfterCreate) {
      const id = uuidv1()
      const newNote = {
        text: '',
        timestamp: Number(moment().format('x'))
      }
      console.log('creating', id)
      store.set(`notes.${id}`, newNote)
      commit('ADD_NOTE', { id, newNote })

      if(selectAfterCreate) {
        dispatch('selectNote', id)
      }

      return { id, newNote }
    },
    updateText({ commit, state }, text) {
      const id = state.currentNoteId

      const updatedNote = {
        text,
        timestamp: Number(moment().format('x'))
      }

      commit('UPDATE_CURRENT_NOTE', updatedNote)
      commit('CLEAR_SAVE_TIMEOUT')

      // persist updated note after 500ms
      const saveTimeout = setTimeout(() => {
        // check if note was not deleted while waiting
        if(state.notes[id]) {
          console.log('saving ' + id)
          store.set(`notes.${id}`, updatedNote)
        }
      }, 500)

      commit('SET_SAVE_TIMEOUT', saveTimeout)
    },
    selectNote({ commit }, id) {
      commit('SET_CURRENT_NOTE_ID', id)
    },
    deleteNote({ commit, dispatch, getters }, id) {
      console.log('delete', id)
      store.delete(`notes.${id}`)
      commit('DELETE_NOTE', id)

      if(getters.notesCount === 0) {
        dispatch('createNewNote')
      }
    },
    deleteAllNotes({ commit }) {
      store.delete(`notes`)
      commit('SET_NOTES', {})
    },
  }
}