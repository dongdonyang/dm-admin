import App from "./App.vue";
import { router } from "./router/index.js";
import store from "./store/index.js";
import API from "./http/api";
import "iview/dist/styles/iview.css";
import "./http/http";
import "./libs/rem";
import "./components/register"; //基础组件注册

Vue.prototype.$API = API;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
