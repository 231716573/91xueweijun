// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import store from './store'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'


Vue.use(VueAwesomeSwiper)
import 'common/stylus/index.styl'
fastclick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$https = axios

Vue.use(VueLazyLoad, {
  loading: require('common/images/logo.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
