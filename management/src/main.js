// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
Vue.prototype.$http = axios
Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})
router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('toke') == 0 && to.fullPath == '/') {
    next({
      path: '/index',
    })
  } else {
    next()
  }

})