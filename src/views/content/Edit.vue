<template>
  <div class="edit">
    <!--    back-->
    <div>
      <a @click="$router.back()"><Icon type="ios-arrow-back" />返回</a>
    </div>

    <!--    content-->
    <div class="edit-card">
      <h1>{{ id? obj.editTitle: obj.title }}</h1>
      <div>
        <Form class="edit-card-form" :label-width="obj.labelWidth || 100">
          <form-item
            v-for="(item, index) in arr"
            :key="index"
            :label="`${item.label}：`"
            :rules="item.rule"
          >
            <!--              得留一个自定义组件的地方、有自定义组件就渲染自定义组件-->
            <!--              attrs:html属性对象-->
            <component
              v-if="item.component"
              :is="item.component"
              v-bind="item.attrs"
              v-model="obj.form[item.value]"
              @change="item.change && item.change.call(obj,$event)"
              @on-change="item.change && item.change.call(obj,$event)"
            ></component>

            <!--            自定义组件-->
            <div v-else>自定义组件</div>
          </form-item>

          <!--          操作-->
          <form-item>
            <Button v-if="!id" type="primary" @click="obj.submit.call(obj)">提交</Button>
            <Button v-else type="primary" @click="obj.edit.call(obj)">更新</Button>
            <Button @click="$router.back()">取消</Button>
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
import editObj from "./edit";
let obj = Object;
export default {
  name: "Edit",
  data() {
    return {
      id: "",
      obj: {},
      form: {},
      arr: []
    };
  },
  // todo 我想的是大多数新增都是input，select，radio等组件，更加当前页面的新增对象的属性来按需加载不同类型的组件，新增一个表单基本组件的js文件
  // todo 里面存放的都是一个一个的基础组件，然后更加当前的对象属性来一个个加载组件，匹配组件
  // todo 问题 组件的注册，组件的引入，怎么注册，什么时候注册，使用局部注册，
  // todo 下下策，把所有组件全局注册好，然后使用compont is属性
  //  还是建议把基础组件写在components中吧，写成js文件有点难受
  created() {
    this.id = this.$route.query.id;
    obj = new editObj(this.$route.query.path, this.$router);
    if(this.id){
      obj.getInfo(this.id);
    }
    console.log("新增、编辑对象", obj);
    this.obj = obj;
    this.arr = obj.formList;
    this.form = obj.from;
  },
  mounted() {},
  destroyed(){
    obj = null;
    this.obj = null;
    this.form = null;
    this.arr = null;
  },
  methods: {
    change(value){

    }
  }
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
    &-form {
      .ivu-form-item {
        margin-bottom: 20px;
        width: 50%;
      }
      /*选择框、时间样式*/
      .ivu-select,
      .ivu-date-picker {
        width: 100% !important;
        margin: 0 !important;
      }
    }
  }
}
</style>
