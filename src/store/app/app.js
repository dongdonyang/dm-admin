/**
 * 系统兄弟组件之间的通信
 * */
export default {
  //todo 通信数据
  state: {
    menuState: false // 菜单栏状态
  },

  //todo 通信方法
  mutations: {
    // 是否折叠菜单栏
    changeMenuState(state) {
      state.menuState = !state.menuState;
    }
  }
};
