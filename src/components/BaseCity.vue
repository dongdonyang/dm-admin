<template>
  <div class="base-city">
    <!--        省-->
    <Select
      placeholder="请选择省份"
      v-model="form.province"
      style="width: 200px;margin-right: 5px"
      @on-change="getlist2"
    >
      <Option v-for="(item, index) in list1" :key="index" :value="item.name">{{
        item.name
      }}</Option>
    </Select>

    <!--        city-->
    <Select
      placeholder="请选择市区"
      v-model="form.city"
      style="width: 200px"
      @on-change="setCity"
    >
      <Option v-for="(item, index) in list2" :key="index" :value="item.name">{{
        item.name
      }}</Option>
    </Select>

    <!--        省-->
    <!--    <Select-->
    <!--      placeholder="请选择省份"-->
    <!--      v-model="position.province"-->
    <!--      @on-change="provinceChange"-->
    <!--    >-->
    <!--      <Option-->
    <!--        v-for="(item, index) in provinceList"-->
    <!--        :key="index"-->
    <!--        :value="item.code"-->
    <!--        >{{ item.name }}</Option-->
    <!--      >-->
    <!--    </Select>-->

    <!--    &lt;!&ndash;        city&ndash;&gt;-->
    <!--    <Select-->
    <!--      placeholder="请选择市区"-->
    <!--      v-model="position.city"-->
    <!--      @on-change="cityChange"-->
    <!--    >-->
    <!--      <Option-->
    <!--        v-for="(item, index) in cityList"-->
    <!--        :key="index"-->
    <!--        :value="item.code"-->
    <!--        >{{ item.name }}</Option-->
    <!--      >-->
    <!--    </Select>-->
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
      position: {},
      provinceList: [],
      cityList: [],
      list1: [],
      list2: []
    };
  },
  watch: {
    "form.cityCode": function(val) {
      if (val) {
        let vals = this.list1.find(i => {
          return i.code.slice(0, 2) === val.slice(0, 2);
        });
        this.form.province = vals.name;
        if(!this.form.cityCoded) {
          this.getlist2(vals.name);
        }
      }
    }
  },
  created() {
    this.getlist1();
    this.getProvince();
  },
  mounted() {},
  methods: {
    // 获取省份
    getProvince() {
      axios.post(this.$API.GET_PROVINCE, {}).then(res => {
        if (res.success) {
          this.provinceList = res.data.province_list;
        }
      });
    },
    provinceChange(code) {
      this.position.provinceObj = this.provinceList.find(i => {
        return i.code === code;
      });
      this.$emit("change", this.position);
      this.getCity();
    },
    // 获取市区
    getCity() {
      axios
        .post(this.$API.GET_CITY, {
          provinceCode: this.position.province
        })
        .then(res => {
          if (res.success) {
            this.cityList = res.data.city_list;
            this.position.city = this.cityList[0].code;
            this.position.cityObj = this.cityList[0];
            this.$emit("change", this.position);
          }
        });
    },
    cityChange(code) {
      this.position.cityObj = this.cityList.find(i => {
        return i.code === code;
      });
      this.$emit("change", this.position);
    },
    getlist1() {
      axios.post(this.$API.GET_PROVINCE, {}).then(res => {
        if (res.success) {
          this.list1 = res.data.province_list;
          if (this.form.id) {
            if (!this.form.province) {
              let val = this.list1.find(i => {
                return i.code.slice(0, 2) === this.form.cityCode.slice(0, 2);
              });
              this.form.province = val.name;
            }
            this.getlist2(this.form.province);
          }
        }
      });
    },
    getlist2(value) {
      let id = this.list1.find(res => {
        return res.name === value;
      });
      this.form.provinceCode = id && id.code;
      axios
        .post(this.$API.GET_CITY, {
          provinceCode: id && id.code
        })
        .then(res => {
          if (res.success) {
            this.list2 = res.data.city_list;
            if (!this.form.id) {
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
      this.form.cityCode = id.code;
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
