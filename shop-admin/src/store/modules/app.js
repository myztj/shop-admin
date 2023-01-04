const state = {
  openMenu: false,
};

const mutations = {
  SETOPNMENU(state) {
    state.openMenu = !state.openMenu;
  },
};

const getters = {};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
