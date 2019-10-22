// 材质管理
import store from "../../store";
import rules from "../../libs/asyncRules";

export const LIST_CONFIG = {
  title: "材质管理",
  listURL: "MATERIAL_SEARCH",
  searchKey: "searchInfo",
    detailKey: "sn",
  searchInfo: {},
  listKey: "material_list",
  addRoute: "manageAdd",
  detailRoute: "manageDetail",
  tableColumn: [
    {
      title: "SN编码",
      key: "sn"
    },
    {
      title: "材质名称",
      key: "name"
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
            alt: "图片无法加载",
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
  addTitle: "新增材质",
  editTitle: "编辑材质",
  addURL: "BUILDING_ADD",
  addKey: "buildingInfo",
  editURL: "BUILDING_EDIT",
  detailURL: "BUILDING_DETAIL",
  detailKey: "buildingId",
  // labelWidth: 120,
  form: {}, // 可以提供默认值
  formList: [
    {
      label: "材质名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入材质名称"
      },
      rule: rules.myinput
    },
    {
      label: "色调",
      value: "colorCode",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择色调"
      }
    },
    {
      label: "纹理",
      value: "graphCode",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择纹理",
      }
    },
    {
      label: "材质类别",
      value: "catalogCode",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择材质类别"
      }
    },
    {
      label: "材质文件",
      value: "pakFile",
      component: "Input",
      attrs: {
        placeholder: "请选择材质文件"
      }
    },
    {
      label: "备注信息",
      value: "description",
      component: "Input",
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入备注信息"
      }
    },
    {
      label: "预览图",
      value: "previewFile",
      component: "BaseUpload",
      change: function(value) {
        this.form.previewPic = value[0];
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
  searchURL: "MATERIAL_DETAIL",
  searchKey: "sn",
  searchValue: "sn",
    listKey: "material",
  title: "楼盘详情",
  form: {},
  formList: [
    {
      label: "SN编码",
      value: "name"
    },
    {
      label: "材质名称",
      value: "catalogCode"
    },
    {
      label: "色调",
      value: "colorCode",
    },
    {
      label: "纹理",
      value: "graphCode"
    },
    {
      label: "材质类别",
      value: "catalogCode"
    },
    {
      label: "材质文件",
      render: (h, item) => {
        return h("a", {
          domProps: {
            innerHTML: "下载"
          },
          attrs: {
            href: item.pakFile,
            download: "材质文件"
          }
        })
      }
    },
    {
      label: "备注信息",
      value: "description"
    },
    {
      label: "预览图",
      value: "previewPic",
      render: (h, row) => {
        return h("img", {
          attrs: {
            alt: "",
            height: 100, // todo 这种方式不会转成rem，可以给class名称来处理
            src: row.previewFile
          }
        });
      }
    }
  ]
};
