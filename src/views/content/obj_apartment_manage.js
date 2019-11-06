// 户型管理
import rules from "../../libs/asyncRules";
import store from "../../store";
import API from "../../http/api";

// todo list配置
export const LIST_CONFIG = {
  get select() {
    return {
      template: `<div>
<BaseSelect placeholder="省份" v-model="info.val1" :list="provinceList" @change="getCity"></BaseSelect>
<BaseSelect placeholder="城市" v-model="info.val2" :list="cityList" @change="getApartment"></BaseSelect>
<BaseSelect placeholder="楼盘" v-model="info.val3" :list="apartmentList" @change="search"></BaseSelect>
</div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          info: {},
          provinceList: [],
          cityList: [],
          apartmentList: []
        };
      },
      created() {
        this.getProvince();
      },
      methods: {
        // 查询
        search(name) {
          this.obj.searchInfo.name = name;
          this.obj.currentPage = 1;
          this.obj.getList();
        },
        // 获取省份
        getProvince() {
          axios.post(API.GET_PROVINCE, {}).then(res => {
            if (res.success) {
              this.provinceList = [];
              this.info.val2 = "";
              this.info.val3 = "";
              res.data.province_list.forEach(i => {
                this.provinceList.push({
                  label: i.name,
                  value: i.code
                });
              });
            }
          });
        },
        //  获取城市
        getCity(code) {
          axios
            .post(API.GET_CITY, {
              provinceCode: code
            })
            .then(res => {
              if (res.success) {
                this.cityList = [];
                this.info.val3 = "";
                res.data.city_list.forEach(i => {
                  this.cityList.push({
                    label: i.name,
                    value: i.name
                  });
                });
              }
            });
        },
        //  获取楼盘
        getApartment(code) {
          let name = this.cityList.find(i => {
            return i.value === code;
          });
          if (!name) return;
          axios
            .post(API.ALL_BUILDING_IN_CITY, {
              cityName: name.label,
              groupIndex: 0,
              isPageable: 0,
              pageSize: 999999,
              pageNum: 1
            })
            .then(res => {
              if (res.success) {
                this.apartmentList = [];
                res.data.building.forEach(i => {
                  this.apartmentList.push({
                    label: i.name,
                    value: i.name
                  });
                });
              }
            });
        }
      }
    };
  },
  title: "户型管理",
  searchKey: "value",
  searchInfo: {
    name: ""
  },
  listKey: "houses",
  listURL: "HOUSE_SEARCH",
  addRoute: "apartmentManageAdd",
  detailRoute: "apartmentManageDetail",
  detailKey: "id",
  deleteKey: "houseId",
  deleteValue: "id",
  deleteURL: "HOUSE_DELETE",
  tableColumn: [
    {
      title: "户型名称",
      key: "name"
    },
    {
      title: "省份",
      key: "province"
    },
    {
      title: "所在城市",
      key: "city"
    },
    {
      title: "所在楼盘",
      key: "buildingName"
    },
    {
      title: "类型",
      key: "type"
    },
    {
      title: "面积㎡",
      key: "area"
    },
    {
      title: "方案数量",
      key: "comeSource",
      render: h => {
        return h("div", 0);
      }
    },
    {
      title: "来源",
      key: "comeSource",
      render: (h, param) => {
        return h(
          "div",
          store.state.app.apartmentSource[param.row.comeSource] || "普通"
        );
      }
    },
    {
      title: "创建人",
      key: "createUserName"
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
  editKey: "newHouseInfo",
  detailURL: "HOUSE_DETAIL",
  detailKey: "houseId",
  addKey: "houseInfo",
  buildingList: [],
  typeList: {
    get list() {
      return this._data_;
    },
    set list(arr) {
      this._data_ = arr;
    },
    placeholder: "请选择户型"
  },
  form: {}, // 可以提供默认值
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
        placeholder: "请输入户型面积",
        type: "number"
      },
      rule: rules.fieldFill("请输入户型面积", "integer")
    },
    {
      label: "类型",
      value: "type",
      component: "BaseSelect",
      get attrs() {
        return ADD_CONFIG.typeList;
      },
      rule: rules.fieldFill("请选择户型")
    },
    {
      label: "效果图",
      value: "picList",
      component: "BaseUpload",
      rule: rules.fieldFill("请上传效果图"),
      get attrs() {
        return {
          maxSize: 10,
          multiple: true,
          list: ADD_CONFIG.form.picList
        };
      },
      change: function(list) {
        this.form.picList = list;
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
    axios.post(API.HOUSE_TYPE, value).then(res => {
      if (res.success) {
        ADD_CONFIG.typeList.list = [];
        let arr = [];
        res.data.house_type.forEach(item => {
          arr.push({
            label: item,
            value: item
          });
        });
        ADD_CONFIG.typeList.list = arr;
      }
    });
  },
  // 编辑查询后
  editInfo: function() {
    this.form.picList = this.form.pic_list
      ? JSON.parse(this.form.pic_list)
      : [];
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "HOUSE_DETAIL",
  searchKey: "houseId",
  title: "户型详情",
  form: {},
  formList: [
    {
      label: "户型名称",
      value: "name"
    },
    {
      label: "所在楼盘",
      value: "buildingName"
    },
    {
      label: "面积",
      value: "area",
      render: (h, item) => {
        return h("div", `${item.area}㎡`);
      }
    },
    {
      label: "类型",
      value: "type"
    },
    {
      label: "效果图",
      value: "pic_list",
      render: (h, item) => {
        if (!item.pic_list) return;
        let list = JSON.parse(item.pic_list);
        function getList(h) {
          let arr = [];
          list.forEach(i => {
            arr.push(
              h("img", {
                attrs: {
                  width: 100,
                  height: 100,
                  src: i
                },
                style: {
                  margin: "0 6px"
                }
              })
            );
          });
          return arr;
        }
        return h("div", getList(h));
      }
    },
    {
      label: "备注",
      value: "description"
    }
  ]
};
