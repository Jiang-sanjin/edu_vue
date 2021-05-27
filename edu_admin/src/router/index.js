import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: '首页',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '在线教育后台', icon: 'dashboard' }
    }]
  },

  {
    path: '/teacher',
    component: Layout,
    redirect: '/teacher/list',
    name: '讲师管理',
    meta: { title: '讲师管理', icon: 'user' },
    children: [
      {
        path: 'list',
        name: '讲师列表',
        component: () => import('@/views/teacher/list'),
        meta: { title: '讲师列表', icon: 'peoples' }
      },
      {
        path: 'add',
        name: '讲师新增',
        component: () => import('@/views/teacher/form'),
        meta: { title: '讲师新增', icon: 'form' }
      },
      {
        path: 'edit/:id',// : 用来传递参数的
        name: '讲师修改',
        component: () => import('@/views/teacher/form'),
        meta: { title: '讲师修改', icon: 'tree' },
        hidden: true   //不显示
      },
      {
        path: 'level',
        name: '讲师职称',
        component: () => import('@/views/teacher/level'),
        meta: { title: '讲师职称', icon: 'table' }
      }

    ]
  },
  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '课程分类管理',
    meta: { title: '课程分类管理', icon: 'nested' },
    children: [
      {
        path: 'list',
        name: '课程分类列表',
        component: () => import('@/views/subject/list'),
        meta: { title: '课程分类列表', icon: 'table' }
      },
      {
        path: 'import',
        name: '课程分类导入',
        component: () => import('@/views/subject/import'),
        meta: { title: '课程分类导入', icon: 'excel' }
      }
    ]
  },
  // 课程管理
  {
    path: '/course',
    component: Layout,
    redirect: '/course/list',
    name: '课程管理',
    meta: { title: '课程管理', icon: 'form' },
    children: [
      {
        path: 'list',
        name: 'EduCourseList',
        component: () => import('@/views/course/list'),
        meta: { title: '课程列表', icon: 'list' }
      },
      {
        path: 'info',
        name: 'EduCourseInfo',
        component: () => import('@/views/course/info'),
        meta: { title: '发布课程', icon: 'edit' }
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true
      },
      {
        path: 'publish/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/show',
    name: '统计分析',
    meta: { title: '统计分析', icon: 'example' },
    children: [
      {
        path: 'create',
        name: '生成数据',
        component: () => import('@/views/statistics/create'),
        meta: { title: '生成数据', icon: 'table' }
      },

      {
        path: 'show',
        name: '图表显示',
        component: () => import('@/views/statistics/show'),
        meta: { title: '图表显示', icon: 'tree' }
      }
    ]
  },



  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
