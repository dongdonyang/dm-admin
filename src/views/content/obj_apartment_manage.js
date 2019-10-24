// 户型管理
import rules from "../../libs/asyncRules";
import store from "../../store";
import API from "../../http/api";

// todo list配置
export const LIST_CONFIG = {
  title: "户型管理",
  searchKey: "value",
  searchInfo: {
    name: ""
  },
  listKey: "houses",
  listURL: "HOUSE_SEARCH",
  addRoute: "apartmentManageAdd",
  detailRoute: "apartmentManageDetail",
  detailKey: "id",
  deleteKey: "houseId",
  deleteValue: "id",
  deleteURL: "HOUSE_DELETE",
  tableColumn: [
    {
      title: "户型名称",
      key: "name"
    },
    {
      title: "省份",
      key: "province"
    },
    {
      title: "所在城市",
      key: "city"
    },
    {
      title: "所在楼盘",
      key: "buildingName"
    },
    {
      title: "类型",
      key: "type"
    },
    {
      title: "面积㎡",
      key: "area"
    },
    {
      title: "方案数量",
      key: "comeSource"
    },
    {
      title: "来源",
      key: ""
    },
    {
      title: "创建人",
      key: "createUserName"
    },
    {
      title: "操作",
      slot: "action",
      align: "center",
      width: "160"
    }
  ]
};

// todo add、edit配置
export const ADD_CONFIG = {
  addTitle: "新增户型",
  editTitle: "编辑户型",
  addURL: "HOUSE_ADD",
  editURL: "HOUSE_EDIT",
  editKey: "newHouseInfo",
  detailURL: "HOUSE_DETAIL",
  detailKey: "houseId",
  addKey: "houseInfo",
  buildingList: [],
  typeList: [],
  form: {
    type: 1
  }, // 可以提供默认值
  get formList() {
    this.getBuildingList();
    return this.list;
  },
  list: [
    {
      label: "户型名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入户型名称"
      },
      rule: rules.fieldFill("请输入户型名称")
    },
    {
      label: "所在楼盘",
      value: "buildingId",
      component: "BaseSelect",
      get attrs() {
        return {
          placeholder: "请选择楼盘",
          list: ADD_CONFIG.buildingList
        };
      },
      rule: rules.fieldFill("请选择楼盘"),
      change: function(id) {
        this.getTypeList(id);
      }
    },
    {
      label: "面积",
      value: "area",
      component: "Input",
      attrs: {
        placeholder: "请输入户型面积"
      },
      rule: rules.fieldFill("请输入户型面积")
    },
    {
      label: "类型",
      value: "type",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择户型"
      }
      // rule: rules.fieldFill("请选择户型")
    },
    {
      label: "效果图",
      value: "picList",
      component: "BaseUpload",
      rule: rules.fieldFill("请上传效果图"),
      get attrs() {
        return {
          maxSize: 10,
          list: ADD_CONFIG.form.picList
        };
      },
      change: function(list) {
        this.form.picList = list;
      }
    },
    {
      label: "备注",
      value: "description",
      component: "Input",
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入户型描述"
      },
      rule: rules.fieldFill("请输入户型备注")
    }
  ],
  reForm: function() {
    ADD_CONFIG.form = {};
  },
  //查询所有楼盘
  getBuildingList: function() {
    let value = {
      value: JSON.stringify({
        btype: 0
      }),
      pageSize: 999999,
      pageNum: 1
    };
    axios.post(API.BUILDING_SEARCH, value).then(res => {
      if (res.success) {
        res.data.buildings.forEach(item => {
          ADD_CONFIG.buildingList.push({
            label: item.name,
            value: item.id
          });
        });
      }
    });
  },
  // 查询类型列表
  getTypeList(id) {
    let value = {
      buildingId: id
    };
    axios.post(API.HOUSE_HOUSE, value).then(res => {
      if (res.success) {
        res.data.buildings.forEach(item => {
          ADD_CONFIG.typeList.push({
            label: item.name,
            value: item.id
          });
        });
      }
    });
  },
  // 编辑查询后
  editInfo: function() {
    this.form.picList = this.form.pic_list
      ? JSON.parse(this.form.pic_list)
      : [];
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "HOUSE_DETAIL",
  searchKey: "houseId",
  title: "户型详情",
  form: {},
  formList: [
    {
      label: "户型名称",
      value: "name"
    },
    {
      label: "所在楼盘",
      value: "buildingName"
    },
    {
      label: "面积",
      value: "area",
      render: (h, item) => {
        return h("div", `${item.area}㎡`)
      }
    },
    {
      label: "类型",
      value: "type"
    },
    {
      label: "效果图",
      value: "pic_list",
      render: (h, item) => {
        if (!item.pic_list) return;
        let list = JSON.parse(item.pic_list);
        function getList(h) {
          let arr = [];
          list.forEach(i => {
            arr.push(
              h("img", {
                attrs: {
                  width: 100,
                  height: 100,
                  src: i
                },
                style: {
                  margin: "0 6px"
                }
              })
            );
          });
          return arr;
        }
        return h("div", getList(h));
      }
    },
    {
      label: "备注",
      value: "description"
    }
  ]
};
