<template>
  <Input
    :placeholder="placeholder"
    :style="inputStyle"
    suffix="ios-search"
    v-model="value"
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
      value1: "",
      inputStyle: {
        margin: "0 5px",
        width: "240px"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    aa($event) {
      this.$emit("input", $event);
    }
  }
};
</script>
