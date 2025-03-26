import { createStore } from 'vuex'
import document from './modules/document'
import solid from './modules/solid'
// import solid_data from './modules/solid_data'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    document,
    // config,
    solid,
    // solid_data,
  },
})
