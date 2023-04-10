import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/table", component: () => import("@/views/Table.vue") },

  {
    path: "/multifiltros",
    component: () => import("@/components/Multifiltros.vue"),
  },
  {
    path: "/3",
    component: () => import("@/components/ChartLine.vue"),
  },
  {
    path: "/options/strategy/simulator",
    component: () => import("@/components/Options/Strategy/Simulator/Simulator2.vue"),
  },
  {
    path: "/2",
    component: () => import("@/components/Multi2.vue"),
  },
  {
    path: "/open-interest/options/equities",
    component: () => import("@/components/OI/Equities/EquitiesIndex.vue"),
  },
  {
    path: "/open-interest/options/equities/:id",
    component: () => import("@/components/OI/Equities/EquitiesDetail.vue"),
  },
  {
    path: "/open-interest/options/family",
    component: () => import("@/components/OI/Family/FamilyIndex.vue"),
  },
  {
    path: "/open-interest/options/family/:id",
    component: () => import("@/components/OI/Family/FamilyDetail.vue"),
  },
  {
    path: "/open-interest/options/mature",
    component: () => import("@/components/OI/Mature/MatureIndex.vue"),
  },
  {
    path: "/open-interest/options/mature/:id",
    component: () => import("@/components/OI/Mature/MatureDetail.vue"),
  },
  // {
  //   path: "/open-interest/options/volatility",
  //   component: () => import("@/components/OI/Volatility/VolatilityIndex.vue"),
  // },
  // {
  //   path: "/open-interest/options/volatility/:id",
  //   component: () =>
  //     import("@/components/OI/VolatilityIndex/VolatilityDetail.vue"),
  // },
  {
    path: "/options/distortions",
    component: () => import("@/components/Options/Distortions/Distortions.vue"),
  },
  {
    path: "/options/pcr",
    component: () => import("@/components/Options/Pcr/PcrIndex.vue"),
  },
  {
    path: "/options/equities",
    component: () => import("@/components/Options/Equities/Equities.vue"),
  },
  {
    path: "/options/equities/:id",
    component: () => import("@/components/Options/Equities/EquitiesDetail.vue"),
  },
  {
    path: "/options/family",
    component: () => import("@/components/Options/Family/Family.vue"),
  },
  {
    path: "/options/family/:id",
    component: () => import("@/components/Options/Family/FamilyDetail.vue"),
  },
  {
    path: "/options/screener",
    component: () => import("@/components/Options/Screener/Screener.vue"),
  },
  {
    path: "/options/gamma-exposure",
    component: () => import("@/components/Options/GammaExposure/Index.vue"),
  },
  // {
  //   path: "/options/strategy/simulator",
  //   component: () =>
  //     import("@/components/Options/Strategy/Simulator/Simulator.vue"),
  // },
  {
    path: "/options/strategy/screener/estrategias",
    component: () => import("@/components/Options/Strategy/Screener/Screener.vue"),
  },
  {
    path: "/options/strategy/screener",
    component: () => import("@/components/Options/Strategy/Screener/ScreenerIndex.vue"),
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
