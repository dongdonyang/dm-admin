// 编辑、新增class类
import API from "../../http/api";
import { Message } from "iview";

export default class edit {
  constructor(path = "", router = {}) {
    this.router = router;
    init(this, path);
  }
  /**
   * @fileOverview todo 编辑时拉取数据
   * @param id 拉取数据的id
   * @property {detailKey} key，不同api的key不一样
   * @property {detailURL} key，api地址，todo 建议改成【***API】
   * @property {editInfo} 查询完成后的自定义方法，用于特别的需求、可以改成非必须
   * */
  getInfo(id) {
    let value = {};
    value[this.detailKey] = id;
    axios.post(API[this.detailURL], value).then(res => {
      if (res.success) {
        this.form = res.data;
        this.editInfo();
      }
    });
  }
  /**
   * @fileOverview todo 新增数据
   * @property {hasBeforeSubmit} 提交前是否需要做数据预处理
   * @property {beforeSubmit} 预处理方法
   * @property {addKey} key
   * @property {addURL} 新增数据api todo 【***API】
   * */
  submit() {
    this.hasBeforeSubmit && this.beforeSubmit(); // 提交前
    let value = {};
    value[this.addKey] = JSON.stringify(this.form);
    axios.post(API[this.addURL], value).then(res => {
      if (res.success) {
        this.router.back();
        Message.success("添加成功"); // todo 可以改成自定义
      }
    });
  }

/**
 * @fileOverview todo 更新数据
 * @property {editKey} 更新数据的key
 * @property {editURL} 更新数据的api todo 【***API】
 * */
  edit() {
    let value = {};
    value[this.editKey] = JSON.stringify(this.form);
    axios.post(API[this.editURL], value).then(res => {
      if (res.success) {
        this.router.back();
        Message.success("更新成功"); // todo 改成自定义
      }
    });
  }
}
// 私有方法
/**
 * @fileOverview 初始化构造函数时，查询当前页面的配置对象，todo index.js是放在class类中，现在是放在私有方法中，这两种方式的利弊有待考虑
 * @param that 当前实例化对象
 * @param path 配置文件路径，由index生成，然后传过来
 * @property {ADD_CONFIG} 配置文件对象
 * */
function init(that, path) {
  let config = require(`./obj_${path}`); // 取值
  Object.assign(that, config.ADD_CONFIG); // 合并
}
