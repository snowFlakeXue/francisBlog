// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import echarts from 'echarts'


Vue.prototype.$echarts = echarts



Axios.defaults.baseURL = 'http://192.168.43.144:8080/francisblog/api/v1/'

Vue.config.productionTip = false

Axios.interceptors.request.use(
  config => {
    const token = store.state.token
    if (token) {
      config.headers.token = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// Axios.defaults.withCredentials = true
Vue.use(VueAxios, Axios)

Vue.use(Vuex)

Vue.config.productionTip = false


Vue.use(ElementUI)
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    admin: ''
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
