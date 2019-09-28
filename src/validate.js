/**
 * 统一的自定义表单验证规则
 * 是否必填或者长度等验证，请在组件内部书写
 */

/* eslint-disable no-useless-escape */
export default {
  /**
   * [表单的自定义验证]
   * @Author   lzm
   * @DateTime 2018-05-11
   * @param    {[Object]}   rule     [这是iview自动传入的规则对象]
   * @param    {[String]}   value    [输入的值]
   * @param    {Function} callback [验证成功或失败的回调函数]
   * @return   {[type]}            [description]
   */
  CheckChinese: (rule, value, callback) => {
    let reg = /^[\u4E00-\u9FA5]{1,10}$/;
    if (!reg.test(value)) {
      callback(new Error("只能全为中文"));
    } else {
      callback();
    }
  },

  CheckNumber: (rule, value, callback) => {
    let reg = /\D/g;
    if (reg.test(value)) {
      callback(new Error("只能输入数字"));
    } else {
      callback();
    }
  },

  // 验证名称长度
  name: (rule, value, callback) => {
    if (!value || value.trim().length == 0) {
      return callback(new Error("名称不能为空"));
    } else if (value.trim().length > 30) {
      callback(new Error("名称长度不能超过30"));
    } else {
      callback();
    }
  },

  // 验证公司名称
  company: (rule, value, callback) => {
    if (!value || value.trim().length == 0) {
      return callback(new Error("公司名称不能为空"));
    } else if (value.trim().length > 30) {
      callback(new Error("公司名称长度不能超过30"));
    } else {
      callback();
    }
  },

  CheckIp: (rule, value, callback) => {
    let reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (!reg.test(value)) {
      callback(new Error("输入正确IP地址"));
    } else {
      callback();
    }
  },

  // 验证非负数
  CheckPosNumber: (rule, value, callback) => {
    let reg = /\D/g;
    if (reg.test(value) || value <= 0) {
      callback(new Error("只能输入大于0的数"));
    } else {
      callback();
    }
  },

  CheckPhone: (rule, value, callback) => {
    let reg = /^1\d{10}$/g;
    if (!reg.test(value)) {
      callback(new Error("请输入正确的手机号"));
    } else {
      callback();
    }
  },

  CheckWebsite: (rule, value, callback) => {
    let reg = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/g;

    if (!reg.test(value) && value !== "") {
      callback(new Error("请输入正确的网址"));
    } else {
      callback();
    }
  },

  CheckEmail(rule, value, callback) {
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
  },

  // 验证手机号  ==>非必需
  validatePhones: (rule, value, callback) => {
    var reg = /^1[34578][0-9]{9}$/;
    if (value && !reg.test(value)) {
      return callback(new Error("请输入有效电话"));
    } else {
      callback();
    }
  },

  // 验证手机号  ==必填
  phone: (rule, value, callback) => {
    var reg = /^1[34578][0-9]{9}$/;
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

  // 验证密码
  validatePass: (rule, value, callback) => {
    var reg = /^[^\u4e00-\u9fa5]{0,}$/;
    if (value == "") {
      callback(new Error("请输入6-20位的密码,可以包含A-Z,a-z,0-9和特殊字符"));
    } else {
      if (value.length < 6 || value.length > 32) {
        callback(new Error("密码长度为6-20"));
      } else if (!reg.test(value)) {
        callback(new Error("密码不能含有中文"));
      } else {
        callback();
      }
    }
  },

  // 验证省市区三级联动
  local(rule, value, callback) {
    if (!value.length) {
      return callback(new Error("地区不能为空"));
    } else {
      callback();
    }
  },

  // 验证选择楼盘
  buildingId(rule, value, callback) {
    if (!value) {
      callback(new Error("请选择楼盘"));
    } else {
      callback();
    }
  },

  // 选择户型类型
  types(rule, value, callback) {
    if (!value) {
      callback(new Error("请选择户型"));
    } else {
      callback();
    }
  },

  // 选择制图人员
  drawer(rule, value, callback) {
    if (!value) {
      callback(new Error("请制图人员"));
    } else {
      callback();
    }
  },

  // 验证昵称长度
  validateName: (rule, value, callback) => {
    if (!value || value.trim().length === 0) {
      return callback(new Error("昵称不能为空"));
    } else if (value.trim().length > 30) {
      callback(new Error("昵称长度不能超过30"));
    } else {
      callback();
    }
  },

  // 验证姓名长度
  userName: (rule, value, callback) => {
    if (!value || value.trim().length === 0) {
      return callback(new Error("姓名不能为空"));
    } else if (value.trim().length > 30) {
      callback(new Error("姓名长度不能超过30"));
    } else {
      callback();
    }
  },

  // 验证只能为正整数或者保留最多两位小数
  CheckIntegerOrPointNumber: (rule, value, callback) => {
    // let regExp = /^\d+(\.\d{1,2})?$/;
    let regExp = /^([1-9]\d*|0)(\.\d{1,2})?$/;
    if (value === "") {
      callback();
    } else if (!regExp.test(value)) {
      callback(new Error("正整数或两位小数"));
    } else {
      callback();
    }
  },

  // 验证预览图是否上传
  CheckPreviewPic: (rule, value, callback) => {
    if (!value) {
      return callback(new Error("该项不能为空"));
    } else {
      callback();
    }
  },

  // 验证户型面积
  CheckArea(rule, value, callback) {
    if (!value) {
      return callback(new Error("面积不能为空"));
    }
    let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^[0-9]\.[0-9]([0-9])?$)/;

    if (!reg.test(value)) {
      callback(new Error("请输入正确的面积数"));
    } else {
      if (value > 99999) {
        callback(new Error("请输入正确的面积数"));
      } else {
        callback();
      }
    }
  }
};
