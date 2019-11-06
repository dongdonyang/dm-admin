<template>
  <div class="detail">
    <!--    back-->
    <div>
      <a @click="$router.back()"><Icon type="ios-arrow-back" />返回</a>
    </div>

    <!--    content-->
    <div class="detail-card">
      <h1>{{ obj.title || "详情" }}</h1>

      <Form :label-width="100">
        <form-item
          v-for="(item, index) in formList"
          :key="index"
          :label="`${item.label}：`"
        >
          <div v-if="!item.render">{{ form[item.value] }}</div>

          <!--          自定义展示-->
          <Render v-else :render="item.render" :item="form"></Render>
        </form-item>
      </Form>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/11:15
 */
import detailObj from "./detail";
import Render from "./render"; // 异步组件
let obj = Object;
export default {
  name: "Detail",
  components: {
    Render
  },
  data() {
    return {
      form: {},
      obj: {},
      formList: []
    };
  },
  created() {
    obj = new detailObj(this.$route.query.path);
    obj.status = this.$route.query.status; // todo 户型任务完成阶段时候需要展示额外数据
    obj.getInfo.call(this, obj, this.$route.query.id);
    this.from = obj.form;
    this.obj = obj;
    // todo 这里的3可以替换成变量、变量定义在各自的配置对象中
    if (obj.status === 3) {
      this.formList = [...obj.formList, ...obj.asyncList];
    } else {
      this.formList = obj.formList;
    }
    console.log("详情对象", obj);
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
    & > h1 {
      height: 50px;
      font-size: 20px;
      line-height: 20px;
    }
    & > form {
      width: 550px;
    }
  }
}
</style>
