export default {
  template: `<Select :placeholder="this.placeholder" :style="selectStyle" v-model='this.value'>
<Option v-for="(item, index) in list" :key="index">{{item}}}</Option>
</Select>`,
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: "",
      required: true
    },
    placeholder: {
      type: String
    }
  },
  data() {
    return {
      selectStyle: {
        margin: "0 5px",
        width: "130px"
      },
      list: []
    };
  },
  created() {
  },
  methods: {
    //  获取下拉选项列表
    getList() {}
  }
};
