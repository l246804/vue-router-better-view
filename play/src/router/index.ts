import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/list',
      children: [
        {
          path: '/list',
          component: () => import('@/views/List.vue'),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: '/list/detail/:viewKey',
          component: () => import('@/views/ListDetail.vue'),
          meta: {
            keepAlive: true,
          },
        },

        {
          path: '/list2',
          component: () => import('@/views/List2.vue'),
          meta: {
            keepAlive: true,
          },
        },
        {
          path: '/list2/detail/:viewKey',
          component: () => import('@/views/ListDetail.vue'),
          meta: {
            keepAlive: true,
            singleton: true,
          },
        },
      ],
    },
  ],
})

export default router
