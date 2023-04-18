<template>
  <sidebar-menu
    :collapsed="collapsed"
    v-bind:style="{ display: isOnMobile ? (hideMenu ? 'none' : 'flex') : 'flex' }"
    :menu="menu"
    :theme="selectedTheme"
    :show-one-child="true"
    @update:collapsed="onToggleCollapse"
    @item-click="onItemClick"
  />
  <Navbar />
  <div v-if="isOnMobile && !collapsed" class="sidebar-overlay" @click="setCollapsed(true)" />
  <div
    v-bind:style="{ 'padding-left': collapsed ? (hideMenu ? '0px' : '65px') : '290px' }"
    id="demo"
    style="height: calc(100% - 56px)"
    class="bg-hxc-1 dark:bg-th-dark-secondary"
    :class="[{ collapsed: collapsed }, { onmobile: isOnMobile }]"
  >
    <slot></slot>
  </div>
</template>

<script>
import { markRaw } from "vue";

import Navbar from "@/components/Navbar.vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/vue";

const separator = {
  template: '<hr style="border-color: rgba(0, 0, 0, 0.1); margin: 20px;">',
};

import { defineComponent, ref, toRef } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  data() {
    return {
      menu: [
        {
          header: "Início",
          hiddenOnCollapse: true,
        },
        {
          href: "/home",
          title: "Home",
          icon: "fa fa-home",
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

  components: { Navbar },
  computed: {
    theme() {
      const theme = this.$store.getters["theme/getTheme"];
      return theme;
    },
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
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

<style scoped>
/* Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 56px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.content {
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}
</style>
