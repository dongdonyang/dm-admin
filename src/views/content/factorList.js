// 厂商管理，增删改查，权限控制，列表字段，筛选字段条件，样式，还是单独做成组件
export default {
  addURl: "1",
  deleteUrl: "",
  editUrl: "",
  searchUrl: "",
  tableColumn: [
    {
      title: "姓名",
      key: "name"
    },
    {
      title: "年龄",
      key: "age"
    },
    {
      title: "地址",
      key: "address"
    },
    {
      title: "操作",
      render: h => {
        return h("a", "按钮", {
          on: {
            click: () => {
              console.log(22);
              alert(11);
            }
          }
        });
      }
    }
  ]
};
