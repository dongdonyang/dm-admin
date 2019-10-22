// 户型管理
import rules from "../../libs/asyncRules";
import store from "../../store";

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
  //
  addTitle: "新增户型",
  editTitle: "编辑户型",
  addURL: "BUILDING_ADD",
  editURL: "BUILDING_EDIT",
  detailURL: "BUILDING_DETAIL",
  detailKey: "buildingId",
  form: {}, // 可以提供默认值
  formList: [
    {
      label: "户型名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入户型名称"
      }
    },
    {
      label: "所在楼盘",
      value: "buildingId",
      component: "BaseApartment",
      attrs: {
        placeholder: "请选择楼盘",
        list: store.state.app.apartmentType
      }
    },
    {
      label: "面积",
      value: "area",
      component: "Input",
      attrs: {
        placeholder: "请输入户型面积"
      }
    },
    {
      label: "类型",
      value: "type",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择户型"
      }
    },
    {
      label: "效果图",
      value: "picList",
      component: "BaseUpload",
    },
    {
      label: "备注",
      value: "description",
      component: "Input",
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入楼盘描述"
      }
    }
  ],
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
  title: "楼盘详情",
  form: {},
  formList: [
    {
      label: "楼盘名称",
      value: "name"
    },
    {
      label: "楼盘类型",
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
      label: "楼盘位置",
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
      label: "楼盘描述",
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
