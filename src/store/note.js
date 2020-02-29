// Handles current selected note, saving/editing current note, etc

import _ from 'lodash'
import moment from 'moment'
import marked from 'marked'
import sanitizeHtml from 'sanitize-html'
import Store from 'electron-store'
import { v1 as uuidv1 } from 'uuid'
import { getField, updateField } from 'vuex-map-fields'

const store = new Store()

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
})

export default {
  namespaced: true,

  state: {
    searchText: '',
    currentNoteId: null,
    notes: store.get('notes', {}),
    saveTimeout: null,
  },
  getters: {
    getField,
    currentNote(state) {
      return state.notes[state.currentNoteId]
    },
    getNoteById: (state,) => (id) => {
      return state.notes[id]
    },
    textHtml(state, getters) {
      const currentNote = getters.currentNote
      return marked(currentNote ? currentNote.text : '')
    },
    notesCount(state) {
      return _.keys(state.notes).length
    },
    // used by sidebar. returns array of note obj: { id, text, timestamp, title, excerpt }
    notesList({ notes, searchText }) {
      let filteredNotes
      if(searchText) {
        filteredNotes = _.pickBy(notes, n => n.text.indexOf(searchText) > -1)
      } else {
        filteredNotes = notes
      }
      const noteList = _.keys(filteredNotes).map(id => {
        const note = filteredNotes[id]
        let title
        let excerpt

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
    updateField,
    SET_NOTES(state, notes) {
      state.notes = notes
    },
    SET_CURRENT_NOTE_ID(state, id) {
      state.currentNoteId = id
    },
    ADD_NOTE(state, { id, newNote }) {
      const updatedNotes = Object.assign({}, state.notes)
      updatedNotes[id] = newNote

      state.notes = updatedNotes
    },
    DELETE_NOTE(state, id) {
      state.notes = _.omitBy(state.notes, (_, key) => key === id)
    },
    UPDATE_CURRENT_NOTE(state, payload) {
      const { notes, currentNoteId } = state

      // create the updated note
      const updatedNote = {
        ...notes[currentNoteId], // get current note
        ...payload, // overwrite new fields
      }

      // create notes list with updated note
      const newNotes = Object.assign({}, notes)
      newNotes[currentNoteId] = updatedNote
      state.notes = newNotes

      // persist updated note if no updates after 500ms
      clearTimeout(state.saveTimeout)
      const saveTimeout = setTimeout(() => {
        if(state.notes[currentNoteId]) {
          // make sure note was not deleted during 500ms
          store.set(`notes.${currentNoteId}`, updatedNote)
        }
      }, 500)
      state.saveTimeout = saveTimeout
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
      store.set(`notes.${id}`, newNote)
      commit('ADD_NOTE', { id, newNote })

      if(selectAfterCreate) {
        dispatch('selectNote', id)
      }

      return { id, newNote }
    },
    updateCurrentNoteTimestamp({ commit }) {
      commit('UPDATE_CURRENT_NOTE', {
        timestamp: Number(moment().format('x'))
      })
    },
    updateText({ commit }, text) {
      commit('UPDATE_CURRENT_NOTE', { text })
    },
    selectNote({ commit }, id) {
      commit('SET_CURRENT_NOTE_ID', id)
    },
    deleteNote({ commit, dispatch, getters }, id) {
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