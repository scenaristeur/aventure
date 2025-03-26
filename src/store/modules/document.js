// import * as sc from '@inrupt/solid-client-authn-browser'

// const LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL = 'solid_session_restore_url'

const state = () => ({
  doc: null,
})

const mutations = {
  setDoc(state, d) {
    console.log('doc', d)
    state.doc = d
  },
}

const actions = {
  // async checkSession(context) {
  // }
  async newDoc(context) {
    let doc = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Note',
      content: 'Hello World',
      blocks: [
        {
          id: 'block-1',
          type: 'paragraph',
          text: 'Hello World',
        },
        {
          id: 'block-2',
          type: 'paragraph',
          text: 'Hello World2',
        },
      ],
    }

    context.commit('setDoc', doc)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
