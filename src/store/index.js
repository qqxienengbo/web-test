import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    return:{
      isCollapse:true,
      user:{}
    }
  },
  getters: {
  },
  mutations: {
    updateCollapse(state){
      state.isCollapse=!state.isCollapse;
    },
    setUser(state,user){
      state.user=user
    },
    removeUser(state){
      state.user={}
    }
  },
  actions: {
  },
  modules: {
  },
  plugins:[
    createPersistedState(),
  ]
})
