/**
 * 系统兄弟组件之间的通信
 * */
export default {
  //todo 通信数据
  state: {
    menuState: false, // 菜单栏状态
    apartmentSource: ["普通", "app", "卖场上传"],
    getApartmentType: {
      "1": "精装房",
      "2": "毛坯房",
      "3": "旧改房"
    },
    apartmentType: [
      {
        value: "1",
        label: "精装房"
      },
      {
        value: "2",
        label: "毛坯房"
      },
      {
        value: "3",
        label: "旧改房"
      }
    ] // 楼盘类型
  },

  //todo 通信方法
  mutations: {
    // 是否折叠菜单栏
    changeMenuState(state) {
      state.menuState = !state.menuState;
    }
  }
};
