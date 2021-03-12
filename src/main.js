import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import CoreuiVue from '@coreui/vue'
import { freeSet as icons } from '@coreui/icons'
import store from './store'
import Axios from 'axios'

import Alert from '../src/views/utils/Alert'


Vue.component('Alert',Alert);

Vue.config.performance = true
Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

//Constant base url for axios
//const baseURL = 'http://192.168.68.115:8080';

const baseURL = 'http://localhost:8080/api/';

if (typeof baseURL !== 'undefined') {
  Axios.defaults.baseURL = baseURL;
}
Vue.prototype.$http = Axios;

new Vue({
  el: '#app',
  router,
  store,
  icons,
  template: '<App/>',
  components: {
    App
  }
})
