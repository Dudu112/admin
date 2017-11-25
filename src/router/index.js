import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/register',
      name: 'register',
      component: resolve => require(['@/views/auth/register'], resolve)
    },{
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/auth/login'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      component: resolve => require(['@/views/auth/test'], resolve)
    }
  ]
})
