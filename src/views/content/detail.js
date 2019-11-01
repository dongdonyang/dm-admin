// 详情页面class

import API from "../../http/api";
export default class detail {
  constructor(path = "") {
    init(this, path);
  }
  /**
   * @fileOverview todo 查询当前页面详情
   * @param obj 当前生成class实例，todo 为啥没用this指向，
   * @param id 查询的值
   * @property {searchKey} 查询key ，todo 编辑也要使用查询，能否优化
   * @property {listKey} 查询后的数据对象
   * */
  getInfo(obj, id) {
    let value = {};
    value[obj.searchKey] = id;
    axios.post(API[obj.searchURL], value).then(res => {
      if (res.success) {
        this.form = obj.listKey ? res.data[obj.listKey] : res.data;
      }
    });
  }
}
// 私有方法
/**
 * @fileOverview 初始化构造函数时，查询当前页面的配置对象，todo index.js是放在class类中，现在是放在私有方法中，这两种方式的利弊有待考虑
 * @param that 当前实例化对象
 * @param path 配置文件路径，由index生成，然后传过来
 * @property {DETAIL_CONFIG} 配置文件对象
 * */
function init(that, path) {
  let config = require(`./obj_${path}`); // 取值
  Object.assign(that, config.DETAIL_CONFIG); // 合并
}
