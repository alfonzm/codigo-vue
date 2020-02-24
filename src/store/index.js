import Vue from 'vue'
import Vuex from 'vuex'
import marked from 'marked'

Vue.use(Vuex)

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
})

export const store = new Vuex.Store({
  state: {
    text: require('@/assets/test'),
  },
  getters: {
    textHtml(state) {
      return marked(state.text)
    },
  },
  mutations: {
    UPDATE_TEXT (state, value) {
      state.text = value
    },
  },
})