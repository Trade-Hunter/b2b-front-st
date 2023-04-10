const auth = {
  namespaced: false,
  state: {
    status: { loggedIn: false },
    token:
      "eyJfaWQiOiI2MjY4YzcwZDU0OTAzN2Y2MzIxMTAwN2EiLCJpYXQiOjE2NzE4OTMxNjA4MjR9.eyJhbGciOiJFUzUxMiIsImtpZCI6IlRNbXp2d1YtZWdWVTR6RGJmalh1S3NsbXY5OTVhUWwyZmxNOHV4ZXNKM0EifQ.AQk71ouirWWmg4DG5FXwvDbsot_zxNxswsqDVw59qMNwf5bE5qRbBia6nDGa29BqsZZKmQ9boaXL-YdpukYtQh-fAKMSeXQz4PWfqawbzywcnVlxBYR6GWwtMfH3iTmPnfk9VkdUX8AkzCzXTrTwXlbeijrgTrbrldITh-l3jDtBYklV",
    refreshToken: null,
    alertToken: null,
    deviceToken: null,
  },
  actions: {},
  mutations: {
    setRefreshToken(state: any, refreshToken: any) {
      state.refreshToken = refreshToken;
    },
    setAlertToken(state: any, opts: any) {
      if (opts.type == "web") state.alertToken = opts.token;
      else state.deviceToken = opts.token;
    },
    setToken(state: any, token: any) {
      state.token = token;
    },
    loginSuccess(state: any, authResponse: any) {
      state.user = authResponse.user;
      state.status.loggedIn = true;
      state.token = authResponse.token;

      state.refreshToken = authResponse.refreshToken || "naocriamosainda";
    },
    loginFailure(state: any) {
      state = { status: { loggedIn: false }, token: null, refreshToken: null };
    },
    logout(state: any) {
      state.status.loggedIn = false;
    },
    logout2(state: any) {
      state.status.loggedIn = false;
      state.refreshToken = null;
      state.token = null;
    },
    login(state: any) {
      state.status.loggedIn = true;
    },
    sessionExpired(state: any) {
      state.status.loggedIn = false;
      state.user = null;
      state.refreshToken = null;
      state.token = null;
    },
    registerSuccess(state: any, data: any) {
      state.status.loggedIn = false;
      state.user = data.user;
      state.token = data.token;

      state.refreshToken = data.refreshToken || "naocriamosainda";
    },
    registerFailure(state: any) {
      state.status.loggedIn = false;
    },
    checkoutSuccess(state: any, data: any) {
      state.status.loggedIn = false;
      state.user = data.user;
    },
    checkoutFailure(state: any) {
      state.status.loggedIn = false;
    },
    refreshToken(state: any, data: any) {
      state.status.loggedIn = true;

      //state.user = { ...state.user, accessToken: accessToken };
      state.token = data.token;
      state.refreshToken = data.refreshToken || "naocriamosainda";
    },
  },
  getters: {
    token: (state: any) => {
      return state.token;
    },
  },
};

export { auth };
