<template>
  <div class="base-header">
    <!--    左侧-->
    <img
      :class="[
        { 'base-header-collapsed': isCollapsed },
        'base-header-transition'
      ]"
      src="../assets/隐藏.svg"
      alt=""
      @click="$store.commit('changeMenuState')"
    />

    <!--    右侧-->
    <div>1</div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/9:17
 */
export default {
  name: "BaseHeader",
  computed: {
    isCollapsed: function() {
      return this.$store.state.app.menuState;
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    qq() {
      alert(11);
    }
  }
};
</script>

<style scoped lang="scss">
.base-header {
  border-left: 1px solid #f2f2f2;
  line-height: 50px;
  height: 50px;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > img {
    cursor: Pointer;
  }
  &-collapsed {
    transform: rotate(-180deg);
  }
  &-transition {
    transition: all 0.6s;
  }
}
</style>
