/**
 * 系统常用方法，调用tool.js的基础方法
 */

import { RoleList } from "@/libs/plugin";

import { forEach, hasOneOf } from "@/libs/tool";

export const hasChild = item => {
  return item.children && item.children.length !== 0;
};

const showThisMenuEle = (item, access) => {
  if (item.meta && item.meta.access && item.meta.access.length) {
    if (hasOneOf(item.meta.access, access)) return true;
    else return false;
  } else return true;
};
/**
 * @param {Array} list 通过路由列表得到菜单列表
 * @returns {Array}
 */
export const getMenuByRouter = (list, access) => {
  let res = [];
  forEach(list, item => {
    if (item.meta && !item.meta.hideInMenu) {
      let obj = {
        icon: (item.meta && item.meta.icon) || "",
        name: item.name,
        meta: item.meta
      };
      if (
        hasChild(item)
        // && showThisMenuEle(item, access)
      ) {
        obj.children = getMenuByRouter(item.children, access);
      }
      // if (showThisMenuEle(item, access))
      res.push(obj);
    }
  });
  return res;
};

/**
 * @param {Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = routeMetched => {
  let res = routeMetched
    .filter(item => {
      return item.meta === undefined || !item.meta.hide;
    })
    .map(item => {
      let obj = {
        icon: (item.meta && item.meta.icon) || "",
        name: item.name,
        meta: item.meta
      };
      return obj;
    });
  res = res.filter(item => {
    return !item.meta.hideInMenu;
  });
  return [
    {
      name: "home",
      to: "/home"
    },
    ...res
  ];
};

export const showTitle = (item, vm) =>
  vm.$config.useI18n
    ? vm.$t(item.name)
    : (item.meta && item.meta.title) || item.name;

/**
 * @param {Array} routers 路由列表数组
 * @description 用于找到路由列表中name为home的对象
 */
export const getHomeRoute = routers => {
  let i = -1;
  let len = routers.length;
  let homeRoute = {};
  while (++i < len) {
    let item = routers[i];
    if (item.children && item.children.length) {
      let res = getHomeRoute(item.children);
      if (res.name) return res;
    } else {
      if (item.name === "home") homeRoute = item;
    }
  }
  return homeRoute;
};

/**
 * @param {*} access 用户权限数组，如 ['super_admin', 'admin']
 * @param {*} route 路由列表
 */
const hasAccess = (access, route) => {
  if (route.meta && route.meta.access)
    return hasOneOf(access, route.meta.access);
  else return true;
};

/**
 * @param {*} name 即将跳转的路由name
 * @param {*} access 用户权限数组
 * @param {*} routes 路由列表
 * @description 用户是否可跳转到该页
 */
export const canTurnTo = (name, access, routes) => {
  const getHasAccessRouteNames = list => {
    let res = [];
    list.forEach(item => {
      if (item.children && item.children.length) {
        res = [].concat(res, getHasAccessRouteNames(item.children));
      } else {
        if (item.meta && item.meta.access) {
          if (hasAccess(access, item)) res.push(item.name);
        } else {
          res.push(item.name);
        }
      }
    });
    return res;
  };
  const canTurnToNames = getHasAccessRouteNames(routes);
  return canTurnToNames.indexOf(name) > -1;
};

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
  const keyValueArr = url.split("?")[1].split("&");
  let paramObj = {};
  keyValueArr.forEach(item => {
    const keyValue = item.split("=");
    paramObj[keyValue[0]] = keyValue[1];
  });
  return paramObj;
};

/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
  let i = -1;
  while (++i < times) {
    callback();
  }
};

/**
 * [cRoleAndsRoleIsEquality session中的用户role是否和cookie中的role一致]
 * @Author   lizhiming
 * @DateTime 2018-07-09
 * @param    {[Object]}   roleObj [session中的role]
 * @param    {[String]}   role    [cookie中的role]
 * @return   {[type]}           [description]
 */
export const cRoleAndsRoleIsEquality = function(roleObj, role) {
  if (!role) {
    return false;
  }

  if (roleObj.role && typeof roleObj.role == "string") {
    roleObj.role = roleObj.role.split(",");
  }
  if (roleObj && roleObj && roleObj.role.toString() === role.toString()) {
    return true;
  } else {
    return false;
  }
};

/**
 * [findRoleId 根据md5加密的role，在roleList中找到对应的roleId]
 * @Author   lizhiming
 * @DateTime 2018-07-09
 * @param    {[Array]}   roleList [角色列表]
 * @param    {[String]}   role    [cookie中的role]
 * @return   {[type]}            [description]
 */
export const findRoleId = function(role) {
  if (!role) {
    return null;
  }
  let roleObj = _.find(RoleList, function(o) {
    return o.roleIdMd5 == role.toLowerCase();
  });
  return roleObj.roleId;
};

/**
 * [toDefaultPage 输入父级路由，自动跳转到第一个子路由]
 * @Author   lizhiming
 * @DateTime 2018-07-10
 * @param    {[type]}   routers [description]
 * @param    {[type]}   name    [description]
 * @param    {[type]}   route   [description]
 * @param    {Function} next    [description]
 * @return   {[type]}           [description]
 */
export const toDefaultPage = function(routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (
      routers[i].name === name &&
      routers[i].children &&
      routers[i].redirect === undefined
    ) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

/**
 * [isBroswer 检测浏览器版本]
 * @Author   lizhiming
 * @DateTime 2018-07-10
 * @return   {Boolean}  [description]
 */
export const isBroswer = function() {
  //检测浏览器内核--返回的是两个key，name：浏览器内核的名称---version：浏览器的版本号
  var _broswer = {};
  var sUserAgent = navigator.userAgent;
  var isOpera = sUserAgent.indexOf("Opera") > -1;
  if (isOpera) {
    //首先检测Opera是否进行了伪装
    if (navigator.appName == "Opera") {
      //如果没有进行伪装，则直接后去版本号
      _broswer.version = parseFloat(navigator.appVersion);
    } else {
      var reOperaVersion = new RegExp("Opera (\\d+.\\d+)");
      //使用正则表达式的test方法测试并将版本号保存在RegExp.$1中
      reOperaVersion.test(sUserAgent);
      _broswer.version = parseFloat(RegExp["$1"]);
    }
    _broswer.opera = true;
    _broswer.name = "opera";
  }
  var isChrome = sUserAgent.indexOf("Chrome") > -1;
  if (isChrome) {
    var reChorme = new RegExp("Chrome/(\\d+\\.\\d+(?:\\.\\d+\\.\\d+))?");
    reChorme.test(sUserAgent);
    _broswer.version = parseFloat(RegExp["$1"]);
    _broswer.chrome = true;
    _broswer.name = "chrome";
  }
  //排除Chrome信息，因为在Chrome的user-agent字符串中会出现Konqueror/Safari的关键字
  var isKHTML =
    (sUserAgent.indexOf("KHTML") > -1 ||
      sUserAgent.indexOf("Konqueror") > -1 ||
      sUserAgent.indexOf("AppleWebKit") > -1) &&
    !isChrome;
  if (isKHTML) {
    //判断是否基于KHTML，如果时的话在继续判断属于何种KHTML浏览器
    var isSafari = sUserAgent.indexOf("AppleWebKit") > -1;
    var isKonq = sUserAgent.indexOf("Konqueror") > -1;
    if (isSafari) {
      var reAppleWebKit = new RegExp("Version/(\\d+(?:\\.\\d*)?)");
      reAppleWebKit.test(sUserAgent);
      var fAppleWebKitVersion = parseFloat(RegExp["$1"]);
      _broswer.version = parseFloat(RegExp["$1"]);
      _broswer.safari = true;
      _broswer.name = "safari";
    } else if (isKonq) {
      var reKong = new RegExp("Konqueror/(\\d+(?:\\.\\d+(?\\.\\d)?)?)");
      reKong.test(sUserAgent);
      _broswer.version = parseFloat(RegExp["$1"]);
      _broswer.konqueror = true;
      _broswer.name = "konqueror";
    }
  }
  // !isOpera 避免是由Opera伪装成的IE
  var isIE =
    sUserAgent.indexOf("compatible") > -1 &&
    sUserAgent.indexOf("MSIE") > -1 &&
    !isOpera;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(sUserAgent);
    _broswer.version = parseFloat(RegExp["$1"]);
    _broswer.msie = true;
    _broswer.name = "msie";
  }
  // 排除Chrome 及 Konqueror/Safari 的伪装
  var isMoz = sUserAgent.indexOf("Gecko") > -1 && !isChrome && !isKHTML;
  if (isMoz) {
    var reMoz = new RegExp("rv:(\\d+\\.\\d+(?:\\.\\d+)?)");
    reMoz.test(sUserAgent);
    _broswer.version = parseFloat(RegExp["$1"]);
    _broswer.mozilla = true;
    _broswer.name = "mozilla";
  }
  return _broswer;
};

export const handleSign = function(signObj) {
  let keys = _.keys(signObj);

  if (keys.length == 0) {
    console.log("sign不能为空对象");
    return;
  } else if (keys.length >= 2) {
    console.log("sign只能为包含一个key的对象");
    return;
  }

  let addStr, obj;

  addStr = keys[0];
  obj = signObj[addStr];
  for (let i in obj) {
    if (obj[i] === "") {
      //参数值为0不处理
      addStr += i + "0000";
    } else {
      addStr += i + obj[i];
    }
  }
  console.log(addStr);
  return addStr;
};
