import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import Vuelidate from 'vuelidate'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router/router'

Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
