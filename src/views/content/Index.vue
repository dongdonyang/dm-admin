<template>
  <div class="index">
    <!--    todo 因组件注册有缓存，故使用v-if-->
    <!--    可以使用异步组件来渲染render-->
    <head-component class="index-header" v-if="obj.head"></head-component>

    <div class="index-card">
      <!--    筛选选项-->
      <Row type="flex" justify="space-between">
        <p class="index-card-title">{{ obj.title }}</p>
        <!--        自定义筛选组件-->
        <select-component
          :obj="obj"
          class="index-card-select"
          v-if="obj.select"
        ></select-component>

        <Button icon="md-add" @click="obj.addRow.call(obj)">新增</Button>
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
          slot-scope="{ row }"
          slot="action"
        >
          <Tooltip content="详情" placement="top">
            <i class="iconfont iconchakan" @click="obj.detailRow(row)"></i>
          </Tooltip>
          <Tooltip content="编辑" placement="top">
            <i class="iconfont iconbianji" @click="obj.editRow(row)"></i>
          </Tooltip>
          <Tooltip content="删除" placement="top">
            <i class="iconfont iconshanchu" @click="deleteRow(row)"></i>
          </Tooltip>
        </Row>
      </Table>
      <div v-else>暂无数据</div>
      <!--    分页-->
      <Page
        v-show="obj.totalSize > obj.pageSize"
        prev-text="上一页"
        next-text="下一页"
        size="small"
        :total="obj.totalSize"
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
    // 异步加载当前页面各自的组件，todo 组件注册存在缓存，obj.head改变后不会重新渲染页面、暂时改成全局注册
    // HeadComponent: resolve => obj.head && resolve(obj.head),
    // SelectComponent: resolve => obj.select && resolve(obj.select)
  },
  data() {
    return {
        pic: require("../../assets/Group.png"),
      obj: Object
    };
  },
  /**
   * @fileOverview new一个对象，把当前用户，和页面传入，对象根据当前用户生成该用户能操
   *               作的看法和能看到的内容，根据当前页面router来渲染不同的table列表和筛选条件
   * */
  created() {
    obj = new Content([1], this.$route);
    Vue.component("select-component", obj.select); // 全局注册
    Vue.component("head-component", obj.head);
    obj.$router = this.$router; // 方便路由跳转
    this.obj = obj;
    obj.getList(); // 获取当前列表数据
    console.log("当前页面对象", obj);
  },
  mounted() {},
  methods: {
    deleteRow(row) {
        this.$Modal.confirm({
        title: "确认删除？",
        content: "<div class='sure'><div class='sure-img'></div>删除后将无法恢复该数据、确认删除当前数据吗?</div>",
        onOk: () => {
          // todo 修改
          obj.deleteRow(row);
        }
      });
    }
  }
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
    /*自定义筛选*/
    &-select {
      flex: 2 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 15px;
    }
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
/*  todo 删除确认弹窗*/
.ivu-modal {
  top: 380px;
  .ivu-modal-body {
    padding: 0;
    .ivu-modal-confirm {
      padding: 0;
    }
    /*头部*/
    .ivu-modal-confirm-head {
      background-color: #0d35f1;
      padding: 14px 30px;
      .ivu-modal-confirm-head-title {
        color: #fff;
      }
      .ivu-modal-confirm-head-icon {
        display: none;
      }
    }
    /*bady*/
    .ivu-modal-confirm-body {
      line-height: 60px;
      font-size: 14px;
      .sure{
        display: flex;
        align-items: center;
      }
      .sure-img{
        margin: 5px;
        height: 31px;
        width: 31px;
        background-image: url("../../assets/Group.png");
      }
    }
    /*  footer*/
    .ivu-modal-confirm-footer {
      background:rgba(249,249,249,1);
      margin-top: 0;
      line-height: 96px;
      padding: 0 30px;
      & > :last-child {
        background-color: #0d35f1;
        border-radius: 18px;
      }
    }
  }
}
</style>
