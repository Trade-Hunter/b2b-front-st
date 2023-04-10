const theme = {
  namespaced: true,
  state: {
    theme: "",
    collapsed: false,
    isOnMobile: false,
    hideMenu: false,
    paddingLeft: "290px",
    side_display: "flex",
    sidebar_display: false,
    SCR_OPTS: {
      liqMin: 25000000,
      liqMax: 10000000000,
    },
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
    getTheme: (state: any) => {
      return state.theme;
    },
    getPaddingLeft: (state: any) => state.paddingLeft,
    getSideDisplay: (state: any) => state.side_display,
  },

  /**
     * getPaddingLeft: (state: any) => {
        
        if (state.device == 'computer') return '290px';
        if (state.device == 'tablet') return '60px';
        if (state.device == 'mobile') return '0px';
        state.paddingLeft;
      },
     */
};

export { theme };
