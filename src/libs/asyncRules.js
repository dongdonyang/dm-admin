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
  },
  // 验证手机号  ==必填
  phone: (rule, value, callback) => {
    let reg = /^1[34578][0-9]{9}$/;
    if (!value) {
      return callback(new Error("请输入手机号码"));
    } else {
      if (reg.test(value)) {
        callback();
      } else {
        return callback(new Error("请输入有效的手机号码"));
      }
    }
  },
  // 验证邮箱
  CheckEmail: (rule, value, callback) => {
    let reg = /^[A-z0-9_]{3,12}@[A-z0-9]{2,12}(\.com|\.cn|\.com\.cn)$/g;
    if (!value) {
      callback();
      return;
    }
    if (!reg.test(value)) {
      callback(new Error("请输入正确的邮箱"));
    } else {
      callback();
    }
  }
};

export default rules;
