// 户型资源-楼盘管理
export default {
  listURL: "",
  deleteURL: "",
  addURL: "",
  editURL: "",
  tableColumn: [
    {
      title: "楼盘名称",
      key: ""
    },
    {
      title: "开发商",
      key: ""
    },
    {
      title: "创建人",
      key: ""
    },
    {
      title: "开盘时间",
      key: ""
    },
    {
      title: "楼盘类型",
      key: ""
    },
    {
      title: "户型数量",
      key: "",
      sortable: true
    },
    {
      title: "省份",
      key: ""
    },
    {
      title: "城市",
      key: ""
    },
    {
      title: "楼盘位置",
      key: ""
    },
    //  默认查看，编辑，删除，可配置，可自定义，还得匹配权限，什么权限能删除和修改，都得配置好，默认所有权限
    {
      width: "160",
      title: "操作",
      slot: "action",
      align: "center"
    }
  ]
};
