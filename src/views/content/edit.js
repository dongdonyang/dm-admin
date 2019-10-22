// 编辑、新增class类
import API from "../../http/api";
import { Message } from "iview";

export default class edit {
  constructor(path = "", router = {}) {
    this.router = router;
    init(this, path);
  }

  // 编辑时拉取详情
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

  //    提交
  submit() {
    this.hasBeforeSubmit && this.beforeSubmit(); // 提交前
    let value = {};
    value[this.addKey] = JSON.stringify(this.form);
    axios.post(API[this.addURL], value).then(res => {
      if (res.success) {
        this.router.back();
        Message.success("添加成功");
      }
    });
  }

  // 更新
  edit() {
    let value = {};
    value[this.editKey] = JSON.stringify(this.form);
    axios.post(API[this.editURL], value).then(res => {
      if (res.success) {
        this.router.back();
        Message.success("更新成功");
      }
    });
  }
}

// 私有方法
function init(that, path) {
  let config = require(`./obj_${path}`); // 取值
  Object.assign(that, config.ADD_CONFIG); // 合并
}
