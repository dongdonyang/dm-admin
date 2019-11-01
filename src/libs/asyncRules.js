// 表单的验证规则
// todo 事先定义好验证规则，然后接收相应的type来判断，比如，整数，小数，字数限制，邮箱，电话等验证类型
const rules = {
  // 必填字段
  fieldFill: function(msg = "该项为必填信息", validator = "") {
    let arr = [];
    arr.push({
      required: true,
      message: msg
    });
    //自定义验证规则
    validator &&
      arr.push({
        validator: validate[validator]
      });
    return arr;
  }
};

// 验证规则表
const validate = {
  // todo 整数或者两位小数
  integer: (rule, value, callback) => {
    if (value) {
      let regExp = /^(([0-9]+|0)\.([0-9]{1,2})$)|^([0-9]+|0)$/;
      if (regExp.test(value)) {
        callback();
      } else {
        callback(new Error("请输入整数"));
      }
    } else {
      callback(new Error(rule.message));
    }
  },
  // todo 正整数
  ints: (rule, value, callback) => {
    if (value) {
      let regExp = /^\+?[1-9][0-9]*$/;
      if (regExp.test(value)) {
        callback();
      } else {
        callback(new Error("请输入整数"));
      }
    } else {
      callback(new Error(rule.message));
    }
  }
};

export default rules;
