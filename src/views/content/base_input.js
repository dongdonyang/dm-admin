export default {
  template: `<Input :placeholder="this.placeholder" :style="inputStyle" suffix="ios-search" v-model="this.value"></Input>`,
  model: {
    prop: "value",
    event: "change"
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ""
    },
    placeholder: {
      type: String
    }
  },
  data(){
    return {
      inputStyle: {
        margin: "0 5px",
        width: "240px"
      }
    }
  }
};
