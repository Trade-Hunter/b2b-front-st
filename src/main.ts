import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import store from "./store";
import VueSidebarMenu from "vue-sidebar-menu";
import CustomScrollbar from "custom-vue-scrollbar";
import "custom-vue-scrollbar/dist/style.css";
import directives from "./directives";
//import "vue-sidebar-menu/dist/vue-sidebar-menu.css";
import notify from "@kyvg/vue3-notification";
import api from "./services/api";
import "@fontsource/roboto";

import "./style.css";
import "./assets/sidebar-menu.css";
import "./styles/main.scss";
import "./dark-mode.css";

const app = createApp(App);

app.component(CustomScrollbar.name, CustomScrollbar);

directives(app);
app.use(notify);
app.config.globalProperties.$api = api;
app.use(router);
app.use(store);
app.use(VueSidebarMenu);
app.mount("#app");
