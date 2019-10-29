// 户型任务，状态筛选条件加成一个属性来判断
import rules from "../../libs/asyncRules";
import store from "../../store";

export const LIST_CONFIG = {
  //若过于复杂，抽离成单独组件
  // todo 头部组件
  get head() {
    return {
      template: `<div>
    <RadioGroup v-model="type" type="button">
    <Radio v-for="(item, index) in list" :key="index" :label="index">{{item}}</Radio>
    </RadioGroup>
      </div>`,
      data() {
        return {
          type: 0,
          list: ["全部", "户型制作中", "硬装制作中", "已完成"]
        };
      }
    };
  },

  //todo 筛选组件
  get select() {
    return {
      template: `<div>
<base-select placeholder="省份" v-model='info.val1'></base-select>
<base-select placeholder="城市" v-model='info.val2'></base-select>
<base-select placeholder="楼盘" v-model='info.val3'></base-select>
<base-input placeholder="请输入任务名称或关键字" v-model="info.val4"></base-input>
</div>`,
      data() {
        return {
          info: {}
        };
      }
    };
  },
  searchKey: "value",
  searchInfo: {
    status: 0
  },
  addRoute: "factorEdit",
  detailRoute: "factorDetail",
  listKey: "house_task",
  detailKey: "id",
  listURL: "HOUSE_TASK_SEARCH",
  deleteURL: "BUILDING_DELETE",
  deleteKey: "removeBuildingId",
  deleteValue: "id",
  title: "户型任务",
  tableColumn: [
    {
      title: "任务名称",
      key: ""
    },
    {
      title: "户型",
      key: ""
    },
    {
      title: "创建者",
      key: ""
    },
    {
      title: "户型制作者",
      key: ""
    },
    {
      title: "硬装制作者",
      key: ""
    },
    {
      title: "状态",
      key: ""
    },
    {
      title: "操作",
      align: "center",
      slot: "action",
      width: "160"
    }
  ]
};

// todo add、edit配置
export const ADD_CONFIG = {
  addTitle: "新增户型任务",
  editTitle: "新增户型任务",
  addURL: "BUILDING_ADD",
  addKey: "buildingInfo",
  editURL: "BUILDING_EDIT",
  detailURL: "BUILDING_DETAIL",
  detailKey: "buildingId",
  editKey: "newInfo",
  labelWidth: 100,
  form: {}, // 可以提供默认值
  formList: [
    {
      label: "匹配楼盘",
      component: "BaseSelect",
      value: "name",
      attrs: {
        placeholder: "请输入楼盘名称"
      },
      rule: rules.fieldFill("请选择楼盘")
    },
    {
      label: "匹配户型",
      value: "houseId",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择户型"
      },
      rule: rules.fieldFill("请选择户型")
    },
    {
      label: "任务名称",
      value: "name",
      component: "Input",
      attrs: {
        placeholder: "请输入任务名称"
      },
      rule: rules.fieldFill("请输入任务名称")
    },
    {
      label: "硬装风格",
      value: "styleCode",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择硬装风格"
      },
      rule: rules.fieldFill("请选择硬装风格")
    },
    {
      label: "CAD执行者",
      value: "cadExecutorAccount",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择CAD执行者"
      },
      rule: rules.fieldFill("请选择CAD执行者")
    },
    {
      label: "硬装执行者",
      value: "hardExecutorAccount",
      component: "BaseSelect",
      attrs: {
        placeholder: "请选择硬装执行者",
      },
      rule: rules.fieldFill("请选择硬装执行者")
    },
    {
      label: "户型图",
      value: "housePic",
      component: "BaseUpload",
      get attrs() {
        return {
          list: [ADD_CONFIG.form.previewPic]
        };
      },
      change: function(value) {
        this.form.housePic = value[0];
      },
      rule: rules.fieldFill("请上传一张图片")
    },
    {
      label: "任务描述",
      value: "description",
      component: "Input",
      attrs: {
        rows: 5,
        type: "textarea",
        placeholder: "请输入任务描述"
      },
      rule: rules.fieldFill("请输入任务描述")
    }
  ],

  //form重置
  reForm: function() {
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
  searchURL: "BUILDING_DETAIL",
  searchKey: "buildingId",
  title: "户型任务详情",
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
