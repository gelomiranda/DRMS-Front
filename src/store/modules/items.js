import Vue from 'vue';
import api from '../../api'

// initial state
const state = {
    all:[],
    includedInPackageItems: [],
    patientItems:[],
    total : 0
}

// initial getters
const getters = {
    allItems: state  => {
      return state.all;
    },
    allPatientItems: state => {
      return state.patientItems;
    },
    total: state => {
      state.total = 0;
      state.patientItems.forEach(function(item,index){
          if(item.item_type != 'Discount'){
            state.total += item.price * item.billing_quanity;
          }
      });
      return state.total;
    },
    discount: state => {
      var itemCoveredByPhilHealth = 0;
      var discount = 0;
      var discounted = false;
      state.patientItems.forEach(function(item,index){
          if(item.covered_by_philhealth == true){
              itemCoveredByPhilHealth += item.price;
          }
          if(item.item_type == 'Discount'){
              discount += item.price;
              discounted = true;
          }
      });
      return (discounted) ? itemCoveredByPhilHealth : 0;
    }
}

const actions = {
  getAll ({commit}) {
    api.get('items')
    .then((response) => {
      commit('GET_ALL',response.data) ;
      commit('GET_ALL_INCLUDED_IN_THE_PACKAGE');
    }); 
  }
}

const mutations = {
  GET_ALL (state, data) {
    state.all = data;
  },
  GET_ALL_INCLUDED_IN_THE_PACKAGE (state) {
    state.patientItems = state.all.filter(item => item.include_in_package == 'Yes');
  },
  UPDATE_ITEM (state, data) {
    const index = state.patientItems.findIndex( item => item.description === data.data);
    state.patientItems[index].billing_quanity = 11;
    Vue.delete(state.patientItems, index)
  },
  DELETE_ITEM (state, data) {
    const index = state.patientItems.findIndex( item => item.description === data.description);
    Vue.delete(state.patientItems, index)
  }

}    

export default {
    state,
    getters,
    mutations,
    actions
}