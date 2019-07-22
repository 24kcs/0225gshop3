// 引入Vue
import Vue from 'vue'
// 引入vue-router
import VueRouter from 'vue-router'
// 引入路由的相关配置的文件
import routes from './routes.js'
//import store from '../store/index.js';
// 声明使用插件
Vue.use(VueRouter)

// const router= new VueRouter({
//   mode: 'history', // 没有#
//   routes
// })
// const paths=['/goone','/gotwo']
// router.beforeEach((to, from, next) => {
//   //如果目标路由是需要检查的
//   const path=to.path
//   if(paths.indexOf(path)!==-1){
//     // 此时说明里面必然有一个
//     // 如果没有登录,直接跳转进行登录
//     if(!store.state.user.user._id){//先去main.js中使用Vue.store=store这里就可以使用了
//       return next('/login')
//     }
//   }
//   // 放行
//   next()
// })

// 向外暴露
export default new VueRouter({
  mode: 'history', // 没有#
  routes
})
