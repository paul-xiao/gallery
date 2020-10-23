import $http from '../utils/http'
const userinfo = JSON.parse(sessionStorage.getItem('userinfo')) || {}
const user = {
  state: {
    userinfo: userinfo,
    contacts: [],
    conversations: [],
  },
  mutations: {
    INIT_USER_STATE(state, userinfo = {}) {
      state.userinfo = userinfo
      sessionStorage.setItem('userinfo', JSON.stringify(state.userinfo))
    },
    UPDATE_USER_STATE(state, userinfo = {}) {
      Object.assign(state.userinfo, userinfo)
    },
    UPDATE_CONTACTS(state, contacts) {
      state.contacts = contacts
    },
    UPDATE_CON(state, conversations) {
      state.conversations.push(conversations)
      console.log(state.conversations)
    },
    RESET_USER_STATE(state) {
      state.userinfo = {}
      sessionStorage.removeItem('userinfo')
    },
  },
  actions: {
    GET_USER_INFO({ commit, dispatch }) {
      return new Promise((reslove, reject) => {
        $http
          .get('/user/session')
          .then(({ data }) => {
            if (!data.status) {
              dispatch('LOG_OUT')
            } else {
              if (data.username) {
                commit('INIT_USER_STATE', data)
                reslove(data)
              }
            }
          })
          .catch((err) => reject(err))
      })
    },
    UPDATE_USER_INFO({ commit }, data) {
      $http.post('/user/update', data).then(() => {
        commit('UPDATE_USER_STATE', data)
      })
    },
    LOG_OUT({ commit }) {
      commit('RESET_USER_STATE')

      $http.delete('/user/logout')
    },
  },
  getters: {
    userinfo: (state) => state.userinfo,
    contacts: (state) => state.contacts,
    conversations: (state) => state.conversations,
  },
}

export default user
