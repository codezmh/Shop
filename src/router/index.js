/*
  路由器对象模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../pages/Home/Home.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Proflie/Profile.vue'

//路由组件懒加载
const Home =() => import('../pages/Home/Home.vue')
const Search =() => import('../pages/Search/Search.vue')
const Order =() => import('../pages/Order/Order.vue')
const Profile =() => import('../pages/Proflie/Profile.vue')
import Login from '../pages/Login/Login.vue'
import Shop from  '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

//声明使用插件
Vue.use(VueRouter)

const router = new VueRouter({
  //所有路由
  routes:[
    {
      path:'/home',
      component:Home,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        isShowFooter:true
      }
    },
    {
      path:'/',
      redirect:'/home'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'/shop/goods',
          component:ShopGoods
        },
        {
          path:'/shop/ratings',
          component:ShopRatings
        },
        {
          path:'/shop/info',
          component:ShopInfo
        },
        {
          path:'',
          redirect:'/shop/goods'
        },
      ]
    }
  ]
})


export default router