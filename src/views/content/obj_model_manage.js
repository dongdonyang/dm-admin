//模型管理
import store from "../../store";
import rules from "../../libs/asyncRules";

export const LIST_CONFIG = {
  title: "模型管理",
  listURL: "MODEL_SEARCH",
  searchKey: "searchInfo",
  addRoute: "modelManageAdd",
  detailRoute: "modelManageDetail",
  detailKey: "sn",
  searchInfo: {},
  listKey: "model_list",
  tableColumn: [
    {
      title: "SN编码",
      key: "sn"
    },
    {
      title: "模型名称",
      key: "name"
    },
    {
      title: "模型类型",
      key: "catalogCode"
    },
    {
      title: "上传人员",
      key: "available"
    },
    {
      title: "创建时间",
      key: "createTimeFormat"
    },
    {
      title: "预览图",
      align: "center",
      render: (h, params) => {
        return h("img", {
          attrs: {
            width: 80, // todo 不会等比缩放
            src: params.row.previewFile
          }
        });
      }
    },
    {
      title: "备注信息",
      key: "description"
    },
    {
      title: "操作",
      width: "160",
      slot: "action",
      align: "center"
    }
  ]
};

// todo add、edit配置
export const ADD_CONFIG = {
  //
  addTitle: "新增模型",
  editTitle: "编辑模型",
  addURL: "MODEL_ADD",
  addKey: "modelInfo",
  editURL: "BUILDING_EDIT",
  detailURL: "BUILDING_DETAIL",
  detailKey: "buildingId",
  // labelWidth: 120,
  form: {
    type: "硬装模型"
  }, // 可以提供默认值
  formList: [
    {
      label: "模型名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入楼盘名称"
      }
    },
    {
      label: "模型类型",
      value: "type",
      component: "Input",
      attrs: {
        disabled: true
      }
    },
    {
      label: "分类",
      value: "catalogCode",
      component: "BaseSelect",
      get attrs() {
        return {
          province: ADD_CONFIG.form.province,
          form: ADD_CONFIG.form
        };
      }
    },
    {
      label: "尺寸",
      value: "location",
      component: "BaseSize",
      get attrs() {
        return {
          form: ADD_CONFIG.form
        }
      }
    },
    {
      label: "预览图",
      value: "previewFile",
      component: "BaseUpload",
      change: function (value) {
        this.form.developer = value[0]
      }
    },
    {
      label: "模型文件",
      value: "pakFile",
      component: "BaseFiles",
      change: function (value) {
        this.form.pakFile = value
      }
    },
    {
      label: "备注信息",
      value: "description",
      component: "Input",
      // 传入多个html属性
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入楼盘描述"
      }
    }
  ],

  //form重置
  reForm: function(){
    ADD_CONFIG.form = {}; // 动态改变子组件的参数
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
  searchURL: "MODEL_DETAIL",
  searchKey: "sn",
  listKey: "model_detail",
  title: "模型详情",
  form: {},
  formList: [
    {
      label: "SN编码",
      value: "name"
    },
    {
      label: "模型名称",
      value: "name"
    },
    {
      label: "模型类型",
      value: "available"
    },
    {
      label: "分类",
      value: "catalogCode"
    },
    {
      label: "尺寸",
      value: "developer",
      render: (h, item) => {
        return h(
          "div",
          `${item.sizeLong} * ${item.sizeWidth} * ${item.sizeHeight} mm`
        );
      }
    },
    {
      label: "预览图",
      render: (h, item) => {
        return h("img", {
          attrs: {
            width: 100,
            src: item.previewFile
          }
        });
      }
    },
    {
      label: "模型文件",
      render: (h, item) => {
        return h("a", {
          domProps: {
            innerHTML: "下载"
          },
          attrs: {
            href: item.pakFile,
            download: "模型文件"
          }
        });
      }
    },
    {
      label: "备注信息",
      value: "description"
    }
  ]
};
