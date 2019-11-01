// 户型任务，状态筛选条件加成一个属性来判断
import rules from "../../libs/asyncRules";
import store from "../../store";
import API from "../../http/api";
import router from "../../router/index";

export const LIST_CONFIG = {
  //若过于复杂，抽离成单独组件
  // todo 头部组件
  get head() {
    return {
      template: `<div>
    <RadioGroup v-model="type" type="button" @on-change="search">
    <Radio style="margin: 0 5px" v-for="(item, index) in list" :key="index" :label="index">{{item}}</Radio>
    </RadioGroup>
      </div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          type: 0,
          list: ["全部", "户型制作中", "硬装制作中", "已完成"]
        };
      },
      methods: {
        search() {
          this.obj.searchInfo.status = this.type;
          this.obj.currentPage = 1;
          this.obj.getList();
        }
      }
    };
  },

  //todo 筛选组件
  get select() {
    return {
      template: `<div>
<BaseApartment @change="searchByName"></BaseApartment>
<base-input placeholder="请输入任务名称或关键字" v-model.trim="info.val4" @change="search"></base-input>
</div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          info: {}
        };
      },
      methods: {
        searchByName(id) {
          this.obj.searchInfo.buildingId = id || -1;
          this.search();
        },
        search() {
          this.obj.currentPage = 1;
          this.obj.searchInfo.keyword = this.info.val4;
          this.obj.getList();
        }
      }
    };
  },
  hasButton: true,
  searchKey: "value",
  searchInfo: {
    status: 0,
    buildingId: -1
  },
  addRoute: "factorEdit",
  detailRoute: "factorDetail",
  listKey: "house_task",
  detailKey: "id",
  listURL: "HOUSE_TASK_SEARCH",
  deleteURL: "HOUSE_TASK_DELETE",
  deleteKey: "houseTaskId",
  deleteValue: "id",
  title: "户型任务",
  tableColumn: [
    {
      title: "任务名称",
      key: "name"
    },
    {
      title: "户型",
      key: "houseName",
      render: (h, params) => {
        return h("a", {
          domProps: {
            innerHTML: params.row.houseName
          },
          on: {
            click: () => {
              router.push({
                name: "apartmentManageDetail",
                query: {
                  path: "apartment_manage",
                  id: params.row.houseId
                }
              });
              console.log(router);
            }
          }
        });
      }
    },
    {
      title: "创建者",
      key: "creatorName"
    },
    {
      title: "户型制作者",
      key: "cadExecutorName"
    },
    {
      title: "硬装制作者",
      key: "hardExecutorName"
    },
    {
      title: "状态",
      key: "status",
      render: (h, params) => {
        return h("div", store.state.app.houseTaskStatus[params.row.status]);
      }
    },
    {
      title: "操作",
      align: "center",
      slot: "action",
      width: "180"
    }
  ]
};

// todo add、edit配置
export const ADD_CONFIG = {
  addTitle: "新增户型任务",
  editTitle: "编辑户型任务",
  addURL: "HOUSE_TASK_ADD",
  addKey: "houseTaskInfo",
  editURL: "HOUSE_TASK_EDIT",
  detailURL: "HOUSE_TASK_DETAIL",
  detailKey: "houseTaskId",
  editKey: "houseTaskInfo",
  labelWidth: 100,
  buildingList: [],
  CADList: [],
  hardList: [],
  styleList: [],
  typeList: [],
  form: {}, // 可以提供默认值
  get formList() {
    this.getBuildingList();
    this.getCADUser();
    this.getHardUser();
    this.getStyle();
    return this.list;
  },
  // 硬装风格
  getStyle() {
    axios
      .post(API.ALL_LEVEL, {
        classify: 1
      })
      .then(res => {
        if (res.success) {
          ADD_CONFIG.styleList = [];
          res.data.list.forEach(i => {
            ADD_CONFIG.styleList.push({
              label: i.name,
              value: i.code
            });
          });
        }
      });
  },
  // 获取CAD执行者
  getCADUser() {
    axios
      .post(API.USER_LIST, {
        roleId: 5,
        value: "",
        pageNum: 1,
        pageSize: 9999
      })
      .then(res => {
        if (res.success) {
          ADD_CONFIG.CADList = [];
          res.data.user_list.forEach(i => {
            ADD_CONFIG.CADList.push({
              label: i.nickName,
              value: i.account
            });
          });
        }
      });
  },
  //获取硬装执行者
  getHardUser() {
    axios
      .post(API.USER_LIST, {
        roleId: 6,
        value: "",
        pageNum: 1,
        pageSize: 9999
      })
      .then(res => {
        if (res.success) {
          ADD_CONFIG.hardList = [];
          res.data.user_list.forEach(i => {
            ADD_CONFIG.hardList.push({
              label: i.nickName,
              value: i.account
            });
          });
        }
      });
  },
  //查询所有楼盘
  getBuildingList() {
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
            value: item.name
          });
        });
      }
    });
  },
  // 查询楼盘下的户型
  getTypeList(id) {
    // this.typeList = [];
    let value = {
      buildingId: id
    };
    axios.post(API.HOUSE_HOUSE, value).then(res => {
      if (res.success) {
        res.data.house.forEach(item => {
          ADD_CONFIG.typeList.push({
            label: item.houseName,
            value: item.houseId
          });
        });
      }
    });
  },
  list: [
    {
      label: "匹配楼盘",
      component: "BaseApartment",
      get attrs() {
        return {
          disabled: ADD_CONFIG.form.isEdit
        };
      },
      change: function(id) {
        ADD_CONFIG.getTypeList(id);
      }
    },
    {
      label: "匹配户型",
      value: "houseId",
      component: "BaseSelect",
      get attrs() {
        return {
          value: ADD_CONFIG.form.houseName,
          disabled: ADD_CONFIG.form.isEdit,
          list: ADD_CONFIG.typeList,
          placeholder: "请选择户型"
        };
      },
      change: function(id) {
        axios
          .post(API.HOUSE_HARD_TASK, {
            houseId: id
          })
          .then(res => {
            if (res.success) {
              let val = res.data.hard_task;
              if (val.length) {
                // ADD_CONFIG.form = Object.assign({}, ADD_CONFIG.form, {
                //   isDisabled: true,
                //   housePic: val[0].housePic,
                //   cadExecutorAccount: val[0].cadExecutorAccount,
                //   hardExecutorAccount: val[0].hardExecutorAccount
                // });
                // console.log(ADD_CONFIG.form);
              }
            }
          });
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
      get attrs() {
        return {
          value: [ADD_CONFIG.form.styleCodeList],
          list: ADD_CONFIG.styleList,
          multiple: true,
          placeholder: "请选择硬装风格"
        };
      },
      rule: rules.fieldFill("请选择硬装风格")
    },
    {
      label: "CAD执行者",
      value: "cadExecutorAccount",
      component: "BaseSelect",
      get attrs() {
        return {
          disabled: ADD_CONFIG.form.isEdit,
          placeholder: "请选择CAD执行者",
          list: ADD_CONFIG.CADList
        };
      },
      rule: rules.fieldFill("请选择CAD执行者")
    },
    {
      label: "硬装执行者",
      value: "hardExecutorAccount",
      component: "BaseSelect",
      get attrs() {
        return {
          disabled: ADD_CONFIG.form.isEdit,
          list: ADD_CONFIG.hardList,
          placeholder: "请选择硬装执行者"
        };
      },
      rule: rules.fieldFill("请选择硬装执行者")
    },
    {
      label: "户型图",
      value: "housePic",
      component: "BaseUpload",
      get attrs() {
        return {
          list: [ADD_CONFIG.form.housePic]
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
    this.form = this.form.houseTask;
    this.form.isEdit = true;
    ADD_CONFIG.typeList = [
      {
        label: this.form.houseName,
        value: this.form.houseId
      }
    ];
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "HOUSE_TASK_DETAIL",
  searchKey: "houseTaskId",
  listKey: "houseTask",
  title: "户型任务详情",
  form: {},
  formList: [
    {
      label: "匹配户型",
      value: "houseName"
    },
    {
      label: "任务名称",
      value: "name"
    },
    {
      label: "硬装风格",
      value: "styleNameList",
      render: (h, item) => {
        if (!item.styleNameList) return;
        function getList(h, item) {
          let arr = [];
          item.styleNameList.forEach(i => {
            arr.push(h("div", `${i}、`));
          });
          return arr;
        }
        return h("div", getList(h, item));
      }
    },
    {
      label: "CAD执行者",
      value: "cadExecutorName"
    },
    {
      label: "硬装执行者",
      value: "hardExecutorName"
    },
    {
      label: "户型图",
      value: "pakPic",
      render: (h, item) => {
        return h("img", {
          attrs: {
            height: 80,
            src: item.housePic
          }
        });
      }
    },
    {
      label: "任务描述",
      value: "description"
    }
  ]
};
