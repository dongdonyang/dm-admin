<template>
  <Select
    :placeholder="this.placeholder"
    :style="selectStyle"
    v-model="this.value"
    @on-change="change"
  >
    <Option v-for="(item, index) in list" :key="index" :value="item.value">{{
      item.label
    }}</Option>
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
    list: {
      type: Array,
      default: function() {
        return [];
      }
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
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    change($event) {
      this.$emit("change", $event);
    }
  }
};
</script>
