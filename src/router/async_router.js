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
    redirect: { name: "home" },
    component: Main,
    children: [
      {
        path: "/home",
        name: "home",
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
            () => resolve(require("views/content/Edit.vue")),
            "home"
          )
      },
      {
        path: "factorDetail",
        name: "factorDetail",
        meta: {
          hideInMenu: true,
          title: "详情"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Detail.vue")),
            "home"
          )
      }
    ]
  },
  //  户型任务
  {
    path: "/apartmentTask",
    name: "apartmentTask",
    redirect: { name: "apartmentTaskList" },
    meta: {
      title: "户型任务",
      roles: []
    },
    component: Main,
    children: [
      {
        path: "apartmentTaskList",
        name: "apartmentTaskList",
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
      //  楼盘管理-新增-编辑
      {
        path: "addFloor",
        name: "addFloor",
        component: resolve =>
          require.ensure(
            [],
            // () => resolve(require("../views/lowerView/buildings/AddBuilding")),
            () => resolve(require("../views/content/Edit.vue")),
            "home"
          )
      },
      //  楼盘管理-查看
      {
        path: "lookFloor",
        name: "lookFloor",
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("../views/content/Detail.vue")),
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
      },
      //  户型管理-新增
      {
        path: "apartmentManageAdd",
        name: "apartmentManageAdd",
        component: resolve =>
            require.ensure(
                [],
                () => resolve(require("views/content/Edit.vue")),
                "home"
            )
      },
      //  户型管理-查看
      {
        path: "apartmentManageDetail",
        name: "apartmentManageDetail",
        component: resolve =>
            require.ensure(
                [],
                () => resolve(require("views/content/Detail.vue")),
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
      },
      {
        path: "modelManageDetail",
        name: "modelManageDetail",
        meta: {
          title: "模型管理modelManageDetail",
          hideInMenu: true
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Detail.vue")),
            "home"
          )
      },
      {
        path: "modelManageAdd",
        name: "modelManageAdd",
        meta: {
          title: "模型管理modelManageAdd",
          hideInMenu: true
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Edit.vue")),
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
      },
      {
        path: "manageDetail",
        name: "manageDetail",
        meta: {
          title: "材质管理manageDetail",
          hideInMenu: true
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Detail.vue")),
            "home"
          )
      },
      {
        path: "manageAdd",
        name: "manageAdd",
        meta: {
          title: "材质管理manageAdd",
          hideInMenu: true
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/content/Edit.vue")),
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
    component: Main,
    children: [
      {
        path: "gridModel",
        name: "gridModel",
        meta: {
          title: "成品分类管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/Classify.vue")),
            "home"
          )
      },
      {
        path: "component",
        name: "component",
        meta: {
          title: "软装饰品分类管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/gridModel.vue")),
            "home"
          )
      },
      {
        path: "model1",
        name: "model1",
        meta: {
          title: "板式家具分类管理"
        },
        component: resolve =>
          require.ensure([], () => resolve(require("views/model.vue")), "home")
      },
      {
        path: "color",
        name: "color",
        meta: {
          title: "颜色分类管理"
        },
        component: resolve =>
          require.ensure([], () => resolve(require("views/color.vue")), "home")
      },
      {
        path: "graph",
        name: "graph",
        meta: {
          title: "纹理分类管理"
        },
        component: resolve =>
          require.ensure([], () => resolve(require("views/graph.vue")), "home")
      },
      {
        path: "material1",
        name: "material1",
        meta: {
          title: "材质分类管理"
        },
        component: resolve =>
          require.ensure(
            [],
            () => resolve(require("views/material.vue")),
            "home"
          )
      }
      // {
      //   path: "goods",
      //   name: "goods",
      //   meta: {
      //     title: "商品分类管理"
      //   },
      //   component: resolve =>
      //       require.ensure(
      //           [],
      //           () => resolve(require("views/goods.vue")),
      //           "home"
      //       )
      // }
    ]
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
