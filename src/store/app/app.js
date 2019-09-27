/**
 * 系统app的store文件，主要包括导航面包屑和侧边栏
 */
import {
  getMenuByRouter,
  findRoleId,
  getBreadCrumbList
} from "../../libs/util";
import md5 from "js-md5";
import { baseRouter, asyncRouter } from "../../router/base_router";

const cIsLock = getCookie("lock") === md5("true");
// 用户是否有权限进入该页面
function hasPermission(role, route) {
  if (role && typeof role === "string") {
    role = role.join(",");
  }
  if (route.meta && route.meta.roles) {
    for (let k = 0, length = role.length; k < length; k++) {
      if (route.meta.roles.indexOf(findRoleId(role[k])) >= 0) {
        return true;
      }
    }
    return false;
  } else {
    return true;
  }
}

function filterAsyncRouter(asyncRouter, role) {
  let _routeArr = _.cloneDeep(asyncRouter);
  const accessedRouters = _routeArr.filter(route => {
    if (hasPermission(role, route)) {
      if (route.children && route.children.length !== 0) {
        route.children = filterAsyncRouter(route.children, role);
        if (route.children.length === 0) {
          delete route.children;
        }
      }
      return true;
    }
    return false;
  });
  return accessedRouters;
}

function getCookie(name) {
  let v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

export default {
  // todo 存储的数据
  state: {
    menuState: false, // 菜单栏状态
    breadCrumbList: [], // 顶部导航栏
    routers: baseRouter, // 系统路由
    addRouters: [], // 系统动态添加的路由
    isLock: cIsLock || false // 系统是否是锁屏状态
  },

  // todo 对state数据进行过滤
  getters: {
    // 获取菜单栏
    menuList: state => {
      // 其中rootSatate.user.access为用户模块的角色标识
      return getMenuByRouter(state.routers);
    },

    // 获取导航面包屑
    getBreadCrumbList: state => {
      return state.breadCrumbList;
    },

    // 获取系统是否是锁屏
    isLock: state => {
      return (
        state.isLock ||
        getCookie("lock") === md5("true") ||
        !!getCookie("lock_psd")
      );
    },

    addRouters: state => {
      return state.addRouters;
    }
  },

  // todo 同步操作
  mutations: {
    // 是否折叠菜单栏
    changeMenuState(state) {
      state.menuState = !state.menuState;
    },

    // 设置导航面包屑
    setBreadCrumb(state, routeMetched) {
      state.breadCrumbList = getBreadCrumbList(routeMetched);
    },

    // 设置路由
    setRouters: (state, routers) => {
      state.addRouters = routers;
      state.routers = baseRouter.concat(routers);
    },

    // 更改isLock
    updateLock: (state, isLock) => {
      state.isLock = isLock;
    },

    // 清空动态加载的路由
    clearAddRouters(state) {
      state.addRouters = [];
    }
  },

  // todo 里面执行异步操作
  actions: {
    setBreadCrumb: ({ commit }, routeMetched) => {
      commit("setBreadCrumb", routeMetched);
    },

    // 根据权限生成路由
    generateRoutes: ({ commit, rootState }) => {
      return new Promise(resolve => {
        let accessedRouters = filterAsyncRouter(
          asyncRouter,
          rootState.user.userInfo.role
        ); // 需要权限的路由
        commit("setRouters", accessedRouters);
        resolve();
      });
    },
    // 用户锁屏
    updateLock: ({ commit }, isLock) => {
      commit("updateLock", isLock);
    },

    clearAddRouters: ({ commit }) => {
      commit("clearAddRouters");
    }
  }
};
