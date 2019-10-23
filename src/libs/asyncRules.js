// 表单的验证规则

// todo 事先定义好验证规则，然后接收相应的type来判断，比如，整数，小数，字数限制，邮箱，电话等验证类型
const rules = {
  // 必填字段
  fieldFill: function(msg = "该项为必填信息", type = "") {
    return {
      required: true,
      message: msg
    };
  }
};
export default rules;
