// Handles UI preferences

import Store from 'electron-store'

const store = new Store()

export default {
  namespaced: true,

  state: store.get('ui', {
    isVisible: {
      toolbar: true,
      editor: true,
      preview: true,
      sidebar: true,
    }
  }),
  getters: {},
  mutations: {
    SET_SHOW_EDITOR(state, isShowEditor) {
      state.isShowEditor = isShowEditor
    },
    SET_VIEW_VISIBILITY(state, { isVisible, viewName }) {
      state.isVisible = {
        ...state.isVisible,
        [viewName]: isVisible
      }
      store.set('ui.isVisible', state.isVisible)
    }
  },
  actions: {
    toggleViewVisibility({ commit, state }, viewName) {
      commit('SET_VIEW_VISIBILITY', {
        viewName,
        isVisible: !state.isVisible[viewName]
      })
    }
  }
}