import Vue from 'vue'
import Vuex from 'vuex'
// import { createPersistedState } from 'vuex-electron'

import note from './note'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    note,
  },
  plugins: [
    // createPersistedState(),
    // createSharedMutations(),
  ],
})