// 厂商管理，增删改查，权限控制，列表字段，筛选字段条件，样式，还是单独做成组件

import rules from "../../libs/asyncRules";
import API from "../../http/api";

// todo list配置
export const LIST_CONFIG = {
  // 筛选条件
  get select() {
    let that = this;
    return {
      template: `<div>
<!--<base-select></base-select>-->
<!--<base-select></base-select>-->
<!--<Input />-->
</div>`
    };
  },
  title: "厂商管理",
  listURL: "VENDOR_LIST",
  listKey: "vendor_list",
  detailKey: "id",
  addRoute: "factorEdit",
  detailRoute: "factorDetail",
  deleteURL: "VENDOR_DELETE",
  deleteKey: "vendorId",
  deleteValue: "id",
  tableColumn: [
    {
      title: "名称",
      key: "name"
    },
    {
      title: "厂商管理员",
      key: "vendorManager"
    },
    {
      title: "所在城市",
      key: "address",
      render: (h, params) => {
        return h("div", (params.row.city && params.row.city.name) || "");
      }
    },
    {
      title: "商品数",
      key: "goodsCount"
    },
    {
      title: "使用户型数",
      key: "houseCount"
    },
    {
      title: "发布方案数",
      key: "releasedPlanCount"
    },
    {
      title: "合作类型",
      key: "type"
    },
    {
      title: "创建时间",
      key: "createTimeFormat"
    },
    {
      title: "操作",
      slot: "action",
      className: "base-action"
    }
  ]
};

// todo add、edit配置
export const ADD_CONFIG = {
  addTitle: "新增厂商",
  editTitle: "编辑厂商",
  addURL: "VENDOR_ADD",
  addKey: "vendorInfo",
  editURL: "VENDOR_EDIT",
  detailURL: "VENDOR_DETAIL",
  detailKey: "vendorId",
  editKey: "vendorInfo",
  hasBeforeSubmit: true,
  beforeSubmit: function() {
    this.form.cityCode = this.form.cityCoded;
  },
  form: {},
  formList: [
    {
      label: "名称",
      value: "name",
      component: "Input",
      attrs: {
        placeholder: "请输入厂商名称"
      },
      rule: rules.fieldFill("请输入厂商名称")
    },
    {
      label: "所在城市",
      value: "cityCode",
      component: "BaseCity",
      get attrs() {
        return {
          form: ADD_CONFIG.form
        };
      },
      rule: rules.fieldFill("请选择所在城市")
    },
    {
      label: "合作类型",
      value: "type",
      component: "BaseSelect",

      rule: rules.fieldFill("请选择合作类型"),
      attrs: {
        placeholder: "请选择合作类型",
        list: [
          {
            value: "金牌",
            label: "金牌"
          },
          {
            value: "银牌",
            label: "银牌"
          },
          {
            value: "铜牌",
            label: "铜牌"
          }
        ]
      }
    }
  ],
  // 清除缓存
  reForm() {
    ADD_CONFIG.form = {};
  },
  // 查询详情后
  editInfo: function() {
    this.form = this.form.vendor;
    this.form.city = this.form.city.name;
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail配置
export const DETAIL_CONFIG = {
  searchURL: "VENDOR_DETAIL",
  searchKey: "vendorId",
  listKey: "vendor",
  title: "厂商详情",
  form: {},
  formList: [
    {
      label: "名称",
      value: "name"
    },
    {
      label: "所在城市",
      render: (h, item) => {
        return h("div", item.city && item.city.name);
      }
    },
    {
      label: "合作类型",
      value: "type"
    }
  ]
};
