// 楼盘管理-配置list页面
import rules from "../../libs/asyncRules"; // 表单验证表
import store from "../../store";
import API from "../../http/api";

// todo list配置
export const LIST_CONFIG = {
  get select() {
    let that = this;
    return {
      template: `<div>
<base-select placeholder="分类" :list="typeList" @change="change" v-model="currentObj.searchInfo.typeCode"></base-select>
<base-input placeholder="图例名称或关键字" @change="change" v-model="currentObj.searchInfo.name"></base-input>
</div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          currentObj: that,
          typeList: []
        };
      },
      created() {
        this.typeList = [];
        this.getCatalogList();
      },
      methods: {
        // 获取硬装分类
        getCatalogList: function() {
          axios
            .post(API.ALL_LEVEL, {
              classify: 1
            })
            .then(res => {
              if (res.success) {
                res.data.list.forEach(i => {
                  this.typeList.push({
                    label: i.name,
                    value: i.code
                  });
                });
              }
            });
        },
        change() {
          this.obj.currentPage = 1;
          this.obj.getList();
        }
      }
    };
  },
  searchKey: "value",
  searchInfo: {
    classify: 1
  },
  title: "硬装图例管理",
  addRoute: "legendHardADD",
  detailRoute: "legendHardDetail",
  listKey: "legends",
  detailKey: "sn",
  detailId: "sn",
  listURL: "LEGEND_CAD_SEARCH",
  deleteURL: "LEGEND_DELETE",
  deleteKey: "sn",
  deleteValue: "sn",
  tableColumn: [
    {
      title: "sn编码",
      key: "sn"
    },
    {
      title: "名称",
      key: "name"
    },
    {
      title: "类型",
      key: "typeName"
    },
    {
      title: "图例容差(mm)",
      key: "tolerance"
    },
    {
      title: "创建时间",
      key: "createTimeFormat"
    },
    {
      title: "备注",
      key: "description"
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

// todo add、edit配置
export const ADD_CONFIG = {
  //
  addTitle: "新增硬装图例",
  editTitle: "编辑硬装图例",
  addURL: "LEGEND_ADD",
  addKey: "legendInfo",
  editURL: "LEGEND_UPDATE",
  detailURL: "LEGEND_DETAIL",
  detailKey: "sn",
  editKey: "newLegendInfo",
  catalogList: [],
  form: {}, // 可以提供默认值
  get formList() {
    this.getCatalogList();
    return this.list;
  },
  // 获取硬装分类
  getCatalogList: function() {
    axios
      .post(API.ALL_LEVEL, {
        classify: 1
      })
      .then(res => {
        if (res.success) {
          res.data.list.forEach(i => {
            ADD_CONFIG.catalogList.push({
              label: i.name,
              value: i.code
            });
          });
        }
      });
  },
  list: [
    {
      label: "名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入硬装图例"
      },
      rule: rules.fieldFill("请填写硬装图例")
    },
    {
      label: "分类",
      value: "typeCode",
      component: "BaseSelect",
      get attrs() {
        return {
          placeholder: "请选择硬装图例类型",
          list: ADD_CONFIG.catalogList
        };
      },
      rule: rules.fieldFill("请选择硬装图例类型")
    },
    {
      label: "尺寸",
      value: "sizeLong",
      component: "BaseSize",
      get attrs() {
        return {
          province: ADD_CONFIG.form.province,
          form: ADD_CONFIG.form
        };
      },
      rule: rules.fieldFill("请输入硬装图例尺寸")
    },
    {
      label: "图例容差",
      value: "tolerance",
      component: "Input",
      attrs: {
        placeholder: "请输入图例容差",
        type: "number"
      },
      rule: rules.fieldFill("请输入图例容差", "ints")
    },
    {
      label: "dwg文件",
      value: "dwgUrl",
      component: "BaseFiles",
      get attrs() {
        return {
          file: ADD_CONFIG.form.dwgUrl,
          placeholder: "请输入dwg文件",
          fileType: "dwg"
        }
      },
      change: function(file) {
        this.form.dwgUrl = file;
        this.form.classify = 1;
      },
      rule: rules.fieldFill("请输入dwg文件")
    },
    {
      label: "备注信息",
      value: "description",
      component: "Input",
      // 传入多个html属性
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入备注信息"
      },
      rule: rules.fieldFill("请输入备注信息")
    }
  ],

  //form重置
  reForm: function() {
    ADD_CONFIG.form = {}; // 动态改变子组件的参数
  },
  // 编辑查询后
  editInfo: function() {
    this.form = this.form.legend;
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "LEGEND_DETAIL",
  searchKey: "sn",
  listKey: "legend",
  title: "硬装图例详情",
  form: {},
  formList: [
    {
      label: "SN编码",
      value: "sn"
    },
    {
      label: "名称",
      value: "name"
    },
    {
      label: "分类",
      value: "typeName"
    },
    {
      label: "尺寸",
      value: "location",
      render: (h, item) => {
        return h(
          "div",
          `${item.sizeLong}mm * ${item.sizeWidth}mm * ${item.sizeHeight}mm`
        );
      }
    },
    {
      label: "图例容差",
      value: "tolerance",
      render: (h, item) => {
        return h("div", `${item.tolerance}mm`);
      }
    },
    {
      label: "dwg文件",
      value: "dwgUrl",
      render: (h, item) => {
        return h("a", {
          domProps: {
            innerHTML: "下载"
          },
          attrs: {
            href: item.dwgUrl,
            download: "dwg文件"
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
