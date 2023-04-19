import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

const routes: any = [
  {
    path: "/",
    component: () => import("@/components/LandingPage/LandingPage.vue"),
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
    meta: { verifyAuth: true, permission: "", title: "Dashboard" },
  },
  {
    path: "/teste",
    component: () => import("@/components/Teste.vue"),
  },
  {
    path: "/avat",
    component: () => import("@/components/Avat/Avat.vue"),
    meta: { verifyAuth: true, permission: "", title: "Avat" },
  },
  {
    path: "/iceberg",
    component: () => import("@/components/Iceberg/Iceberg.vue"),
    meta: { verifyAuth: true, permission: "", title: "Iceberg" },
  },
  {
    path: "/players",
    component: () => import("@/components/Players/Players.vue"),
    meta: { verifyAuth: true, permission: "", title: "Players" },
  },
  {
    path: "/amplitude",
    component: () => import("@/components/Amplitude/Amplitude.vue"),
    meta: { verifyAuth: true, permission: "", title: "Amplitude" },
  },
  {
    path: "/distortions",
    component: () => import("@/components/Distortions/Distortions.vue"),
    meta: { verifyAuth: true, permission: "", title: "Distortions" },
  },
  {
    path: "/arbitragem",
    component: () => import("@/components/Arbitragem/Arbitragem.vue"),
    meta: { verifyAuth: true, permission: "", title: "Arbitragem" },
  },
  {
    path: "/user/profile",
    component: () => import("@/components/User/Profile.vue"),
    meta: { verifyAuth: true, permission: "", title: "Perfil Usuário" },
  },
  {
    path: "/login",
    name: "auth-login",
    component: () => import("@/components/Auth/Login.vue"),
  },
  {
    path: "/register",
    name: "auth-register",
    component: () => import("@/components/Auth/Register.vue"),
  },
  {
    path: "/password-reset",
    name: "password-reset",
    component: () => import("@/components/Auth/ResetPassword.vue"),
  },
  {
    path: "/verify-email",
    name: "verify-email",
    component: () => import("@/components/Auth/Login.vue"),
  },
  {
    name: "expired",
    path: "/expired",
    component: () => import("@/components/Expired.vue"),
    meta: { title: "Sessão Expirada" },
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: () => import("@/components/NotFound.vue"),
  },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
import store from "../store";

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: function (to, from, savedPosition) {
    if (to.hash) {
      //return { selector: to.hash };
      //Or for Vue 3:
      return { el: to.hash };
    } else {
      //return { x: 0, y: 0 };
    }
  },
});

import { nextTick } from "vue";

const DEFAULT_TITLE = import.meta.env.VITE_DEFAULT_TITLE;
router.afterEach((to) => {
  nextTick(() => {
    console.log("default title is", DEFAULT_TITLE);
    (document.title as any) = to.meta.title ? to.meta.title + " - " + DEFAULT_TITLE : DEFAULT_TITLE;
  });
});

router.beforeEach((to, from, next) => {
  const verifyAuth = to.matched.some((record) => record.meta.verifyAuth);
  const permission: any = to.meta?.permission;

  if (verifyAuth && (!permission || !store.state.user.resources[permission])) store.commit("auth/setPermission", false);
  else store.commit("auth/setPermission", true);
  const display_sidebar = (store as any).state.theme.sidebar_display;

  //if (!verifyAuth && store.state.auth.status.loggedIn) next({ path: '/dashboard' });
  if ((verifyAuth && !display_sidebar) || (!verifyAuth && display_sidebar)) store.dispatch("theme/toggleSidebar");

  if (verifyAuth && !store.state.auth.status.loggedIn) next({ path: "/login" });
  next();
});

export default router;
