// 用户管理
import rules from "../../libs/asyncRules"; // 表单验证表
import store from "../../store";
import API from "../../http/api";
import { Message } from "iview";
import { Base64 } from "js-base64";
import md5 from "js-md5";

// todo list配置
export const LIST_CONFIG = {
  get select() {
    let that = this;
    return {
      template: `<div>
<base-input placeholder="设计师名字或关键字" @change="change" v-model="val"></base-input>
</div>`,
      props: {
        obj: {}
      },
      data() {
        return {
          val: "",
          currentObj: that
        };
      },
      methods: {
        change() {
          this.obj.currentPage = 1;
          this.obj.keyValue = this.val;
          this.obj.getList();
        }
      }
    };
  },
  keyValue: "",
  searchKey: "value",
  searchInfo: {},
  title: "",
  addRoute: "addUser",
  detailRoute: "detailUser",
  listKey: "user_list",
  detailKey: "id",
  listURL: "USER_SEARCH",
  deleteURL: "USER_DELETE",
  deleteKey: "accountName",
  deleteValue: "account",
  tableColumn: [
    {
      title: "账号",
      key: "account"
    },
    {
      title: "昵称",
      key: "nickName"
    },
    {
      title: "电话",
      key: "phone"
    },
    {
      title: "邮箱地址",
      key: "email"
    },
    {
      title: "创建时间",
      key: "createTime"
    },
    {
      width: "160",
      title: "操作",
      slot: "action",
      align: "center"
    }
  ],
  //  todo 复写查询方法
  getList() {
    let value = {
      value: this.keyValue,
      roleId: this.meta.id,
      pageNum: this.currentPage,
      pageSize: this.pageSize
    };
    axios.post(API[this.listURL], value).then(res => {
      if (res.success) {
        this.totalSize = res.data.count;
        this.tableData = res.data[this.listKey];
      }
    });
  },
  //  todo 复写删除方法
  deleteRow(row) {
    axios
      .post(API[this.deleteURL], {
        accountName: Base64.encodeURI(row.account)
      })
      .then(res => {
        if (res.success) {
          Message.success("删除成功");
          this.currentPage = 1;
          this.getList();
        }
      });
  }
};

// todo add、edit配置
export const ADD_CONFIG = {
  //
  addTitle: "新增用户",
  editTitle: "编辑用户",
  addURL: "USER_ADD",
  addKey: "userInfo",
  editURL: "USER_EDIT",
  detailURL: "USER_DETAIL",
  detailKey: "userId",
  editKey: "userInfo",
  canChange: false,
  form: {}, // 可以提供默认值
  formList: [
    {
      label: "昵称",
      component: "Input",
      value: "nickName",
      attrs: {
        placeholder: "请输入账号昵称"
      },
      rule: rules.fieldFill("请输入账号昵称")
    },
    {
      label: "初始密码",
      component: "Input",
      value: "password",
      get attrs() {
        return {
          disabled: ADD_CONFIG.canChange,
          placeholder: "请输入初始密码"
        };
      },
      rule: rules.fieldFill("请填写初始密码")
    },
    {
      label: "手机号码",
      component: "Input",
      value: "phone",
      attrs: {
        placeholder: "请输入手机号码"
      },
      rule: rules.fieldFill("请填写手机号码", "phone")
    },
    {
      label: "邮箱地址",
      component: "Input",
      value: "email",
      attrs: {
        placeholder: "请输入邮箱地址"
      },
      rule: rules.fieldFill("请填写邮箱地址", "CheckEmail")
    }
  ],
  // todo 复写提交方法
  submit() {
    let meta = JSON.parse(this.meta);
    this.form.roleId = meta.id;
    this.form.password = md5(this.form.password);
    let value = {};
    value[this.addKey] = JSON.stringify(this.form);
    axios.post(API[this.addURL], value).then(res => {
      if (res.success) {
        this.router.back();
        Message.success("添加成功"); // todo 可以改成自定义
      }
    });
  },
  // todo 复写编辑方法
  edit() {
    this.form.account = Base64.encodeURI(this.form.account);
    axios
      .post(API[this.editURL], {
        userInfo: JSON.stringify(this.form)
      })
      .then(res => {
        if (res.success) {
          this.router.back();
          Message.success("更新成功"); // todo 改成自定义
        }
      });
  },
  //form重置
  reForm: function() {
    ADD_CONFIG.canChange = false;
    ADD_CONFIG.form = {}; // 动态改变子组件的参数
  },
  // 编辑查询后
  editInfo: function() {
    this.form = this.form.userDetail;
    ADD_CONFIG.canChange = true;
    ADD_CONFIG.form = this.form; // 动态改变子组件的参数
  }
};

// todo detail 配置
export const DETAIL_CONFIG = {
  searchURL: "USER_DETAIL",
  searchKey: "userId",
  title: "用户详情",
  form: {},
  listKey: "userDetail",
  formList: [
    {
      label: "账号",
      value: "account"
    },
    {
      label: "昵称",
      value: "nickName"
    },
    {
      label: "初始密码",
      value: "password"
    },
    {
      label: "手机号码",
      value: "phone"
    },
    {
      label: "邮箱地址",
      value: "email"
    },
    {
      label: "创建时间",
      value: "createTime"
    }
  ]
};

// todo 用户配置表、主要用来区分不同的用户角色、刷新就会丢失写的数据
export const USER_CONFIG = function() {
  this.title = this.meta.title;
  // ADD_CONFIG.addTitle = `新增${this.meta.title}`;
};
