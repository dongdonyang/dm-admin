/**
 * 统一配置项目的请求
 * 使用qs.stringify解决axios跨域问题
 * 配置axios请求类型为post时，使用qs.stringify来实现跨域访问，以及每次请求携带token
 * 配置请求成功后res，实现诸如登录失败，登录超时，账户密码错误和请求错误等拦截器
 */
// import axios from "axios";
import qs from "qs";
import { Message } from "iview";
import { router } from "../router/index";
import store from "../store";

let errQueue = 0; // 定义错误队列

// axios 配置
axios.defaults.timeout = 50000; // 请求超时时间
axios.defaults.baseURL = process.env.BASE_API || "http://192.168.50.138:8621"; // 请求的地址
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

const _axios = axios.create();

// axios.defaults.withCredentials = true; //axios跨域携带cookie的配置
// http request 拦截器
_axios.interceptors.request.use(
  config => {
    if (config.method === "post" && config.url !== "upload") {
      config.data.token = store.state.user.token || null; // 给每次请求设置token
      config.data = qs.stringify(config.data); // 跨域设置

      // if (
      //   config.headers["Content-Type"] &&
      //   config.headers["Content-Type"] === "multipart/form-data"
      // ) {
      //   // aixos上传文件到七牛
      // } else {
      //   config.data = qs.stringify(config.data);
      // }
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// http response 拦截器
/**
 * 拦截器也可以判定返回的response成功时的状态码进行拦截
 */
_axios.interceptors.response.use(
  res => {
    if (res.data.code) {
      if (res.data.code === 1001) {
        // 接口返回数据正常
        errQueue = 0;
        res.data.success = true;
        return res.data;
      } else if (res.data.code === 2003) {
        // 用户需要重新登陆
        errQueue += 1;
        if (errQueue <= 1) {
          Message.error("您的账号在别处登录，请重新登录");
        }

        // 如果需要重新登陆，清除掉role和token
        window.$cookies.remove("bg_role");
        window.$cookies.remove("bg_token");

        store.dispatch("setToken", "");
        router.replace({
          path: "/login"
        });
      } else {
        // 如果请求不成功，则做对应的处理
        Message.error(res.data.msg);
        return res;
      }
    } else {
      return res;
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 500:
          Message.error(error.response.request.responseURL + "服务器无响应");
          break;
      }
    }
  }
);
Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    }
  });
};

Vue.use(Plugin);

export default _axios;
