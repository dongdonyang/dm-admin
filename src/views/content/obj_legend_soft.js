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
<!--<base-select v-model="info.classify" :value="info.classify" @change="getType" :list="type"></base-select>-->
<Select v-model="info.classify" @on-change="getType" style="width:200px;margin-right:5px">
    <Option value="2">成品家具</Option>
    <Option value="3">饰品</Option>
  </Select>
<Cascader :data="data" v-model="info.value1" @on-change="search"></Cascader>
<base-input placeholder="图例名称或关键字" @change="change" v-model="info.name"></base-input>
</div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          data: [],
          info: {},
          type: [
            {
              label: "成品家具",
              value: "2"
            },
            {
              label: "饰品",
              value: "3"
            }
          ],
          currentObj: that,
          typeList: []
        };
      },
      created() {
        this.info.classify = "2";
        this.typeList = [];
        this.getCatalogList();
      },
      methods: {
        search(list) {
          this.obj.searchInfo.typeCode = list[list.length - 1];
          this.change();
        },
        getType() {
          this.info.value1 = [];
          this.getCatalogList();
          this.change();
        },
        // 获取软装分类
        getCatalogList: function() {
          axios
            .post(API.ALL_LEVEL, {
              classify: this.info.classify
            })
            .then(res => {
              if (res.success) {
                function getList(list) {
                  let arr = [];
                  list.forEach(item => {
                    arr.push({
                      value: item.code,
                      label: item.name,
                      children: item.subs ? getList(item.subs) : []
                    });
                  });
                  return arr;
                }
                this.data = getList(res.data.list);
              }
            });
        },
        change() {
          this.obj.currentPage = 1;
          this.obj.searchInfo.name = this.info.name;
          this.obj.searchInfo.classify = this.info.classify;
          this.obj.getList();
        }
      }
    };
  },
  searchKey: "value",
  searchInfo: {
    classify: 2
  },
  title: "软装图例管理",
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
  addTitle: "新增软装图例",
  editTitle: "编辑软装图例",
  addURL: "LEGEND_ADD",
  addKey: "legendInfo",
  editURL: "LEGEND_UPDATE",
  detailURL: "LEGEND_DETAIL",
  detailKey: "sn",
  editKey: "newLegendInfo",
  catalogList: [],
  typeList: [
    {
      label: "成品家具",
      value: "2"
    },
    {
      label: "饰品",
      value: "3"
    }
  ],
  typeCodeObj: {
    placeholder: "请选择软装图例类型",
    get data() {
      return this._data_;
    },
    set data(arr) {
      this._data_ = arr;
    }
  },
  form: {}, // 可以提供默认值
  get formList() {
    return this.list;
  },
  // 获取软装分类
  getCatalogList: function(val) {
    axios
      .post(API.ALL_LEVEL, {
        classify: val
      })
      .then(res => {
        if (res.success) {
          function getList(list) {
            let arr = [];
            list.forEach(item => {
              arr.push({
                value: item.code,
                label: item.name,
                children: item.subs ? getList(item.subs) : []
              });
            });
            return arr;
          }
          ADD_CONFIG.catalogList = getList(res.data.list);
          ADD_CONFIG.typeCodeObj.data = ADD_CONFIG.catalogList;
        }
      });
  },
  list: [
    {
      label: "名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入软装图例"
      },
      rule: rules.fieldFill("请填写软装图例")
    },
    {
      label: "类型",
      value: "classify",
      component: "BaseRadio",
      get attrs() {
        return {
          val: ADD_CONFIG.form.classify,
          list: ADD_CONFIG.typeList
        };
      },
      change: function(val) {
        this.form.classify = val;
        this.form.typeCodeList = [];
        this.getCatalogList(val);
      },
      rule: rules.fieldFill("请选择软装图例类型")
    },
    {
      label: "分类",
      value: "typeCodeList",
      component: "Cascader",
      get attrs() {
        return ADD_CONFIG.typeCodeObj;
      },
      change: function(list) {
        this.form.typeCode = list[list.length - 1];
      },
      rule: rules.fieldFill("请选择软装图例类型")
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
      rule: rules.fieldFill("请输入软装图例尺寸")
    },
    {
      label: "图例容差",
      value: "tolerance",
      component: "Input",
      attrs: {
        placeholder: "请输入图例容差",
        type: "number"
      },
      // change: function(num) {
      //   console.log(ADD_CONFIG.form.tolerance);
      //   ADD_CONFIG.form.tolerance =
      // },
      rule: rules.fieldFill("请输入图例容差", "ints")
    },
    {
      label: "dwg文件",
      value: "dwgUrl",
      component: "BaseFiles",
      get attrs() {
        return {
          placeholder: "请输入dwg文件",
          fileType: "dwg",
          file: ADD_CONFIG.form.dwgUrl
        };
      },
      change: function(file) {
        this.form.dwgUrl = file;
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
  // 数据处理
  setValue(value) {
    let val1 = value.slice(0, 2) + "0000",
      val2 = value.slice(0, 4) + "00",
      val3 = value.slice(4, 6);
    let arr = [];
    arr.push(val1);
    arr.push(val2);
    if (val3 !== "00") {
      arr.push(value);
    }
    return arr;
  },
  // 编辑查询后
  editInfo: function() {
    this.form = this.form.legend;
    this.getCatalogList(this.form.classify);
    this.form.typeCodeList = this.setValue(this.form.typeCode);
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "LEGEND_DETAIL",
  searchKey: "sn",
  listKey: "legend",
  title: "软装图例详情",
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
