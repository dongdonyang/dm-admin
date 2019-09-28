/**
 * 定义vue的全局方法/属性、全局实例方法、全局过滤器、全局指令
 * 该文件会不断的添加公共方法、指令和过滤器
 * 文件需要各位不断维护下去
 * 请做必要的注释
 */
import md5 from "js-md5";
//本地的角色列表，后期只需要在此添加新的角色
export const RoleList = [
  {
    roleId: "2",
    role: md5("管理员"),
    roleIdMd5: md5("2")
  },
  {
    roleId: "4",
    role: md5("模型设计师"),
    roleIdMd5: md5("4")
  },
  {
    roleId: "5",
    role: md5("模型审核师"),
    roleIdMd5: md5("5")
  },
  {
    roleId: "7",
    role: md5("2D制图员"),
    roleIdMd5: md5("7")
  },
  {
    roleId: "8",
    role: md5("2D制图审核员"),
    roleIdMd5: md5("8")
  },
  {
    roleId: "10",
    role: md5("非签约方案设计师"),
    roleIdMd5: md5("10")
  },
  {
    roleId: "11",
    role: md5("签约方案设计师"),
    roleIdMd5: md5("11")
  },
  {
    roleId: "12",
    role: md5("方案审核师"),
    roleIdMd5: md5("12")
  },
  {
    roleId: "13",
    role: md5("商城管理员"),
    roleIdMd5: md5("13")
  },
  {
    roleId: "14",
    role: md5("美术师"),
    roleIdMd5: md5("14")
  },
  {
    roleId: "17",
    role: md5("3D制图员"),
    roleIdMd5: md5("17")
  },
  {
    roleId: "18",
    role: md5("3D制图审核员"),
    roleIdMd5: md5("18")
  },
  {
    roleId: "19",
    role: md5("户型任务管理员"),
    roleIdMd5: md5("19")
  },
  {
    roleId: "20",
    role: md5("户型收录员"),
    roleIdMd5: md5("20")
  },
  {
    roleId: "21",
    role: md5("厂家管理员"),
    roleIdMd5: md5("21")
  }
];

// 用于新增后台管理人员
export const getAdminRoleList = [
  {
    roleId: 4,
    role: "模型设计师"
  },
  {
    roleId: 5,
    role: "模型审核师"
  },
  {
    roleId: 7,
    role: "2D制图员"
  },
  {
    roleId: 8,
    role: "2D制图审核员"
  },
  {
    roleId: 14,
    role: "美术师"
  },
  {
    roleId: 17,
    role: "3D制图员"
  },
  {
    roleId: 18,
    role: "3D制图审核员"
  },
  {
    roleId: 19,
    role: "户型任务管理员"
  },
  {
    roleId: 20,
    role: "户型收录员"
  }
];

export const getDesignerList = [
  {
    roleId: 10,
    role: "非签约方案设计师"
  },
  {
    roleId: 11,
    role: "签约方案设计师"
  },
  {
    roleId: 12,
    role: "方案审核师"
  }
];

export const getShopAdminRoleList = [
  {
    roleId: 13,
    role: "商城管理员"
  }
];

export const getVenderAdminRoleList = [
  {
    roleId: 21,
    role: "厂家管理员"
  }
];

let url = "";
// if (process.env.NODE_ENV === "production") {
//   // 线上环境
//
//   if (httpUrl.lineType == "prod") {
//     url = httpUrl.prodUploadUrl;
//   } else if (httpUrl.lineType == "test") {
//     url = httpUrl.testUploadUrl;
//   } else if (httpUrl.lineType == "dev") {
//     url = httpUrl.devUploadUrl;
//   }
// } else {
//   // 线下环境
//   url = httpUrl.baseUploadUrl;
// }

export default {
  install(Vue) {
    // 上传文件域名
    Vue.prototype.$uploadfileUrl = process.env.UPLOAD_URL;

    Vue.prototype.getFileName = function(str) {
      if (!str) {
        return "";
      }
      let index = str.lastIndexOf("/");
      str = str.substring(index + 1, str.length);
      return str;
    };

    //查找传入的id是否在当前的用户角色中
    Vue.prototype.findCustomRoleId = function(roleId = "2") {
      let role = this.$cookies.get("bg_role");

      if (role && typeof role == "string") {
        role = role.split(",");
      }
      let roleObj = _.find(RoleList, function(o) {
        return o.roleId === roleId;
      });

      if (
        roleObj.roleIdMd5 &&
        role.indexOf(roleObj.roleIdMd5.toUpperCase()) !== -1
      ) {
        return true;
      } else {
        return false;
      }
    };

    /**
     * [uploadError 文件上传组件上传错误统一处理]
     * @Author   lizhiming
     * @DateTime 2018-12-20
     * @param    {[type]}   data [description]
     * @param    {[type]}   that [description]
     * @return   {[type]}        [description]
     */
    Vue.prototype.uploadError = function(data, that) {
      switch (data.type) {
        case "limitSizeError":
          that.$Notice.warning({
            title: "超过最大限制",
            desc: `请选择小于[ ${data.data} ]的文件`
          });
          break;
        case "limitFormatError":
          that.$Notice.warning({
            title: "文件格式错误",
            desc: `请选择[ ${data.data} ]格式的文件`
          });
          break;
        case "duplicateFileError":
          that.$Notice.warning({
            title: "操作错误",
            desc: `不允许选择重复文件`
          });
          break;
        default:
          break;
      }
    };

    // 下载
    Vue.prototype.downloadFn = function(content, filename) {
      // window.open(url)
      // 创建隐藏的可下载链接
      var eleLink = document.createElement("a");
      eleLink.download = filename;
      eleLink.style.display = "none";
      // 字符内容转变成blob地址
      var blob = new Blob([content]);
      eleLink.href = URL.createObjectURL(blob);
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    };

    //滚动条到顶部
    Vue.prototype.scrollTop = function(el, from = 0, to, duration = 500) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            return window.setTimeout(callback, 1000 / 60);
          };
      }
      const difference = Math.abs(from - to);
      const step = Math.ceil((difference / duration) * 50);

      function scroll(start, end, step) {
        if (start === end) return;

        let d = start + step > end ? end : start + step;
        if (start > end) {
          d = start - step < end ? end : start - step;
        }
        if (el === window) {
          window.scrollTo(d, d);
        } else {
          el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
      }
      scroll(from, to, step);
    };

    Vue.prototype.formatTimes = function(value) {
      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分,
          "s+": this.getSeconds(), //秒,
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    };

    //格式化价格
    Vue.prototype.formatPrice = function(s, n = 2) {
      /*
       * 参数说明：
       * s：要格式化的数字
       * n：保留几位小数
       * */
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
      var l = s
          .split(".")[0]
          .split("")
          .reverse(),
        r = s.split(".")[1];
      var t = "";
      for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? "," : "");
      }
      return (
        t
          .split("")
          .reverse()
          .join("") +
        "." +
        r
      );
    };

    // 返回任务状态列表
    Vue.prototype.getTaskStatusList = function() {
      return [
        {
          id: -1,
          name: "全部"
        },
        {
          id: 0,
          name: "未领取"
        },
        {
          id: 10,
          name: "执行中"
          // }, {
          //   id: 15,
          //   name: "美术优化中"
          // }, {
          //   id: 20,
          //   name: "待审核"
          // }, {
          //   id: 30,
          //   name: "重做中"
        },
        {
          id: 40,
          name: "已完成"
        }
      ];
    };

    // 返回任务状态列表
    Vue.prototype.getTaskStatusListAll = function() {
      return [
        {
          id: -1,
          name: "全部"
        },
        {
          id: 0,
          name: "未领取"
        },
        {
          id: 10,
          name: "执行中"
        },
        {
          id: 15,
          name: "美术优化中"
        },
        {
          id: 20,
          name: "待审核"
          // }, {
          //   id: 30,
          //   name: "重做中"
        },
        {
          id: 40,
          name: "已完成"
        }
      ];
    };

    // 处理三维建模的状态
    Vue.prototype.handleTask1Status = function(num) {
      let str = "";

      switch (num) {
        case 0:
          str = "未领取";
          break;
        case 10:
          str = "执行中";
          break;
        case 15:
          str = "美术优化中";
          break;
        case 20:
          str = "待审核";
          break;
        case 30:
          str = "重做中";
          break;
        case 40:
          str = "已完成";
          break;
        default:
          break;
      }

      return str;
    };

    //添加全局方法/属性
    //一个叫做myGlobalMethod的全局方法
    Vue.myGlobalMethod = function() {
      //逻辑...
    };

    //添加全局指令
    //添加全局的drag指令
    Vue.directive("drag", function(el) {
      el.onmousedown = function(e) {
        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        var divx = e.clientX - el.offsetLeft;
        var divy = e.clientY - el.offsetTop;
        //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
        document.onmousemove = function(e) {
          //获取移动后div的位置：鼠标位置-divx/divy
          var l = e.clientX - divx;
          var t = e.clientY - divy;
          el.style.left = l + "px";
          el.style.top = t + "px";
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
        };
      };
    });

    //添加全局过滤器
    //时间格式过滤器，输入内容是Number或者Date对象，输入是YYYY-MM-DD HH-MM-SS
    Vue.filter("formatTime", function(value) {
      if (!value) {
        return "-";
      }

      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分,
          "s+": this.getSeconds(), //秒,
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };

        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    });
  }
};
