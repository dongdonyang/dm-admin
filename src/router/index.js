/**
 * 1、如果模块过多/协作开发人员模块有交叉，请按人员/模块新建文件夹，使用解构[...]的方式合并路由
 * 2、路由请使用懒加载的模式引入
 */

import baseRouter from "./base_router";
import asyncRouter from "./async_router";
import store from "../store";

Vue.use(VueRouter);

const RouterConfig = {
  mode: "history",
  routes: [...baseRouter, ...asyncRouter]
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, form, next) => {
  // 判断是否登录
  if (sessionStorage.getItem("token")) {
    next();
  } else {
    to.name === "login" ? next() : next("/login");
  }
});

// // 用户是否有权限进入该页面
// function hasPermission(role, route) {
//   if (role && typeof role === "string") {
//     role = role.join(",");
//   }
//   if (route.meta && route.meta.roles) {
//     for (let k = 0, length = role.length; k < length; k++) {
//       if (route.meta.roles.indexOf(findRoleId(role[k])) >= 0) {
//         return true;
//       }
//     }
//     return false;
//   } else {
//     return true;
//   }
// }

// const whiteList = ["/login"]; // 不重定向白名单

// router.beforeEach((to, from, next) => {
//   // 获取store中用户是否登录
//   let isLogin = store.getters.isLogin;
//   if (isLogin) {
//     // 如果用户已经登录
//     if (store.getters.addRouters.length === 0) {
//       // 如果没有动态添加路由
//       store.dispatch("generateRoutes").then(() => {
//         router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
//       }); // 根据角色计算async的路由列表
//     }
//
//     if (store.getters.isLock && to.path !== "/lock") {
//       // 如果当前是锁屏页，用户手动输入地址离开该页面，重定向回锁屏页
//       next({
//         path: "/lock",
//         replace: true
//       });
//     } else if (store.getters.isLock && to.path === "/lock") {
//       // 用户点击锁屏进入锁屏页
//       next();
//     } else if (to.path === "/login") {
//       // 如果用户已经登录且手动去到登录页
//       next({
//         name: "dashboard"
//       });
//     } else {
//       if (hasPermission(store.getters.getRole, to)) {
//         // 如果用户有权限访问该路由
//         next();
//       } else {
//         // 用户没有权限访问该路由
//         next({
//           path: "/noaccess",
//           replace: true
//         });
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next();
//     } else {
//       // 如果没有登录，则重定向到登录
//       next("/login");
//     }
//   }
// });
