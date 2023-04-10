import { createStore, Store } from "vuex";

import { auth, theme, user } from "./modules";

import createPersistedState from "vuex-persistedstate";
import { InjectionKey } from "vue";

// define your typings for the store state

interface authStatusResource {
  isAuth: boolean;
  isAdmin: boolean;
}
interface authStatusResource {
  status: authStatusResource;
  token: null;
  refreshToken: null;
  alertToken: null;
  deviceToken: null;
}

interface userResource {
  token: string;
  firstName?: string;
}
interface authResource {
  token: string;
  refreshToken: string;
}
export interface State {
  count: number;
  auth: authStatusResource;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  plugins: [
    createPersistedState({ key: "vuex", paths: ["theme"] }),
    createPersistedState({ key: "auth", paths: ["auth"] }),
    createPersistedState({ key: "user", paths: ["user"] }),
  ],

  mutations: {},
  getters: {},
  modules: {
    theme,
    auth,
    user,
  },
});

export default store;
