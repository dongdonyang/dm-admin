<template>
  <div class="index">
    <!--    todo 因组件注册有缓存，故使用v-if-->
    <head-component class="index-header" v-if="obj.head"></head-component>

    <div class="index-card">
      <!--    筛选选项-->
      <Row type="flex" justify="space-between">
        <p class="index-card-title">{{ obj.title }}</p>
        <!--        自定义筛选组件-->
        <select-component></select-component>
        <Button icon="md-add" @click="obj.addRow">新增</Button>
      </Row>

      <!--    table列表-->
      <Table
        highlight-row
        v-if="obj.tableData.length"
        :columns="obj.tableColumn"
        :data="obj.tableData"
      >
        <!--        操作-->
        <Row
          type="flex"
          justify="space-between"
          slot-scope="{ row, index }"
          slot="action"
        >
          <Button size="small" @click="obj.getDetail(index)">查看</Button>
          <Button size="small" @click="obj.editRow(index)">编辑</Button>
          <Button size="small" @click="obj.deleteRow(index)">删除</Button>
        </Row>
      </Table>
      <div v-else>没数据</div>

      <!--    分页-->
      <Page
        prev-text="上一页"
        next-text="下一页"
        size="small"
        :total="100"
        show-sizere
        @on-change="obj.pageChange.call(obj, $event)"
      ></Page>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/9:09
 */
import Content from "./index";
let obj = Object;
export default {
  name: "Index",
  components: {
    // 异步加载当前页面各自的组件
    HeadComponent: resolve => resolve(obj.head),
    SelectComponent: resolve => resolve(obj.select)
  },
  data() {
    return {
      obj: Object
    };
  },
  /**
   * @fileOverview new一个对象，把当前用户，和页面传入，对象根据当前用户生成该用户能操
   *               作的看法和能看到的内容，根据当前页面router来渲染不同的table列表和筛选条件
   * */
  created() {
    obj = new Content([1], this.$route);
    console.log("当前页面对象", obj);
    // obj.getList(); // 获取当前列表数据
    this.obj = obj;
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
.index {
  flex: 2 0 auto;
  display: flex;
  flex-direction: column;

  &-header {
    font-size: 18px;
    height: 48px;
  }

  /*  卡片*/
  &-card {
    background-color: #fff;
    padding: 30px;
    border-radius: 6px;
    flex: 2 0 auto;
    display: flex;
    flex-direction: column;
    /*todo 筛选*/
    & > :nth-child(1) {
      line-height: 36px;
      margin-bottom: 30px;
      /*新增按钮*/
      & > :last-child {
        background-color: #0d35f1;
        border-color: #fff;
        border-radius: 18px;
        color: #fff;
      }
    }
    &-title {
      font-size: 20px;
      font-weight: bold;
      color: #333;
    }
    /*todo table*/
    & > :nth-child(2) {
      flex: 2 0 auto;
      /*去掉边框*/
      border-width: 0;
      .ivu-table::before,
      .ivu-table::after {
        background-color: #fff;
      }
      .ivu-table td,
      .ivu-table th {
        height: 60px;
        border-width: 0;
        font-size: 14px;
      }
      .ivu-table th {
        background-color: #f9f9f9;
      }
    }
    /*todo page*/
    & > :nth-child(3) {
      text-align: center;
      line-height: 28px;
    }
  }
}
</style>
