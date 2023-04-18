const speed = {
  namespaced: true,
  state: {
    items: [],
    billing_cycle: 0,
    userId: "",
    token: "",
    email: "",
    discount_code: "",
    refferals: [],
  },
  mutations: {
    SET_DISCOUNT(state: any, discount: any) {
      state.discount_code = discount;
    },
    ADD_REFFERAL(state: any, refferal: any) {
      if (state.refferals.findIndex((item: any) => item !== refferal) !== -1)
        state.refferals.push(refferal);
    },
    SET_EMAIL(state: any, email: any) {
      state.email = email;
    },
    SET_USER_ID(state: any, userId: any) {
      state.userId = userId;
    },
    SET_ITEMS(state: any, items: any) {
      state.items = items;
    },
    SET_BILLING_CYCLE(state: any, billing_cycle: any) {
      state.billing_cycle = billing_cycle;
    },

    SET_TOKEN(state: any, token: any) {
      state.token = token;
    },
  },

  getters: {
    billing_cycle(state: any) {
      return state.billing_cycle;
    },
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

export { speed };
