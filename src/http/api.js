export default {
  /**
   * @fileoverview 整个系统的后台API接口，通过vue.installed引入
   * */
  LOGIN: "/user/login", // 登录接口

//  todo 楼盘管理接口
  BUILDING_SEARCH: "manage/building/search", // 查询楼盘list
  BUILDING_DETAIL: "manage/building/detail", // 查询楼盘detail
  BUILDING_DELETE: "manage/building/delete", // 查询楼盘delete
  BUILDING_ADD: "manage/building/add", // 查询楼盘add

//  todo 获取省市区
  GET_PROVINCE: "catalog/location/all_province", // 获取省
  GET_CITY: "catalog/location/all_city" // 获取市
};
