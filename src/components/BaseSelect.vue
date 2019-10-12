<template>
  <Select
    :placeholder="this.placeholder"
    :style="selectStyle"
    v-model="this.value"
  >
    <Option v-for="(item, index) in list" :key="index">{{ item }}}</Option>
  </Select>
</template>

<script>
// Todo VUE代码风格、拒绝硬编码！
/**
 *  作者：yangdong       时间：2019/10/1121:52
 */
export default {
  name: "BaseSelect",
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
  created() {},
  mounted() {},
  methods: {}
};
</script>
