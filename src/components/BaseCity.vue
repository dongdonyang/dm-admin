<template>
  <div class="base-city">
    <!--        省-->
    <Select v-model="form.province" style="width: 50%" @on-change="getlist2">
      <Option v-for="(item, index) in list1" :key="index" :value="item.name">{{
        item.name
      }}</Option>
    </Select>

    <!--        city-->
    <Select
      v-model="form.city"
      style="width: 50%"
    >
      <Option v-for="(item, index) in list2" :key="index" :value="item.name">{{
        item.name
      }}</Option>
    </Select>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/17/20:15
 */
export default {
  name: "BaseCity",
  props: {
    province: "",
    form: {}
  },
  data() {
    return {
      value: {},
      model1: "",
      model2: "",
      list1: [],
      list2: []
    };
  },
  created() {
    console.log("city", this.form);
    this.getlist1();
  },
  mounted() {},
  methods: {
    getlist1() {
      axios.post(this.$API.GET_PROVINCE, {}).then(res => {
        if (res.success) {
          this.list1 = res.data.province_list;
        }
      });
    },
    getlist2(value) {
      let id = this.list1.find(res => {
        return res.name === value;
      });
      axios
        .post(this.$API.GET_CITY, {
          provinceCode: id.code
        })
        .then(res => {
          if (res.success) {
            this.list2 = res.data.city_list;
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.base-city {
  display: flex;
  justify-content: space-between;
}
</style>
