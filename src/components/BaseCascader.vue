<template>
  <div style="display: flex; justify-content: space-between">
    <BaseSelect
      placeholder="总分类"
      v-model="info.val1"
      :list="allList"
      @change="getSecond"
    ></BaseSelect>
    <BaseSelect
      placeholder="次分类"
      v-model="info.val2"
      :list="secondList"
      @change="search"
    ></BaseSelect>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/29/18:34
 */
export default {
  name: "BaseCascader",
  props: {
    typeInfo: {}
  },
  data() {
    return {
      info: {},
      allList: [],
      secondList: []
    };
  },
  watch: {
    "typeInfo.val1": function(newValue) {
      this.info = this.typeInfo;
      this.getSecond(newValue);
    }
  },
  created() {
    this.getAll();
  },
  mounted() {},
  methods: {
    search() {
      this.$emit("change", this.info.val2);
    },
    // 总分类
    getAll() {
      axios
        .post(this.$API.MATERIAL_CLASSIFY, {
          classIndex: 0,
          code: "000000"
        })
        .then(res => {
          this.allList = [];
          if (res.success) {
            res.data.catalogs.forEach(i => {
              this.allList.push({
                label: i.name,
                value: i.code
              });
            });
          }
        });
    },
    //  次分类
    getSecond(code) {
      axios
        .post(this.$API.MATERIAL_CLASSIFY, {
          classIndex: 1,
          code: code
        })
        .then(res => {
          this.secondList = [];
          if (res.success) {
            res.data.catalogs.forEach(i => {
              this.secondList.push({
                label: i.name,
                value: i.code
              });
            });
          }
        });
    }
  }
};
</script>

<style scoped></style>
