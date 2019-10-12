// 户型资源-楼盘管理-配置list页面
export default {
  get select() {
    let that = this;
    return {
      template: `<div>
<base-select placeholder="楼盘类型" v-model="obj.a"></base-select>
<base-select placeholder="选择省份" v-model="obj.a"></base-select>
<base-select placeholder="选择城市" v-model="obj.a"></base-select>
<base-input placeholder="楼盘名称或关键字" v-model="obj.b"></base-input>
</div>`,
      destroyed() {
        console.log("floor组件销毁");
      },
      created() {
        console.log("floor组件创建");
      },
      data() {
        return {
          obj: that
        };
      }
    };
  },
  title: "楼盘管理",
  addRoute: "addFloor",
  detailRoute: "lookFloor",
  listURL: "",
  deleteURL: "",
  addURL: "",
  editURL: "",
  tableColumn: [
    {
      title: "楼盘名称",
      key: ""
    },
    {
      title: "开发商",
      key: ""
    },
    {
      title: "创建人",
      key: ""
    },
    {
      title: "开盘时间",
      key: ""
    },
    {
      title: "楼盘类型",
      key: ""
    },
    {
      title: "户型数量",
      key: "",
      sortable: true
    },
    {
      title: "省份",
      key: ""
    },
    {
      title: "城市",
      key: ""
    },
    {
      title: "楼盘位置",
      key: ""
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
// todo 验证规则表放在哪里？不可能每个配置单独写一份规则表。单独写一份规则表js，然后在edit.vue中引入。这边配置相应的配置规则名和参数就ok
export const adds = {
  //
  addURL: "",
  editURL: "",
  formList: [
    {
      label: "",
      slot: "",
      value: "",
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
    }
  ]
};

//配置详情页面
export const detail = {
  form: {},
  formList: [
    {
      label: "",
      value: ""
      //  自定义展示配置
    }
  ]
};
