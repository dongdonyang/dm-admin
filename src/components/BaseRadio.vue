<template>
  <RadioGroup @on-change="change" v-model="value" type="button">
    <Radio v-for="(item, index) in list" :key="index" :label="item.value">{{
      item.label
    }}</Radio>
  </RadioGroup>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/30/14:57
 */
export default {
  name: "BaseRadio",
  props: {
    list: {
      type: Array
    },
    val: {
      type: String
    }
  },
  watch: {
    val: function(newVal) {
      this.value = newVal;
    }
  },
  data() {
    return {
      value: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    change(val) {
      this.$emit("change", val);
    }
  }
};
</script>

<style scoped></style>
