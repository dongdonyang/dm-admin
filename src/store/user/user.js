/**
 * 系统用户的相关信息
 */

import { cRoleAndsRoleIsEquality } from "@/libs/util"; // 导入用户权限列表

function getCookie(name) {
  var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

const baseUserInfo = JSON.parse(sessionStorage.getItem("bg_user_info"));

const baseToken = getCookie("bg_token");

export default {
  state: {
    // 用户登陆后的信息
    userInfo: {
      account: baseUserInfo && baseUserInfo.account ? baseUserInfo.account : "",
      role:
        baseUserInfo && baseUserInfo.role ? baseUserInfo.role.split(",") : ""
    },

    userBaseInfo: {},

    // 登录后用户token
    token: baseToken || ""
  },

  getters: {
    // 获取用户帐号
    getAccount: state => {
      return state.userInfo.account;
    },

    getRole: state => {
      return state.userInfo.role;
    },

    getToken: state => {
      return state.token ? state.token : getCookie("bg_token");
    },

    isLogin: state => {
      let isLogin = !!state.token;

      let baseRole = getCookie("bg_role");
      if (baseRole) {
        baseRole = baseRole.split("%2C"); // cookie中逗号被解析成了%2C
      }
      return cRoleAndsRoleIsEquality(state.userInfo, baseRole) && isLogin;
    },

    userBaseInfo: state => {
      return state.userBaseInfo;
    }
  },

  mutations: {
    // 设置token
    setToken(state, token) {
      state.token = token;
      // token存储cookie
    },

    setUserInfo(state, userInfo) {
      state.userInfo = Object.assign({}, state.userInfo, userInfo);
    },

    setUserBaseInfo(state, userBaseInfo) {
      if (JSON.stringify(userBaseInfo) === "{}") {
        state.userBaseInfo = userBaseInfo;
      } else {
        state.userBaseInfo = Object.assign(
          {},
          state.userBaseInfo,
          userBaseInfo
        );
      }
    }
  },

  actions: {
    setToken: ({ commit }, token) => {
      commit("setToken", token);
    },

    setUserInfo: ({ commit }, userInfo) => {
      commit("setUserInfo", userInfo);
    },

    setUserBaseInfo: ({ commit }, userBaseInfo) => {
      return new Promise(resolve => {
        commit("setUserBaseInfo", userBaseInfo);
        resolve();
      });
    }
  }
};
