import App from "./App.vue";
import { router } from "./router/index.js";
import store from "./store/index.js";
import API from "./http/api";
import "iview/dist/styles/iview.css";
import "./http/http";
import "./libs/rem";
import "./components/register"; //基础组件注册
// import "./libs/asyncRules" // 验证规则

Vue.prototype.$API = API;

Vue.config.productionTip = false;

// 拉去用户信息，防止刷新页面丢失，然后存在store中
let token = sessionStorage.getItem("token");
if (token) {
  store.commit("setToken", token);
}

console.log("当前环境：", process.env);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
