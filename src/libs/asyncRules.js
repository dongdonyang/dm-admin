// 表单的验证规则
import _axios from "../http/http";

const rules = {
  myinput: {
    require: true,
    message: "qweqwe"
  }
  // get myinput() {
  //   return {
  //     required: true,
  //     message: "233"
  //   };
  // }
};
export default rules;

// 注册插件
// Plugin.install = function(Vue) {
//   Vue.rules = rules;
//   window.rules = rules;
//   Object.defineProperties(Vue.prototype, {
//     rules: {
//       get() {
//         return rules;
//       }
//     },
//     $rules: {
//       get() {
//         return rules;
//       }
//     }
//   });
// };
