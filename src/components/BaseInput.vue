<template>
  <Input
    :placeholder="placeholder"
    :style="inputStyle"
    suffix="ios-search"
    v-model="inputValue"
    @on-change="change"
  />
</template>

<script>
// Todo VUE代码风格、拒绝硬编码！
/**
 *  作者：yangdong       时间：2019/10/1121:53
 */
export default {
  name: "BaseInput",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ""
    },
    placeholder: {
      type: String,
      default: "请输入参数"
    }
  },
  data() {
    return {
      inputValue: "",
      inputStyle: {
        margin: "0 5px",
        width: "240px"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    change($event) {
      this.$emit("input", this.inputValue);
      this.$emit("change", this.inputValue);
    }
  }
};
</script>
