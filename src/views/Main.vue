<template>
  <div class="main">
    <aside>
      <base-aside></base-aside>
    </aside>
    <div>
      <base-header></base-header>
      <main>
        <router-view :key="$route.name"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/9/25/9:15
 */
import BaseHeader from "../components/BaseHeader";
import BaseAside from "../components/BaseAside";
export default {
  name: "Main",
  components: { BaseAside, BaseHeader },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.main {
  height: 100%;
  display: flex;
  & > div {
    flex: 2 0 auto;
    display: flex;
    flex-direction: column;
  }
  main {
    background-color: #f1f1f1;
    padding: 30px;
    flex: 2 0 auto;
    display: flex;
    flex-direction: column;
  }
}
</style>
