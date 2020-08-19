/*
  路由器对象模块
*/

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home/Home.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Proflie/Profile.vue'
import Login from '../pages/login/Login.vue'

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
    }
  ]
})


export default router