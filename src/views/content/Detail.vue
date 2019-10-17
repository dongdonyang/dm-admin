<template>
  <div class="detail">
    <!--    back-->
    <div>
      <a @click="$router.back()"><Icon type="ios-arrow-back" />返回</a>
    </div>

    <!--    content-->
    <div class="detail-card">
      <h1>厂商详情</h1>

      <Form :label-width="100">
        <form-item v-for="(item, index) in formList" :key="index" :label="`${item.label}：`">{{form[item.value]}}</form-item>
      </Form>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/11:15
 */
import detailObj from "./detail"
let obj = Object;
export default {
  name: "Detail",
  data() {
    return {
      form: {},
      formList: []
    };
  },
  created() {
    obj = new detailObj(this.$route.query.path);
    console.log("详情对象", obj);
    obj.getInfo.call(this, this.$route.query.id);
    this.from = obj.form;
    this.formList = obj.formList;
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  /*back*/
  & > :first-child {
    height: 44px;
    font-size: 14px;
    line-height: 14px;
    color: #333;
  }

  /*content*/
  &-card {
    flex: 2 0 auto;
    background-color: #fff;
    border-radius: 6px;
    padding: 30px;
  /*  title*/
    &>h1{
      height: 50px;
      font-size: 20px;
      line-height: 20px;
    }
  }
}
</style>
