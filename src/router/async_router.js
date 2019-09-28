/**
 * 动态路由，不同权限访问生成不同的路由表
 * */

import Main from "views/Main.vue";
export default [
  //  首页
  {
    path: "/home",
    name: "home",
    meta: {
      title: "首页",
      roles: []
    },
    redirect: { name: "homeIndex" },
    component: Main,
    children: [
      {
        path: "index",
        name: "homeIndex",
        meta: {
          title: "首页",
          hideInMenu: true
        },
        component: resolve =>
          require.ensure([], () => resolve(require("views/Home.vue")), "home")
      }
    ]
  },
  //  厂商管理
  {
    path: "/factor",
    name: "factor",
    redirect: { name: "factorList" },
    meta: {
      title: "厂商管理",
      roles: [1, 2]
    },
    component: Main,
    children: [
      {
        path: "factorList",
        name: "factorList",
        meta: {
          hideInMenu: true,
          title: "列表"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      },
      {
        path: "factorEdit",
        name: "factorEdit",
        meta: {
          hideInMenu: true,
          title: "新增编辑"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  户型任务
  {
    path: "/apartmentTask",
    name: "apartmentTask",
    meta: {
      title: "户型任务",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "factorList",
        name: "factorList",
        meta: {
          hideInMenu: true,
          title: "列表"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      },
      {
        path: "factorEdit",
        name: "factorEdit",
        meta: {
          hideInMenu: true,
          title: "新增编辑"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  户型资源
  {
    path: "/apartment",
    name: "apartment",
    meta: {
      title: "户型资源",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "floor",
        name: "apartmentFloor",
        meta: {
          title: "楼盘管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      },
      {
        path: "manage",
        name: "apartmentManage",
        meta: {
          title: "户型管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  图例资源
  {
    path: "/legend",
    name: "legend",
    meta: {
      title: "图例资源",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "hard",
        name: "legendHard",
        meta: {
          title: "硬装图例管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      },
      {
        path: "soft",
        name: "legendSoft",
        meta: {
          title: "软装图例管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  模型资源
  {
    path: "/model",
    name: "model",
    meta: {
      title: "模型资源",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "manage",
        name: "modelManage",
        meta: {
          title: "模型管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  材质资源
  {
    path: "/material",
    name: "material",
    meta: {
      title: "材质资源",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "manage",
        name: "materialManage",
        meta: {
          title: "材质管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  用户管理
  {
    path: "/user",
    name: "user",
    meta: {
      title: "用户管理",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "manage",
        name: "materialManage",
        meta: {
          title: "户型设计师管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      },
      {
        path: "manage",
        name: "materialManage",
        meta: {
          title: "模型设计师管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      },
      {
        path: "manage",
        name: "materialManage",
        meta: {
          title: "厂商管理员管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Index.vue")),
            "home"
          )
      }
    ]
  },
  //  分类管理
  {
    path: "/category",
    name: "category",
    meta: {
      title: "分类管理",
      roles: []
    },
    component: Main
  },
  //  运营面板
  {
    path: "/operate",
    name: "operate",
    meta: {
      title: "运营面板",
      roles: []
    },
    component: Main
  }
];
