// 引入4个路由组件,进行配置
// import MSite from '../pages/MSite/MSite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'

// 返回Promise
// 开始不执行,第一次请求时候才执行
const MSite=()=>import('../pages/MSite/MSite.vue')
const Search=()=>import('../pages/Search/Search.vue')
const Order=()=>import('../pages/Order/Order.vue')
const Profile=()=>import('../pages/Profile/Profile.vue')

import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/Goods/Goods.vue'
import Ratings from '../pages/Shop/Ratings/Ratings.vue'
import Info from '../pages/Shop/Info/Info.vue'

import GoOne from '../pages/Test/GoOne.vue'
import GoTwo from '../pages/Test/GoTwo.vue'


import A from '../pages/Test/A.vue'
import B from '../pages/Test/B.vue'
import B1 from '../pages/Test/B1.vue'
import B2 from '../pages/Test/B2.vue'
// 向外暴露的是数组
export default [
  {
    path: '/msite',
    component: MSite,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/search',
    component: Search,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/order',
    component: Order,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      isShowFooter: true
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path:'/shop',
    component:Shop,
    children:[
      {
        path:'/shop/goods',
        component:Goods
      },
      {
        path:'/shop/ratings',
        component:Ratings
      },
      {
        path:'/shop/info',
        component:Info
      },
      {
        path:'/shop',
        redirect:'/shop/goods'
      }
    ]
  },
  {
    path:'/goone',
    component:GoOne
  },
  {
    path:'/gotwo',
    component:GoTwo
  },
  {
    path: '/a',
    component: A
  },
  {
    path: '/b',
    component: B,
    children: [
      {
        path: '/b/b1',
        component: B1
      },
      {
        path: '/b/b2',
        component: B2
      },
    ]
  },
  {
    path: '/',
    redirect: '/msite'
  }
]
