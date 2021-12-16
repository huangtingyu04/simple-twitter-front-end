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
      path: '/public',
      name: 'public',
      component: () => import('../views/PublicChat.vue')
    },
    {
      path: '/private',
      name: 'private',
      component: () => import('../views/PrivateChat.vue')
    },
    {
      path: '/admin',
      exact: true,
      redirect: '/admin/signin'
    },
    {
      path: '/admin/signin',
      name: 'admin-signin',
      component: () => import('../views/AdminSignIn.vue'),
    },
    {
      path: '/admin/tweets',
      name: 'admin-tweets',
      component: () => import('../views/AdminTweets.vue'),
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('../views/AdminUsers.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {

  if (from.name) {
    if (
      (to.name.includes('admin') && !from.name.includes('admin')) ||
      (!to.name.includes('admin') && from.name.includes('admin'))
    ) {
      store.commit("revokeAuthentication");
    }
  }

  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAllAuthentication = ['sign-up', 'sign-in', 'admin-signin']

  if (!isAuthenticated && !pathsWithoutAllAuthentication.includes(to.name)) {

    if (!to.name.includes('admin')) {
      next('/signin')
    } else {
      next('/admin/signin')
    }
    return
  }

  if (isAuthenticated && pathsWithoutAllAuthentication.includes(to.name)) {

    if (!to.name.includes('admin')) {
      next('/tweets')

    } else {
      next('/admin/tweets')

    }
    return
  }


  next()
})

export default router
