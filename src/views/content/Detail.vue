<template>
  <div class="detail">
    <!--    back-->
    <div>
      <a @click="$router.back()"><Icon type="ios-arrow-back" />返回</a>
    </div>

    <!--    content-->
    <div class="detail-card">
      <h1>厂商详情</h1>

      <Form>
        <form-item label="名称：">浸泡</form-item>
      </Form>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/11:15
 */
export default {
  name: "Detail",
  data() {
    return {};
  },
  created() {},
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
