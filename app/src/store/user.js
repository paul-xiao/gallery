import $http from '../utils/http'
const userinfo = JSON.parse(localStorage.getItem('userinfo')) || {}
const user = {
  state: {
    userinfo: userinfo
  },
  mutations: {
    INIT_USER_STATE(state, userinfo={}) {
      state.userinfo = userinfo
    },
    UPDATE_USER_STATE(state, userinfo={}) {
      Object.assign(state.userinfo, userinfo)
    },
    RESET_USER_STATE(state){
      state.userinfo = {}
    }
  },
  actions: {
    GET_USER_INFO({commit, dispatch}) {
     return new Promise((reslove, reject) => {
      $http.get('/user/session').then(({data}) => {
        if(!data.status) {
          dispatch('LOG_OUT')
        } else {
          if(data.username) {
            commit('INIT_USER_STATE', data)
            reslove(data)
          }
        }
      }).catch(err => reject(err))
     })
    },
    UPDATE_USER_INFO({commit}, data) {
      $http.post('/user/update', data).then(() => {
        commit('UPDATE_USER_STATE', data)
      })
    },
    LOG_OUT({commit}) {
      $http.delete("/user/logout");
      commit('RESET_USER_STATE')
    }
  },
  getters: {
    userinfo: state => {
      localStorage.setItem('userinfo', JSON.stringify(state.userinfo))
      return state.userinfo
    }
  }
}

export default user