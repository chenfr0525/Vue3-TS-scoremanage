import { createRouter, createMemoryHistory, createWebHashHistory } from 'vue-router'
import { type RouteRecordRaw, createWebHistory } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title: string,
    transition: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/home',
    redirect: "/system/user/list",
    meta: {
      title: "主页面",
      transition: "animate_animated animate_backOutLeft"
    },
    children: [
      {
        path: "/system/user/list",
        component: () => import("../view/system/user/list.vue"),
        meta: {
          title: "学生列表",
          transition: "animate_animated animate_backOutLeft"
        },
      },
      {
        path: "/system/user/detail",
        component: () => import("../view/system/user/detail.vue"),
        meta: {
          title: "学生可视化",
          transition: "animate_animated animate_backOutLeft",
        },
      },
      {
        path: "/system/teacher/list",
        component: () => import("../view/system/teacher/list.vue"),
        meta: {
          title: "教师列表",
          transition: "animate_animated animate_backOutLeft"
        },
      },
      {
        path: "/system/teacher/detail",
        component: () => import("../view/system/teacher/detail.vue"),
        meta: {
          title: "教师可视化",
          transition: "animate_animated animate_backOutLeft",
        },
      },
      {
        path: "/system/course/list",
        component: () => import("../view/system/course/list.vue"),
        meta: {
          title: "课程列表",
          transition: "animate_animated animate_backOutLeft"
        },
      },
      {
        path: "/system/course/detail",
        component: () => import("../view/system/course/detail.vue"),
        meta: {
          title: "课程可视化",
          transition: "animate_animated animate_backOutLeft",
        },
      },
      {
        path: "/system/score/list",
        component: () => import("../view/system/score/list.vue"),
        meta: {
          title: "成绩列表",
          transition: "animate_animated animate_backOutLeft"
        },
      },
      {
        path: "/system/score/detail",
        component: () => import("../view/system/score/detail.vue"),
        meta: {
          title: "成绩可视化",
          transition: "animate_animated animate_backOutLeft",
        },
      }
    ],
    component: () => import("../view/home/index.vue")
  },
  {
    path: '/login',
    meta: {
      title: "登录页",
      transition: "animate_animated animate_backOutRight"
    },
    component: () => import("../view/login/index.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router