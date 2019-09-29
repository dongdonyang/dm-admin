/**
 * 存储用户信息
 * */

export default {
  //todo 数据 $store.state
  state: {
    token: ""
  },

  //todo 操作state $store.commit()
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  }
};
