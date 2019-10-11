// 户型任务，状态筛选条件加成一个属性来判断
export default {
  //若过于复杂，抽离成单独组件
  // todo 头部组件
  get head() {
    return {
      template: `<div>
        <Button type="text" v-for='item in list' :key='item'>{{item}}</Button>
      </div>`,
      data() {
        return {
          list: ["全部", "户型制作中", "硬装制作中", "已完成"]
        };
      }
    };
  },

  //todo 筛选组件
  get select(){
    return {
      template: "<base-select v-model='this.val'></base-select>",
      components: {
        BaseSelect: resolve => resolve(require("./base_select"))
      },
      data(){
        return{
          val: ""
        }
      }
    }
  },

  // todo 数据参数
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
