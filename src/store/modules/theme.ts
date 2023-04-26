export default {
  namespaced: true,
  state: {
    isDarkMode: false,
    theme: "light",
    collapsed: false,
    isOnMobile: false,
    hideMenu: false,
    paddingLeft: "290px",
    side_display: "flex",
    sidebar_display: false,
    DASH_OPTS: null,
    accessWarning: false,
  },
  mutations: {
    SET_DISPLAY(state: any, hidden: any) {
      state.hideMenu = hidden;
      console.log("will hide", state.hideMenu);
    },
    SET_THEME(state: any, theme: any) {
      console.log("setando ai", theme);
      if (theme != state.theme) {
        const html = document.querySelector("html");
        if (!html) return;
        theme === "light" ? html.classList.remove("dark") : html.classList.add("dark");
      }

      state.theme = theme;
      localStorage.theme = theme;

      if (state.theme == "light") {
        state.isDarkMode = false;
      } else {
        state.isDarkMode = true;
      }
    },
    SET_DASH_OPTS(state: any, theme: any) {
      state.DASH_OPTS = theme;
    },
    SET_SCR_OPTS(state: any, theme: any) {
      state.SCR_OPTS = theme;
    },
    TOGGLE_DEVICE(state: any, isMobile: any) {
      state.collapsed = isMobile;
    },
    SET_PADDING_LEFT: (state: any, paddingLeft: any) => {
      state.paddingLeft = paddingLeft;
    },
    SET_SIDE_DISPLAY: (state: any, side: any) => {
      state.side_display = side;
    },
    TOGGLE_COLLAPSE: (state: any, value: any) => {
      state.collapsed = value;
    },
    TOOGLE_SIDEBAR: (state: any, side: any) => {
      state.sidebar_display = !state.sidebar_display;
    },
    TOGGLE_MOBILE: (state: any, value: any) => {
      state.isOnMobile = value;
    },

    toggleWarning: (state: any) => {
      state.accessWarning = !state.accessWarning;
    },
    toggleDarkMode(state: any, isDarkMode: any) {
      state.isDarkMode = isDarkMode;
      if (state.isDarkMode) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("darkMode", "true");
        state.theme = "dark";
        state.isDarkMode = true;
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("darkMode", "false");
        state.theme = "light";
        state.isDarkMode = false;
      }
    },
  },
  actions: {
    toggleSidebar({ commit }: any, theme: any) {
      commit("TOOGLE_SIDEBAR");
    },
    setPaddingLeft({ commit }: any, theme: any) {
      commit("SET_PADDING_LEFT", theme);
    },
    toggleCollapse({ commit }: any, theme: any) {
      commit("TOGGLE_COLLAPSE", theme);
    },
    toggleMobile({ commit }: any, theme: any) {
      commit("TOGGLE_MOBILE", theme);
    },
    setSideDisplay({ commit }: any, theme: any) {
      commit("SET_SIDE_DISPLAY", theme);
    },
    initTheme({ commit }: any) {
      // On page load or when changing themes, best to add inline in `head` to avoid FOUC
      console.log("chamando initTheme");

      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        commit("SET_THEME", "dark");
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");

        commit("SET_THEME", "light");
      }
    },
    // This simply flips whatever was most recently committed to storage.
    toggleTheme({ commit }: any) {
      switch (localStorage.theme) {
        case "light":
          commit("SET_THEME", "dark");
          break;

        default:
          commit("SET_THEME", "light");
          break;
      }
    },

    toggleDevice({ commit }: any, isMobile: boolean) {
      commit("TOGGLE_DEVICE", isMobile);
    },
  },
  getters: {
    isDarkMode(state: any) {
      return state.isDarkMode;
    },
    getTheme: (state: any) => {
      return state.theme;
    },
    getPaddingLeft: (state: any) => state.paddingLeft,
    getSideDisplay: (state: any) => state.side_display,
  },
};
