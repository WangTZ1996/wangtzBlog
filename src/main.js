// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {
  Uploader,
  Toast,
  Loading
} from 'vant'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'



router.beforeEach((to, from, next) => {
  next()
})

Vue.config.productionTip = false

Vue.prototype.$toast = Toast;

Vue.use(Uploader)
Vue.use(Toast)
Vue.use(Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
