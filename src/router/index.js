import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Signup from '@/components/pages/Signup'
import Login from '@/components/pages/Login'
import Applist from '@/components/pages/Applist'
import Profile from '@/components/pages/Profile'
import User from '@/components/pages/User'
import Members from '@/components/pages/Members'
import Records from '@/components/pages/Records'
import Competence from '@/components/pages/Competence'
import Addcompetence from '@/components/pages/Addcompetence'
import Editcompetence from '@/components/pages/Editcompetence'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'applist',
          name: 'applist',
          component: Applist,
          meta: { requiresAuth: true }
        },
        {
          path: 'profile/:id',
          name: 'Profile',
          component: Profile,
          meta: { requiresAuth: true }
        },
        {
          path: 'user/:id',
          name: 'user',
          component: User,
          meta: { requiresAuth: true }
        },
        {
          path: 'members',
          name: 'members',
          component: Members,
          meta: { requiresAuth: true }
        },
        {
          path: 'records',
          name: 'records',
          component: Records,
          meta: { requiresAuth: true }
        },
        {
          path: 'competence',
          name: 'competence',
          component: Competence,
          meta: { requiresAuth: true }
        },
        {
          path: 'addcompetence',
          name: 'addcompetence',
          component: Addcompetence,
          meta: { requiresAuth: true }
        },
        {
          path: 'editcompetence/:id',
          name: 'editcompetence',
          component: Editcompetence,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (!requiresAuth && currentUser) {
    next('/admin/applist')
  } else {
    next()
  }
})

export default router
