// 厂商管理，增删改查，权限控制，列表字段，筛选字段条件，样式，还是单独做成组件
export default {
  title: "厂商管理",
  addURl: "1",
  deleteUrl: "",
  editUrl: "",
  searchUrl: "",
  tableColumn: [
    {
      title: "名称",
      key: "name"
    },
    {
      title: "厂商管理员",
      key: "age"
    },
    {
      title: "所在城市",
      key: "address"
    },
    {
      title: "商品数",
      key: ""
    },
    {
      title: "使用户型数",
      key: ""
    },
    {
      title: "发布方案数",
      key: ""
    },
    {
      title: "合作类型",
      key: ""
    },
    {
      title: "创建时间",
      key: ""
    },
    {
      title: "操作",
      slot: "action",
      width: "160",
      align: "center"
    }
  ]
};
