export default {
  /**
   * @fileoverview 整个系统的后台API接口，通过vue.installed引入
   * */

  // todo 登录模块
  LOGIN: "/user/login", // 登录接口

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

  //  todo 获取省市区
  GET_PROVINCE: "catalog/location/all_province", // 获取省
  GET_CITY: "catalog/location/all_city", // 获取市
  GET_ALL_CITY: "manage/house/allCity", // 获取所有城市

  //  todo 获取所有类型、材质、纹理、颜色、风格等
  ALL_LEVEL: "catalog/classify/all_level" // 获取所有类型1硬装 2软装成品 3软装饰品 4板式家具 5材质 6颜色 7纹理 8风格
};
