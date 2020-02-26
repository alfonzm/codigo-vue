import Vue from 'vue'
import Vuex from 'vuex'
// import { createPersistedState } from 'vuex-electron'

import note from './note'
import ui from './ui'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    ui,
    note,
  },
  plugins: [
    // createPersistedState(),
    // createSharedMutations(),
  ],
})