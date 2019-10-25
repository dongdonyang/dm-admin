// 材质管理
import store from "../../store";
import rules from "../../libs/asyncRules";
import API from "../../http/api";

export const LIST_CONFIG = {
  title: "材质管理",
  listURL: "MATERIAL_SEARCH",
  searchKey: "searchInfo",
  detailKey: "sn",
  searchInfo: {},
  listKey: "material_list",
  addRoute: "manageAdd",
  detailRoute: "manageDetail",
  deleteURL: "MATERIAL_DELETE",
  detailId: "sn",
  deleteKey: "sn",
  deleteValue: "sn",
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
            height: 80,
            width: 80, // todo 不会等比缩放
            src: params.row.previewFile
          }
        });
      }
    },
    {
      title: "备注信息",
      key: "description",
      ellipsis: true
    },
    {
      title: "操作",
      slot: "action",
      width: 160,
      align: "center"
    }
  ]
};

// todo add、edit配置
export const ADD_CONFIG = {
  //
  addTitle: "新增材质",
  editTitle: "编辑材质",
  addURL: "MATERIAL_ADD",
  addKey: "materialInfo",
  editURL: "MATERIAL_EDIT",
  detailURL: "MATERIAL_DETAIL",
  detailKey: "sn",
  editKey: "materialInfo",
  colorList: [],
  veinList: [],
  materList: [],
  form: {}, // 可以提供默认值
  get formList() {
    this.getColor();
    this.getVein();
    this.getMater();
    return this.list;
  },
  list: [
    {
      label: "材质名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入材质名称"
      },
      rule: rules.fieldFill("请输入材质名称")
    },
    {
      label: "色调",
      value: "colorCode",
      component: "BaseSelect",
      get attrs() {
        return {
          list: ADD_CONFIG.colorList,
          placeholder: "请选择色调"
        };
      },
      rule: rules.fieldFill("请选择色调")
    },
    {
      label: "纹理",
      value: "graphCode",
      component: "BaseSelect",
      get attrs() {
        return {
          list: ADD_CONFIG.veinList,
          placeholder: "请选择纹理"
        };
      },
      rule: rules.fieldFill("请选择纹理")
    },
    {
      label: "材质类别",
      value: "catalogCode",
      component: "BaseSelect",
      get attrs() {
        return {
          list: ADD_CONFIG.materList,
          placeholder: "请选择材质类别"
        };
      },
      rule: rules.fieldFill("请选择材质类别")
    },
    {
      label: "材质文件",
      value: "pakFile",
      component: "BaseFiles",
      get attrs() {
        return {
          placeholder: "请选择材质文件",
          file: ADD_CONFIG.form.pakFile
        };
      },
      rule: rules.fieldFill("请选择材质文件"),
      change: function(val) {
        this.form.pakFile = val;
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
      },
      rule: rules.fieldFill("请输入备注信息")
    },
    {
      label: "预览图",
      value: "previewFile",
      component: "BaseUpload",
      rule: rules.fieldFill("请上传图片"),
      get attrs() {
        return {
          list: [ADD_CONFIG.form.previewFile]
        };
      },
      change: function(value) {
        this.form.previewFile = value[0];
      }
    }
  ],
  // 获取色调
  getColor: function() {
    axios
      .post(API.ALL_LEVEL, {
        classify: 6
      })
      .then(res => {
        if (res.success) {
          this.colorList = [];
          res.data.list.forEach(item => {
            this.colorList.push({
              label: item.name,
              value: item.code
            });
          });
        }
      });
  },
  // 获取纹理
  getVein: function() {
    axios
      .post(API.ALL_LEVEL, {
        classify: 7
      })
      .then(res => {
        if (res.success) {
          this.veinList = [];
          res.data.list.forEach(item => {
            this.veinList.push({
              label: item.name,
              value: item.code
            });
          });
        }
      });
  },
  // 获取材质
  getMater: function() {
    axios
      .post(API.ALL_LEVEL, {
        classify: 5
      })
      .then(res => {
        if (res.success) {
          this.materList = [];
          res.data.list.forEach(item => {
            this.materList.push({
              label: item.name,
              value: item.code
            });
          });
        }
      });
  },
  // 清除缓存
  reForm() {
    ADD_CONFIG.form = {};
  },
  // 编辑查询后
  editInfo: function() {
    this.form = this.form.material;
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "MATERIAL_DETAIL",
  searchKey: "sn",
  searchValue: "sn",
  listKey: "material",
  title: "材质详情",
  form: {},
  formList: [
    {
      label: "SN编码",
      value: "sn"
    },
    {
      label: "材质名称",
      value: "catalogCode"
    },
    {
      label: "色调",
      value: "colorCode"
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
        });
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
            width: 100,
            height: 100, // todo 这种方式不会转成rem，可以给class名称来处理
            src: row.previewFile
          }
        });
      }
    }
  ]
};
