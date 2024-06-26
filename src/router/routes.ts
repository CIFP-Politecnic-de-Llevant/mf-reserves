import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/MainPage.vue') },
      { path: 'reserves/:idcalendari', component: () => import('pages/ReservaList.vue') },
      { path: 'reserva/:idcalendari', component: () => import('pages/ReservaForm.vue') },
      { path: 'reserva/:idcalendari/:id', component: () => import('pages/ReservaForm.vue') },
    ],
  },

  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      { path: 'login', component: () => import('components/common/Login.vue'), props: { urlRedirect: "/" } },
      { path: 'logout', component: () => import('components/common/Logout.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
