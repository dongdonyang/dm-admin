// 户型资源-楼盘管理-配置list页面
import rules from "../../libs/asyncRules"; // 表单验证表
import store from "../../store";

// todo list配置
export const LIST_CONFIG = {
  get select() {
    let that = this;
    return {
      template: `<div>
<base-select placeholder="楼盘类型" :list="typeList" @change="change" v-model="currentObj.searchInfo.btype"></base-select>
<!--<base-select placeholder="选择省份" v-model="currentObj.searchInfo.province"></base-select>-->
<!--<base-select placeholder="选择城市" v-model="currentObj.searchInfo.city"></base-select>-->
<base-input placeholder="楼盘名称或关键字" @change="change" v-model="currentObj.searchInfo.name"></base-input>
</div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          currentObj: that,
          typeList: [
            {
              value: "1",
              label: "精装房"
            },
            {
              value: "2",
              label: "毛坯房"
            },
            {
              value: "3",
              label: "旧改房"
            }
          ]
        };
      },
      methods: {
        change() {
          this.obj.getList();
        }
      }
    };
  },
  searchKey: "value",
  searchInfo: {
    btype: 0
  },
  type: "",
  city: "",
  title: "楼盘管理",
  addRoute: "addFloor",
  detailRoute: "lookFloor",
  listURL: "BUILDING_SEARCH",
  deleteURL: "",
  addURL: "",
  editURL: "",
  tableColumn: [
    {
      title: "楼盘名称",
      key: "name"
    },
    {
      title: "开发商",
      key: "developer"
    },
    {
      title: "创建人",
      key: "creator"
    },
    {
      title: "开盘时间",
      key: "startDate"
    },
    {
      title: "楼盘类型",
      key: "btype",
      render: (h, params) => {
        return h("span", store.state.app.getApartmentType[params.row.btype]);
      }
    },
    {
      title: "户型数量",
      key: "houseNum"
    },
    {
      title: "省份",
      key: "province"
    },
    {
      title: "城市",
      key: "city"
    },
    {
      title: "楼盘位置",
      key: "location"
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

// 配置新增页面?抛出一个class如何？新增页面之间是否存在相同属性？抛出对象还是class？
// 验证规则表放在哪里？不可能每个配置单独写一份规则表。单独写一份规则表js，然后在edit.vue中引入。这边配置相应的配置规则名和参数就ok
// todo add、edit配置
export const ADD_CONFIG = {
  //
  addTitle: "新增楼盘",
  editTitle: "编辑楼盘",
  addURL: "BUILDING_ADD",
  editURL: "BUILDING_EDIT",
  // labelWidth: 120,
  form: {}, // 可以提供默认值
  formList: [
    {
      label: "楼盘名称",
      component: "Input",
      value: "name",
      attrs: {
        placeholder: "请输入楼盘名称"
      },
      rule: rules.myinput,
      class: "",
      //  组件的配置参数、配置验证规则
      icon: "",
      //  是否有自定义组件、局部注册的问题
      myComponent: "",
      get myCom() {
        return {
          template: `<a>自定义子组件</a>`
        };
      }
    },
    {
      label: "楼盘类型",
      value: "btype",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择楼盘类型",
        list: store.state.app.apartmentType
      }
    },
    {
      label: "地区",
      value: "province",
      component: "BaseCity",
      get attrs() {
        return {
          province: ADD_CONFIG.form.province,
          form: ADD_CONFIG.form
        };
      },
      change: function(value) {
        this.form.province = value.province;
        this.form.city = value.city;
      },
      get myComponent() {
        return {
          template: `<a>a</a>`
        };
      }
    },
    {
      label: "楼盘位置",
      value: "location",
      component: "Input",

      at1trs: {
        placeholder: "请输入楼盘具体位置信息"
      }
    },
    {
      label: "开发商",
      value: "developer",
      component: "Input",
      attrs: {
        placeholder: "请输入开发商名称"
      }
    },
    {
      label: "开盘时间",
      value: "startDate",
      component: "DatePicker",
      attrs: {
        placeholder: "请选择开盘时间",
        format: "yyyy-MM-dd"
      },
      change: function(value) {
        this.form.startDate = value;
      }
    },
    {
      label: "楼盘描述",
      value: "description",
      component: "Input",
      // 传入多个html属性
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入楼盘描述"
      }
    },
    {
      label: "上传图片",
      value: "previewPic",
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
