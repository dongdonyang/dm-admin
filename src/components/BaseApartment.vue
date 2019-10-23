<template>
  <div>
    所在楼盘
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/22/18:16
 */
export default {
  name: "BaseApartment",
  data() {
    return {
      list: []
    };
  },
  created() {
    this.getProvince();
  },
  mounted() {},
  methods: {
    //  todo 获取省
    getProvince() {
      axios.post(this.$API.GET_PROVINCE, {}).then(res => {
        if (res.success) {
          this.list = res.data.province_list
        }
      });
    },
    //  todo 获取市
    getCity() {},
    //  todo 获取楼盘
    getApart() {}
  }
};
</script>

<style scoped></style>
