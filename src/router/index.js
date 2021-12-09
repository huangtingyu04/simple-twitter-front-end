import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Tweets from '../views/Tweets.vue'

import store from './../store'

Vue.use(VueRouter)

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/tweets',
      name: 'tweets',
      component: Tweets
    },
    {
      path: '/tweets/:id',
      name: 'tweet',
      component: () => import('../views/Tweet.vue')
    },
    {
      path: '/users/:id/tweet',
      name: 'user-tweet',
      component: () => import('../views/UserTweet.vue')
    },
    {
      path: '/users/:id/reply',
      name: 'user-reply',
      component: () => import('../views/UserReply.vue')
    },
    {
      path: '/users/:id/like',
      name: 'user-like',
      component: () => import('../views/UserLike.vue')
    },
    {
      path: '/users/:id/setting',
      name: 'user-setting',
      component: () => import('../views/UserSetting.vue')
    },
    {
      path: '/users/:id/followings',
      name: 'user-followings',
      component: () => import('../views/UserFollowings.vue')
    },
    {
      path: '/users/:id/followers',
      name: 'user-followers',
      component: () => import('../views/UserFollowers.vue')
    },
    {
      path: '/admin',
      exact: true,
      redirect: '/admin/signin'
    },
    {
      path: '/admin/signin',
      name: 'admin-signin',
      component: () => import('../views/AdminSignIn.vue')
    },
    {
      path: '/admin/tweets',
      name: 'admin-tweets',
      component: () => import('../views/AdminTweets.vue')
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/AdminUsers.vue')
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  store.dispatch('fetchCurrentUser')
  next()
})

export default router
