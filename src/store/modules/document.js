// import * as sc from '@inrupt/solid-client-authn-browser'
import { v4 as uuidv4 } from 'uuid'

// const LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL = 'solid_session_restore_url'

const state = () => ({
  doc: null,
  docs: JSON.parse(localStorage.getItem('aventure-docs')) || {},
})

const mutations = {
  setDoc(state, d) {
    console.log('doc', d)
    state.doc = d
    state.docs[d.id] = d
    localStorage.setItem('aventure-docs', JSON.stringify(state.docs))
  },
}

const actions = {
  // async checkSession(context) {
  // }
  async newDoc(context) {
    let doc = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: uuidv4(),
      type: 'Note',
      title: 'Title',
      header: 'header',
      blocks: [
        // {
        //   id: uuidv4(),
        //   type: 'paragraph',
        //   default: 'Hello World',
        // },
        // {
        //   id: uuidv4(),
        //   type: 'paragraph',
        //   default: 'Hello World2',
        // },
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
    if (block.id == 'titre') {
      doc.title = block.content
    } else if (block.id == 'header') {
      doc.header = block.content
    } else {
      let index = doc.blocks.findIndex((b) => b.id == block.id)
      doc.blocks[index] = block
      // console.log('block', block)
    }
    context.commit('setDoc', doc)
  },
  async reorderBlocks(context, doc) {
    context.commit('setDoc', doc)
  },
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
