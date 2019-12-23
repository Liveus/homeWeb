import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/Home'

// homepage
import Detail from '@/components/homepage/Detail'
// header bar
import NewBlog from '@/components/homepage/NewBlog'
import Info from '@/components/homepage/Info'
import Analys from '@/components/homepage/Analys'
import Manage from '@/components/homepage/Manage'
import Login from '@/components/homepage/Login'
import Message from '@/components/homepage/Message'
import Code404 from '@/components/common/Code404'
import Code500 from '@/components/common/Code500'

Vue.use(Router)

export default new Router({
  // 去掉url中的#
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      // 默认主页
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        requireAuth: false,
        title: 'Lives Home'
      }
    },
    {
      // 登陆
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: 'Login'
      }
    },
    {
      // 新博客
      path: '/newBlog',
      name: 'newBlog',
      component: NewBlog,
      meta: {
        requireAuth: true,
        title: 'New Blog'
      }
    },
    {
      // 平台信息
      path: '/info',
      name: 'info',
      component: Info,
      meta: {
        title: 'Info'
      }
    },
    {
      // 平台分析
      path: '/analys',
      name: 'analys',
      component: Analys,
      meta: {
        requireAuth: true,
        title: 'Analys'
      }
    },
    {
      // 平台管理
      path: '/manage',
      name: 'manage',
      component: Manage,
      meta: {
        requireAuth: true,
        title: 'Manage'
      }
    },
    {
      // blog详细信息
      path: '/blog/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      // 留言
      path: '/message',
      name: 'message',
      component: Message,
      meta: {
        title: 'Leave Message'
      }
    },
    {
      // 500
      path: '/500',
      name: '500',
      component: Code500,
      meta: {
        title: '服务器异常'
      }
    },
    { /* 404必须是最后一个路由 */
      name: '404',
      path: '*',
      component: Code404,
      meta: {
          title: '找不到页面'
      }
    }
  ]
})
