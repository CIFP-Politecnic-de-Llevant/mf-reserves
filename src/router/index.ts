import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import axios from "axios";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach((to, from, next) => {
    axios.defaults.withCredentials = true;
    axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
    next();
  })

  Router.afterEach((to,from)=>{
      //Matched és un array que retorna les rutes que fan match a router.ts
      const matchedTo = JSON.stringify(to.matched.map(m=>m.path));
      const matchedFrom = JSON.stringify(from.matched.map(m=>m.path));

      if(to.fullPath!=from.fullPath && matchedTo && matchedFrom && matchedTo===matchedFrom){
        window.location.reload();
      }
  })

  return Router;
});
