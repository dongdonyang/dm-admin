<template>
  <div style="display: flex">
    <BaseSelect
      placeholder="省份"
      :disabled="disabled"
      v-model="info.val1"
      :list="provinceList"
      @change="getCity"
    ></BaseSelect>
    <BaseSelect
      :disabled="disabled"
      placeholder="城市"
      v-model="info.val2"
      :list="cityList"
      @change="getApartment"
    ></BaseSelect>
    <BaseSelect
      :disabled="disabled"
      placeholder="楼盘"
      v-model="info.val3"
      :list="apartmentList"
      @change="search"
    ></BaseSelect>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/22/18:16
 */
export default {
  name: "BaseApartment",
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      info: {},
      provinceList: [],
      cityList: [],
      apartmentList: []
    };
  },
  created() {
    this.getProvince();
  },
  mounted() {},
  methods: {
    // 查询
    search(name) {
      this.$emit("change", name);
    },
    // 获取省份
    getProvince() {
      axios.post(this.$API.GET_PROVINCE, {}).then(res => {
        if (res.success) {
          this.provinceList = [];
          this.info.val2 = "";
          this.info.val3 = "";
          res.data.province_list.forEach(i => {
            this.provinceList.push({
              label: i.name,
              value: i.code
            });
          });
        }
      });
    },
    //  获取城市
    getCity(code) {
      axios
        .post(this.$API.GET_CITY, {
          provinceCode: code
        })
        .then(res => {
          if (res.success) {
            this.cityList = [];
            this.info.val3 = "";
            res.data.city_list.forEach(i => {
              this.cityList.push({
                label: i.name,
                value: i.name
              });
            });
          }
        });
    },
    //  获取楼盘
    getApartment(code) {
      let name = this.cityList.find(i => {
        return i.value === code;
      });
      if (!name) return;
      axios
        .post(this.$API.ALL_BUILDING_IN_CITY, {
          cityName: name.label,
          groupIndex: 0,
          isPageable: 0,
          pageSize: 999999,
          pageNum: 1
        })
        .then(res => {
          if (res.success) {
            this.apartmentList = [];
            res.data.building.forEach(i => {
              this.apartmentList.push({
                label: i.name,
                value: i.id
              });
            });
          }
        });
    }
  }
};
</script>

<style scoped></style>
