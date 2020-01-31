import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    session: null
  },
  mutations: {
    setSession(state, val){
      state.session = val;
    }
  },
  getters:{
    getSession: state => {return state.session}

  }
})
