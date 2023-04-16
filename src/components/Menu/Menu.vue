<template>
  <sidebar-menu
    :collapsed="collapsed"
    v-bind:style="{
      display: isOnMobile ? (hideMenu ? 'none' : 'flex') : 'flex',
      'margin-top': isOnMobile ? (hideMenu ? 'none' : '0px') : '50px',
    }"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  />

  <Navbar />
  <div v-if="isOnMobile && !collapsed" class="sidebar-overlay dark:bg-dark-2" @click="setCollapsed(true)" />

  <div
    v-bind:style="{
      'padding-left': collapsed ? (hideMenu ? '0px' : '65px') : '290px',
    }"
    id="demo"
    style="height: calc(100% - 50px)"
    class="bg-hxc-1 bg-[#21272e]"
    :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]"
  >
    <slot></slot>
  </div>
</template>

<script>
import bugIcon from "@/assets/icons/Bubble.vue";
import chatBubbleVue from "../../assets/icons/chat-bubble.vue";
import { defineComponent, ref, markRaw } from "vue";
import { useStore } from "vuex";
import {
  InformationCircle,
  Beaker,
  ExclamationCircle,
  ExclamationTriangle,
  GlobeAlt,
  LightBulb,
  PresentationChartBar,
  Home,
  ListBullet,
  ArrowTrendingUp,
} from "@/assets/icons/heroicons";
import Navbar from "@/components/Navbar.vue";

import separator from "@/components/separator.vue";
export default defineComponent({
  data() {
    return {
      menu: [
        {
          title: "Dashboard",
          href: "/dashboard",
          icon: { element: markRaw(Beaker) },
        },
        {
          title: "Avat",
          href: "/avat",
          icon: { element: markRaw(LightBulb) },
        },
        {
          title: "Iceberg",
          href: "/iceberg",
          icon: { element: markRaw(LightBulb) },
        },
        {
          title: "Players",
          href: "/players",
          icon: { element: markRaw(LightBulb) },
        },
        {
          title: "Amplitude",
          href: "/amplitude",
          icon: { element: markRaw(LightBulb) },
        },
        {
          title: "Distortions",
          href: "/distortions",
          icon: { element: markRaw(LightBulb) },
        },
        {
          title: "Arbitragem",
          href: "/arbitragem",
          icon: { element: markRaw(LightBulb) },
        },

        {
          header: "Outros",
          hiddenOnCollapse: true,
        },
        {
          component: markRaw(separator),
          hiddenOnCollapse: true,
        },
        {
          title: "Meu Perfil",
          href: "/ss",
          icon: { element: markRaw(Home) },
        },
      ],

      themes: [
        {
          name: "Default theme",
          input: "",
        },
        {
          name: "White theme",
          input: "white-theme",
        },
      ],
    };
  },

  setup() {
    const store = useStore();
    const collapsed = ref(store.state.theme.collapsed);
    const isOnMobile = ref(store.state.theme.isOnMobile);

    console.log("collapsed", collapsed.value, "isOnMobile", isOnMobile.value);

    return { collapsed, isOnMobile };
  },
  beforeMount() {
    this.$store.dispatch("theme/initTheme");
  },
  mounted() {
    // const html = document.querySelector("html");
    // if (!html) return;
    // html.classList.add("dark");
    // document.documentElement.classList.add("dark");
    this.onResize();
    window.addEventListener("resize", this.onResize);
    console.log(this.loggedIn);
  },

  components: {
    Navbar,
  },
  computed: {
    theme() {
      const theme = this.$store.getters["theme/getTheme"];
      return theme;
    },

    selectedTheme() {
      return this.theme === "light" ? "white-theme" : "";
    },
    _collapsed() {
      return this.$store.state.theme.collapsed;
    },
    hideMenu() {
      return this.$store.state.theme.hideMenu;
    },
  },
  methods: {
    onToggleCollapse(collapsed) {
      console.log("collaps", collapsed);
      this.$store.commit("theme/TOGGLE_COLLAPSE", collapsed);
    },
    onItemClick(event, item) {
      console.log("onItemClick");
    },
    setCollapsed(value) {
      this.$store.commit("theme/TOGGLE_COLLAPSE", value);
    },
    onResize() {
      console.log("resizeee", window.innerWidth);
      if (window.innerWidth <= 767) {
        if (!this.hideMenu) this.$store.commit("theme/SET_DISPLAY", false);
        this.$store.commit("theme/TOGGLE_MOBILE", true);
        this.$store.commit("theme/TOGGLE_COLLAPSE", true);
        this.$store.commit("theme/SET_DISPLAY", true);

        this.collapsed = this.collapsed ? true : false;
      } else {
        if (this.hideMenu) this.$store.commit("theme/SET_DISPLAY", false);
        this.$store.commit("theme/TOGGLE_MOBILE", false);
        this.$store.commit("theme/TOGGLE_COLLAPSE", this.collapsed ? true : false);

        this.collapsed = this.collapsed ? true : false;
      }
    },
  },
  watch: {
    _collapsed(newv, oldv) {
      this.collapsed = newv;
    },
  },
});
</script>

<style>
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
