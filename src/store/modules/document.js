// import * as sc from '@inrupt/solid-client-authn-browser'
import { v4 as uuidv4 } from 'uuid'

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
          id: uuidv4(),
          type: 'paragraph',
          default: 'Hello World',
        },
        {
          id: uuidv4(),
          type: 'paragraph',
          default: 'Hello World2',
        },
      ],
    }
    context.commit('setDoc', doc)
  },
  async newBlock(context, params) {
    let doc = context.state.doc
    let block = params
    block.id = uuidv4()
    doc.blocks.push(block)
    context.commit('setDoc', doc)
  },
  async updateBlock(context, block) {
    let doc = context.state.doc
    let index = doc.blocks.findIndex((b) => b.id == block.id)
    doc.blocks[index] = block
    console.log('block', block)
    context.commit('setDoc', doc)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
