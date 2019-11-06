export default {
  /**
   * @fileoverview 整个系统的后台API接口，通过vue.installed引入
   * */

  // todo 用户模块
  USER_LIST: "/user/console/list", // 用户列表、2户型管理员 3模型管理员 4厂商管理员 5CAD制图员 6硬装设计师 7软装设计师 8导购员

  // todo 登录模块
  LOGIN: "/user/login", // 登录接口
  LOGOUT: "/user/logout", // 退出

  //  todo 厂商管理
  VENDOR_ADD: "manage/vendor/add", // 厂商add
  VENDOR_DELETE: "manage/vendor/delete", // 厂商delete
  VENDOR_DETAIL: "manage/vendor/detail", // 厂商detail
  VENDOR_EDIT: "manage/vendor/edit", // 厂商edit
  VENDOR_LIST: "manage/vendor/list", // 厂商list

  //  todo 户型任务
  HOUSE_TASK_SEARCH: "manage/houseTask/search", // 户型任务list
  HOUSE_TASK_DETAIL: "manage/houseTask/detail", // 户型任务detail
  HOUSE_TASK_DELETE: "manage/houseTask/delete", // 户型任务delete
  HOUSE_TASK_ADD: "manage/houseTask/add", // 户型任务add
  HOUSE_TASK_EDIT: "manage/houseTask/update", // 户型任务edit
  HOUSE_HARD_TASK: "manage/houseTask/hard_task", // 根据户型id查询户型任务
  HOUSE_CAD_BACK: "manage/houseTask/cad_back", // CAD任务回退
  HOUSE_FINISH_HARD_TASK: "manage/houseTask/finish_hardTask", // 完成硬装任务

  //  todo 楼盘管理接口
  BUILDING_SEARCH: "manage/building/search", // 楼盘list
  BUILDING_DETAIL: "manage/building/detail", // 楼盘detail
  BUILDING_DELETE: "manage/building/delete", // 楼盘delete
  BUILDING_ADD: "manage/building/add", // 楼盘add
  BUILDING_EDIT: "manage/building/edit", // 楼盘edit
  ALL_BUILDING_IN_CITY: "mkt/building/allBuildingInCity", // 根据城市名查询所有楼盘

  //  todo 户型管理
  HOUSE_SEARCH: "manage/house/search", // 户型list
  HOUSE_DETAIL: "manage/house/detail", // 户型detail
  HOUSE_DELETE: "manage/house/delete", // 户型delete
  HOUSE_ADD: "manage/house/add", // 户型add
  HOUSE_EDIT: "manage/house/update", // 户型edit
  HOUSE_DISTRICT: "manage/house/district", // 根据city查询所有的楼盘
  HOUSE_HOUSE: "manage/house/house", // 根据楼盘id查询所有的户型
  HOUSE_TYPE: "manage/house/type", // 根据楼盘id查询所有的户型

  //  todo 图例管理
  LEGEND_CAD_SEARCH: "manage/legend/CADSearch", // 图例管理list
  LEGEND_SEARCH: "manage/legend/search", // 图例管理search
  LEGEND_DELETE: "manage/legend/delete", // 图例管理delete
  LEGEND_ADD: "manage/legend/add", // 图例管理add
  LEGEND_UPDATE: "manage/legend/update", // 图例管理edit
  LEGEND_DETAIL: "manage/legend/CADDetail", // 图例管理detail

  //  todo 模型管理
  MODEL_SEARCH: "manage/model/list", // 模型list
  MODEL_DETAIL: "manage/model/detail", // 模型detail
  MODEL_DELETE: "manage/model/delete", // 模型delete
  MODEL_ADD: "manage/model/add", // 模型add
  MODEL_EDIT: "manage/model/edit", // 模型edit

  //  todo 材质管理
  MATERIAL_SEARCH: "manage/material/list", // 材质list
  MATERIAL_DETAIL: "manage/material/detail", // 材质detail
  MATERIAL_DELETE: "manage/material/delete", // 材质delete
  MATERIAL_ADD: "manage/material/add", // 材质add
  MATERIAL_EDIT: "manage/material/edit", // 材质edit
  MATERIAL_CLASSIFY: "catalog/classify/materialClassify", // 材质分类0:主分类 1: 次分类

  //  todo 用户管理
  USER_SEARCH: "user/console/list", // 用户list 2户型管理员 3模型管理员 4厂商管理员 5CAD制图员 6硬装设计师 7软装设计师 8导购员
  USER_DETAIL: "user/console/detail", // 用户detail
  USER_DELETE: "user/console/delete", // 用户delete
  USER_ADD: "user/console/add", // 用户add {'nickName':'昵称','psssword':'初始化密码 MD5加密','phone':'手机号','email':'邮箱','roleId':'2户型管理员 3模型管理员 4厂商管理员 5CAD制图员 6硬装设计师 7软装设计师 8导购员','vendorId':'厂家管理员所属厂家Id','marketId':'卖场ID'}
  USER_EDIT: "user/console/edit", // 用户edit

  //  todo 获取省市区
  GET_PROVINCE: "catalog/location/all_province", // 获取省
  GET_CITY: "catalog/location/all_city", // 获取市
  GET_ALL_CITY: "manage/house/allCity", // 获取所有城市

  //  todo 获取所有类型、材质、纹理、颜色、风格等
  ALL_LEVEL: "catalog/classify/all_level" // 获取所有类型1硬装 2软装成品 3软装饰品 4板式家具 5材质 6颜色 7纹理 8风格
};
