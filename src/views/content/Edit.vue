<template>
  <div class="edit">
    <!--    back-->
    <div>
      <a @click="$router.back()"><Icon type="ios-arrow-back" />返回</a>
    </div>

    <!--    content-->
    <div class="edit-card">
      <h1>新增商品</h1>
      <div>
        <Form>
          <form-item
            v-for="(item, index) in this.obj"
            :key="index"
            :label="item.label"
          >
            <!--              得留一个自定义组件的地方、有自定义组件就渲染自定义组件-->
            <component v-if="item.slot" :is="item.slot"></component>
            <div v-else>自定义组件</div>
          </form-item>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/9:23
 */
export default {
  name: "Edit",
  data() {
    return {
      //  obj数组对象从配置文件中读取就行了，
      obj: [
        //  label,value,参数，校验信息，各自的class吧
        {
          label: "1",
          slot: "base-input"
        },
        {
          label: "3"
        }
      ]
    };
  },
  // todo 我想的是大多数新增都是input，select，radio等组件，更加当前页面的新增对象的属性来按需加载不同类型的组件，新增一个表单基本组件的js文件
  // todo 里面存放的都是一个一个的基础组件，然后更加当前的对象属性来一个个加载组件，匹配组件
  // todo 问题 组件的注册，组件的引入，怎么注册，什么时候注册，使用局部注册，
  // todo 下下策，把所有组件全局注册好，然后使用compont is属性
  //  还是建议把基础组件写在components中吧，写成js文件有点难受
  created() {
    this.obj.push({
      label: "2",
      slot: "base-select"
    });
  },
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.edit {
  display: flex;
  flex-direction: column;
  height: 100%;

  /*  back*/
  & > :first-child {
    height: 50px;
  }

  /*  card*/
  &-card {
    flex: 2 0 auto;
    background-color: #fff;
    border-radius: 6px;
    padding: 30px;
    /*  title*/
    & > h1 {
      font-size: 20px;
      height: 50px;
    }
  }
}
</style>
