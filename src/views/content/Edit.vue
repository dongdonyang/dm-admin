<template>
  <div class="edit">
    <!--    back-->
    <div>
      <a @click="$router.back()"><Icon type="ios-arrow-back" />返回</a>
    </div>

    <!--    content-->
    <div class="edit-card">
      <h1>{{ id ? obj.editTitle : obj.addTitle }}</h1>
      <div>
        <Form
          ref="form"
          :model="obj.form"
          class="edit-card-form"
          :label-width="obj.labelWidth || 90"
        >
          <form-item
            v-for="(item, index) in arr"
            :key="index"
            :label="`${item.label}：`"
            :prop="item.value"
            :rules="item.rule"
          >
            <!--              得留一个自定义组件的地方、有自定义组件就渲染自定义组件-->
            <!--              attrs:html属性对象-->
            <component
              v-if="item.component"
              :is="item.component"
              v-bind="item.attrs"
              v-model="obj.form[item.value]"
              @change="item.change && item.change.call(obj, $event)"
              @on-change="item.change && item.change.call(obj, $event)"
            ></component>

            <!--            自定义组件-->
            <div v-else>自定义组件</div>
          </form-item>

          <!--          操作-->
          <form-item>
            <Button
              class="edit-card-submit"
              v-if="!id"
              type="primary"
              @click="submit"
              >提交</Button
            >
            <Button
              v-else
              class="edit-card-submit"
              type="primary"
              @click="submit"
              >更新</Button
            >
            <Button style="color: #0D35F1" type="text" @click="$router.back()"
              >取消</Button
            >
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
      time: null,
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
    obj.status = this.$route.query.status;
    obj.meta = this.$route.query.meta;
    if (this.id) {
      obj.getInfo(this.id);
      // todo 这里的3可以替换成变量、变量定义在各自的配置对象中
      if (obj.status === 3) {
        this.arr = [...obj.formList, ...obj.asyncList];
      } else {
        this.arr = obj.formList;
      }
    } else {
      this.arr = obj.formList;
    }
    this.obj = obj;
    this.form = obj.from;
    console.log("新增、编辑对象", this.form);
  },
  mounted() {},
  destroyed() {
    obj.form = {};
    obj.reForm();
    this.obj = null;
    this.form = null;
    this.arr = null;
  },
  methods: {
    // todo 采取防抖策略
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.time) clearTimeout(this.time);
          this.time = setTimeout(() => {
            if (this.id) {
              obj.edit.call(obj);
            } else {
              obj.submit.call(obj);
            }
          }, 1000);
        }
      });
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
        width: 440px;
      }
      /*操作*/
      & > :last-child {
        button {
          margin-right: 20px;
        }
      }
      /*选择框、时间样式*/
      .ivu-select,
      .ivu-date-picker {
        width: 100% !important;
        margin: 0 !important;
      }
    }
    &-submit {
      background-color: #0d35f1;
      border-color: #0d35f1;
      border-radius: 6px;
    }
  }
}
</style>
