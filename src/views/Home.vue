<template>
  <div class="home">
    <!--    头部统计信息-->
    <div class="home-header">
      <div
        v-for="(item, index) in totalList"
        :key="index"
        class="home-header-item"
        :style="{
          background: `linear-gradient(90deg, ${item.leftColor}, ${item.rightColor})`
        }"
      >
        <!--        为什么line-height会被子元素继承-->
        <div>
          <h1>{{ totalCount[item.value] || 0 }}</h1>
          <p>{{ item.name }}</p>
        </div>
        <Icon type="md-barcode" />
      </div>
    </div>

    <!--    统计图-->
    <div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/9:16
 */
export default {
  name: "Home",
  data() {
    return {
      totalCount: {},
      totalList: [
        {
          value: "",
          name: "模型数量",
          icon: "",
          leftColor: "#8192FF",
          rightColor: "#5D75E6"
        },
        {
          value: "",
          name: "户型数量",
          icon: "",
          leftColor: "#4FDEE2",
          rightColor: "#1292FF"
        },
        {
          value: "",
          name: "商品数量",
          icon: "",
          leftColor: "#F9A355",
          rightColor: "#F76C8C"
        },
        {
          value: "",
          name: "材质数量",
          icon: "",
          leftColor: "#7FE085",
          rightColor: "#56B765"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.home {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /*统计方块*/
  &-header {
    display: flex;
    justify-content: space-between;
    &-item {
      height: 130px;
      width: 380px;
      border-radius: 10px;
      box-shadow: 0 5px 20px 0 rgba(82, 211, 187, 0.3);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 40px;
      & > h1 {
        font-size: 36px;
      }
      & > p {
      }
      & > i {
        font-size: 60px;
      }
    }
  }
}
</style>
