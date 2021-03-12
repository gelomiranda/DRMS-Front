import Vue from 'vue'
import Vuex from 'vuex'

import patients from './store/modules/patients'
import items from './store/modules/items'
Vue.use(Vuex)

const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false,
  alertVisibility:false,
  alertType:'',
  alertMsg:''
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  },
  resetState(state){
    state.alertVisibility = false
    state.msg = ''
    state.alertType = ''
  },
  errorState (state, msg) {
    state.alertVisibility = true
    state.alertMsg = msg
    state.alertType = 'danger'
    scrollTop();
  },
  successState (state, msg) {
    state.alertVisibility = true
    state.alertMsg = msg
    state.alertType = 'success'
    scrollTop();
  },
}

function scrollTop(){
  window.scrollTo({
    top:0,
    behavior: 'smooth',
  });
}

export default new Vuex.Store({
  state,
  mutations,
  modules:{
    patients,
    items
  }
})