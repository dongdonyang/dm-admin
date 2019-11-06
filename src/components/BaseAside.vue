<template>
  <div class="base-aside">
    <!--    LOGO-->
    <div>
      <img v-show="!isCollapsed" src="../assets/fullLogo.png" alt="" />
      <span v-show="isCollapsed">
        <i
          style="font-size: 24px; color: #0D35F1"
          class="iconfont iconlogo"
        ></i>
      </span>
    </div>

    <!--    菜单-->
    <Sider
      ref="side"
      collapsible
      :collapsed-width="sideWidth"
      :width="sideWidth"
      v-model="isCollapsed"
      hide-trigger
    >
      <Menu
        accordion
        :active-name="activeName"
        width="auto"
        @on-select="openNew"
      >
        <!--        todo 折叠菜单-->
        <div v-show="isCollapsed">折叠菜单</div>

        <!--        todo 展开菜单-->
        <div v-show="!isCollapsed">
          <div v-for="(item, index) in menuList" :key="index">
            <!--            多级菜单-->
            <template v-if="item.children">
              <Submenu :name="item.name">
                <template slot="title">
                  <i :class="`iconfont ${item.icon}`" />
                  {{ item.title }}
                </template>
                <menu-item
                  :name="i.name"
                  v-for="(i, k) in item.children"
                  :key="k"
                  >{{ i.title }}</menu-item
                >
              </Submenu>
            </template>
            <!--            一级菜单-->
            <template v-else>
              <menu-item :name="item.name">
                <i :class="`iconfont ${item.icon}`" />
                {{ item.title }}</menu-item
              >
            </template>
          </div>
        </div>
      </Menu>
    </Sider>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/9:33
 */
export default {
  name: "BaseAside",
  computed: {
    //菜单栏状态
    isCollapsed: function() {
      return this.$store.state.app.menuState;
    },
    // 是否折叠宽度计算
    sideWidth: function() {
      //todo 没有转成rem
      return this.isCollapsed ? "76px" : "250px";
    }
  },
  data() {
    return {
      activeName: null,
      menuList: []
    };
  },
  created() {
    // this.activeName = this.$route.name;
    this.activeName = sessionStorage.getItem("menuName");
    console.log("当前路由name", this.activeName);
    this.createMenuByRouter();
  },
  mounted() {},
  methods: {
    //  根据生成的路由创建菜单栏
    createMenuByRouter() {
      function getMenu(list) {
        let array = [];
        list.forEach(item => {
          if (item.meta && !item.meta.hideInMenu) {
            array.push({
              icon: item.meta.icon || null,
              title: item.meta.title || null,
              name: item.name || null,
              children: item.children ? getMenu(item.children) : null
            });
          }
        });
        return array.length ? array : null;
      }
      let routerList = this.$router.options.routes.filter(item => {
        return !item.meta.hideInMenu;
      });
      this.menuList = getMenu(routerList);
      console.log("菜单：", this.menuList);
    },
    //  路由跳转
    openNew(name) {
      sessionStorage.setItem("menuName", name); //刷新页面菜单栏能定位到当前
      this.$router.push({
        name: name
      });
    }
  }
};
</script>

<style scoped lang="scss">
.base-aside {
  height: 100%;
  & > :first-child {
    line-height: 90px;
    height: 90px;
    text-align: center;
  }
  .ivu-menu::after {
    background-color: #f1f1f1;
  }
  /*修改菜单栏颜色*/
  .ivu-menu-item-selected {
    transition: all 1s;
    color: #fff !important;
    background-color: #0d35f1 !important;
    &::after {
      width: 0 !important;
    }
  }
  /*.ivu-menu-item:hover {*/
  /*  background-color: #f1f1f1 !important;*/
  /*}*/
}
</style>
