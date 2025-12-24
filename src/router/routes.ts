import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
        name: 'home'
      },
      {
        path: '/all',
        component: () => import('pages/AllTasks.vue'),
        name: 'all'
      },
      {
        path: '/completed',
        component: () => import('pages/CompletedTasks.vue'),
        name: 'completed'
      },
      {
        path: '/pending',
        component: () => import('pages/PendingTasks.vue'),
        name: 'pending'
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;