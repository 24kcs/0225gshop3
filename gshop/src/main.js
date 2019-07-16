// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 注册路由器
import router from './router'
//定义一个全局组件
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
//引入store
import store from './store'
Vue.component('Header',Header)
Vue.component('Star',Star)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
