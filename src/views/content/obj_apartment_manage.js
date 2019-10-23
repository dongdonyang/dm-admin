// 户型管理
import rules from "../../libs/asyncRules";
import store from "../../store";
import API from "../../http/api";

// todo list配置
export const LIST_CONFIG = {
  title: "户型管理",
  searchKey: "value",
  searchInfo: {},
  listURL: "HOUSE_SEARCH",
  addRoute: "apartmentManageAdd",
  detailRoute: "apartmentManageDetail",
  tableColumn: [
    {
      title: "户型名称",
      ket: ""
    },
    {
      title: "省份",
      key: ""
    },
    {
      title: "所在城市",
      key: ""
    },
    {
      title: "所在楼盘",
      key: ""
    },
    {
      title: "类型",
      key: ""
    },
    {
      title: "面积",
      key: ""
    },
    {
      title: "方案数量",
      key: ""
    },
    {
      title: "来源",
      key: ""
    },
    {
      title: "创建人",
      key: ""
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
  detailURL: "BUILDING_DETAIL",
  detailKey: "buildingId",
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
      },
      // rule: rules.fieldFill("请选择户型")
    },
    {
      label: "效果图",
      value: "picList",
      component: "BaseUpload",
      rule: rules.fieldFill("请上传效果图"),
      change: function (list) {
        this.form.picList = list
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
    this.form.startDate = this.form.createTime;
    this.form.btype = String(this.form.btype);
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "BUILDING_DETAIL",
  searchKey: "buildingId",
  title: "户型详情",
  form: {},
  formList: [
    {
      label: "户型名称",
      value: "name"
    },
    {
      label: "户型类型",
      value: "btype",
      render: (h, row) => {
        return h("div", store.state.app.getApartmentType[row.btype]);
      }
    },
    {
      label: "地区",
      value: "province",
      render: (h, item) => {
        return h("div", `${item.province}-${item.city}`);
      }
    },
    {
      label: "户型位置",
      value: "location"
    },
    {
      label: "开发商",
      value: "developer"
    },
    {
      label: "开盘时间",
      value: "createTime"
    },
    {
      label: "户型描述",
      value: "description"
    },
    {
      label: "上传图片",
      value: "previewPic",
      render: (h, row) => {
        return h("img", {
          attrs: {
            alt: "",
            height: 100, // todo 这种方式不会转成rem，可以给class名称来处理
            src: row.previewPic
          }
        });
      }
    }
  ]
};
