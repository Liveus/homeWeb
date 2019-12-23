// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex' // 引入状态管理
import App from './App'
import router from './router'
import ViewUI from 'view-design'
import axios from './axios.js'
import mavonEditor from 'mavon-editor'
import VueWechatTitle from 'vue-wechat-title'
import * as actions from './vuex/actions'
import * as getters from './vuex/getters'
import * as mutations from './vuex/mutations'

import 'view-design/dist/styles/iview.css'
import '@/assets/styles/icon.css'
import '@/assets/styles/global.scss'
import '@/assets/styles/iconfont.css'
import 'mavon-editor/dist/css/index.css'

Vue.use(VueWechatTitle)
Vue.use(mavonEditor)
Vue.use(Vuex)
Vue.use(ViewUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

// http request拦截器 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('userToken')
  if (token) {
      // 将token放到请求头发送给服务器
      config.headers.token = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 注册状态管理全局参数
var store = new Vuex.Store({
  state: {
    // 当前用户
    user: null,
    // token
    token: '',
    // 状态: true-登陆，false-退出
    status: false
  },
  getters,
  mutations,
  actions
})

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  // loadong 效果
  ViewUI.LoadingBar.start()
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    // 通过vuex state获取当前的token是否存
    if (localStorage.getItem('userName') !== 'null' && localStorage.getItem('userName') !== '' && localStorage.getItem('userName') !== null) {
      next()
    } else if (to.path !== '/login') {
      next({
        path: '/login',
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
        query: {redirect: to.fullPath}
      })
    } else {
    }
  } else {
    next()
  }
})

router.afterEach(route => {
  ViewUI.LoadingBar.finish()
})

// iview提示全局配置
Vue.prototype.$Message.config({
  top: 200,
  duration: 2
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // 注册组件
  store,
  components: { App },
  template: '<App/>'
})
