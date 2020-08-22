//入口js
import Vue from 'vue'
import App from './App.vue'
import {Button} from 'mint-ui'
import router from './router'
import store from './store'

import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'swiper/swiper-bundle.css'
//引入mockserver
import './mock/mockserver'

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.component(Button.name, Button)
import * as moment from '../src/filters/filter.js'
 
Object.keys(moment).forEach(key => {
  Vue.filter(key, moment[key])
})


new Vue({
  el:'#app',
  router,
  store,
  render: h => h(App)
})