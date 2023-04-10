const user = {
  namespaced: false,
  state: () => ({
    userId: null,
    firstName: null,
    lastName: null,
    email: null,
    resources: {},
    roles: {},
    affiliation: undefined,
  }),

  mutations: {
    SET_UTMS(state: any, affiliation: any) {
      if (affiliation.utm_source || affiliation.utm_medium || affiliation.utm_campaign)
        state.affiliation = {
          source: affiliation.utm_source,
          medium: affiliation.utm_medium,
          campaign: affiliation.utm_campaign,
        };
    },
    SET_USER(state: any, user: any) {
      for (var key of Object.keys(user)) {
        state[key] = user[key];
      }
      /*
      console.log('received user is', user);
      state.userId = user.userId;
      state.firstName = user.firstName;
      state.lastName = user.lastName;
      state.email = user.email;
      state.document = user.document;
      state.birthday = user.birthday;
      state.phone = user.phone;
      */
    },
  },
  getters: {
    user: (state: any) => {
      return state;
    },
  },
};

export { user };
