<template>
  <Input
    :placeholder="this.placeholder"
    :style="inputStyle"
    suffix="ios-search"
    v-model="this.value"
  ></Input>
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
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
