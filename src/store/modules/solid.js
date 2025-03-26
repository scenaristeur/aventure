import * as sc from '@inrupt/solid-client-authn-browser'

const LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL = 'solid_session_restore_url'

const state = () => ({
  // doc: null
  session: null,
  // pod: null,
})

const mutations = {
  setSession(state, s) {
    console.log('session', s)
    state.session = s
  },

  // updateDoc(state, newDoc) {
  //   state.doc = newDoc
  //   //render(newDoc)
  // },
}

const actions = {
  async checkSession(context) {
    localStorage.setItem(LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL, window.location.toString())
    // console.log("check session", document.location)
    // localStorage.setItem(Date.now, document.location)

    // sc.onSessionRestore((url) => {
    //   history.replaceState(null, '', url)
    // })

    await sc
      .handleIncomingRedirect({
        restorePreviousSession: true,
      })
      .then(async (info) => {
        if (info.isLoggedIn == true) {
          console.log(`Logged in with WebID [${info.webId}]`)
          context.commit('setSession', info)
          // let session = sc.getDefaultSession()

          // This line is not reached until you are successfully logged in
          localStorage.setItem(LOCAL_STORAGE_KEY__SOLID_SESSION_RESTORE_URL, '')
        }
      })
  },
  async login(context, issuer) {
    console.log('login', issuer)
    if (!sc.getDefaultSession().info.isLoggedIn) {
      await sc.login({
        oidcIssuer: issuer,
        redirectUrl: window.location.href,
        clientName: 'Agent',
      })
    }
  },

  async logout(context) {
    let session = sc.getDefaultSession()
    await session.logout()
    context.commit('setSession', null)
    // context.commit('setPod', null)
    //store.dispatch('nodes/clearStore')
  },

  // async newDoc(context){
  //   let doc = Automerge.init()
  //   context.commit('setDoc', doc)
  // },
  // addItem(context, text) {
  //   console.log(context.state.doc)
  //   let newDoc = Automerge.change(context.state.doc, doc => {
  //     if (!doc.items) doc.items = []
  //     doc.items.push({ text, done: false })
  //   })
  //   context.commit('updateDoc', newDoc)
  // }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
}
