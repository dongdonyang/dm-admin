<template>
  <div class="base-city">
    <!--        省-->
    <Select v-model="form.province" style="width: 48%" @on-change="getlist2">
      <Option v-for="(item, index) in list1" :key="index" :value="item.name">{{
        item.name
      }}</Option>
    </Select>

    <!--        city-->
    <Select v-model="form.city" style="width: 48%" @on-change="setCity">
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
    form: {}
  },
  data() {
    return {
      list1: [],
      list2: []
    };
  },
  created() {
    this.getlist1();
  },
  mounted() {},
  methods: {
    getlist1() {
      axios.post(this.$API.GET_PROVINCE, {}).then(res => {
        if (res.success) {
          this.list1 = res.data.province_list;
          this.form.id && this.getlist2(this.form.province)
        }
      });
    },
    getlist2(value) {
      let id = this.list1.find(res => {
        return res.name === value;
      });
      this.form.provinceCode = id.code;
      axios
        .post(this.$API.GET_CITY, {
          provinceCode: id.code
        })
        .then(res => {
          if (res.success) {
            this.list2 = res.data.city_list;
            if(!this.form.id){
              this.form.city = this.list2[0].name;
              this.form.cityCoded = this.list2[0].code;
            }
          }
        });
    },
    setCity(value) {
      let id = this.list2.find(res => {
        return res.name === value;
      });
      this.form.cityCoded = id.code;
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
