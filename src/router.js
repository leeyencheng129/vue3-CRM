import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/MyHome.vue'

import Goods from './components/menus/MyGoods.vue'
import Orders from './components/menus/MyOrders.vue'
import Right from './components/menus/MyRights.vue'
import Users from './components/menus/MyUsers.vue'
import Setting from './components/menus/MySetting.vue'
import UserInfo from './components/user/MyUserDetail.vue'


const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'Login' },
    {
      path: '/home',
      redirect: '/users',
      component: Home,
      name: 'Home',
      children: [
        { path: 'goods', component: Goods },
        { path: 'orders', component: Orders },
        { path: 'rights', component: Right },
        { path: 'users', component: Users },
        { path: 'setting', component: Setting },
        {path:'userinfo/:id' , component:UserInfo ,props: true}
      ]
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = localStorage.getItem('token')
  if (!tokenStr) {
    next('login')
  } else {
    next()
  }
})
export default router