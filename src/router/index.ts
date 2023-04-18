import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    component: () => import("@/views/Home.vue"),
  },
  // {
  //   path: "/login",
  //   component: () => import("@/components/Authentication/Login.vue"),
  // },
  // {
  //   path: "/register",
  //   component: () => import("@/components/Authentication/Login.vue"),
  // },
  {
    path: "/dashboard",
    component: () => import("@/components/Dashboard/Dashboard.vue"),
  },
  {
    path: "/teste",
    component: () => import("@/components/Teste.vue"),
  },
  {
    path: "/avat",
    component: () => import("@/components/Avat/Avat.vue"),
  },
  {
    path: "/iceberg",
    component: () => import("@/components/Iceberg/Iceberg.vue"),
  },
  {
    path: "/players",
    component: () => import("@/components/Players/Players.vue"),
  },
  {
    path: "/amplitude",
    component: () => import("@/components/Amplitude/Amplitude.vue"),
  },
  {
    path: "/distortions",
    component: () => import("@/components/Distortions/Distortions.vue"),
  },
  {
    path: "/arbitragem",
    component: () => import("@/components/Arbitragem/Arbitragem.vue"),
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router;
