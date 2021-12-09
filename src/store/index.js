import Vue from 'vue'
import Vuex from 'vuex'
import usersAPI from '../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      id: -1,
      name: '',
      email: '',
      account: '',
      avatar: '',
      cover: '',
      introduction: '',
    },
    isAuthenticated: false,
    token: ''
  },
  mutations: {
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        ...currentUser
      }
      state.token = localStorage.getItem('token')
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      state.currentUser = {}
      state.isAuthenticated = false
      localStorage.removeItem('token')
      state.token = ''
    }
  },
  actions: {
    async fetchCurrentUser({commit}) {
      try {
        const { data } = await usersAPI.getCurrentUser()
        const { id, name, email, account, avatar, cover, introduction } = data
        commit('setCurrentUser', { id, name, email, account, avatar, cover, introduction })
        return true  
      } catch (error) {
        console.log(error)
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
