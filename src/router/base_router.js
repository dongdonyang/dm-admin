/**
 * 路由配置表
 * meta信息中包含如下数据，
 * hideInMenu  --- 设置后，该路由和子路由都不显示在侧边栏
 * alwaysShow  --- 默认情况下，父菜单下只有一级子菜单，该父级菜单不会显示，设置true后强制显示父级菜单
 * icon        --- 该路由显示的图标，分为iview自带图标和iconfont的图标，iviewr图标直接为图标名称，例如"person"，iconfont图标，传入"_person"
 * title       --- 该路由的中文名称
 * roles       --- 拥有对应权限的人才能进入的路由，填入roleId即可
 */
// import Main from "views/Main";
// 基础路由
export default [
  {
    path: "",
    name: "default",
    redirect: "/home",
    meta: {
      hideInMenu: true
    }
  },
  //  todo 登录
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
      hideInMenu: true
    },
    component: resolve =>
      require.ensure([], () => resolve(require("views/Login.vue")), "login")
  },
  //  todo 锁屏页面
  {
    path: "/lock",
    meta: {
      title: "锁屏",
      hideInMenu: true
    },
    name: "lock",
    component: resolve =>
      require.ensure([], () => resolve(require("views/Lock.vue")), "error")
  },
  //  todo 设置页面
  // {
  //   path: "/set",
  //   meta: {
  //     title: "设置",
  //     hideInMenu: true
  //   },
  //   name: "set",
  //   redirect: {
  //     name: "setUp"
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: "setUp",
  //       meta: {
  //         title: "设置",
  //         hideInMenu: true
  //       },
  //       name: "setUp",
  //       redirect: { name: "Base" },
  //       component: resolve =>
  //         require.ensure(
  //           [],
  //           () => resolve(require("views/setup/Main")),
  //           "error"
  //         ),
  //       children: [
  //         {
  //           path: "base",
  //           meta: {
  //             title: "基本信息",
  //             hideInMenu: true
  //           },
  //           name: "Base",
  //           component: resolve =>
  //             require.ensure(
  //               [],
  //               () => resolve(require("views/setup/Base")),
  //               "error"
  //             )
  //         },
  //         {
  //           path: "psd",
  //           meta: {
  //             title: "修改密码",
  //             hideInMenu: true
  //           },
  //           name: "Password",
  //           component: resolve =>
  //             require.ensure(
  //               [],
  //               () => resolve(require("views/setup/Password")),
  //               "error"
  //             )
  //         }
  //       ]
  //     }
  //   ]
  // }
  //  todo 404页面
  {
    path: "*",
    meta: {
      title: "404-您走丢了",
      hideInMenu: true
    },
    name: "noFind",
    component: resolve =>
      require.ensure([], () => resolve(require("views/404.vue")), "error")
  }
];
