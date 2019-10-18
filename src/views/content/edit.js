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
    axios
      .post(API.BUILDING_DETAIL, {
        buildingId: id
      })
      .then(res => {
        if (res.success) {
          this.form = res.data;
          this.editInfo();
        }
      });
  }

  //    提交
  submit() {
    console.log(this.form);
    axios
      .post(API[this.addURL], {
        buildingInfo: JSON.stringify(this.form)
      })
      .then(res => {
        if (res.success) {
          this.router.back();
          Message.success("添加成功");
        }
      });
  }

  // 更新
  edit() {
    axios
      .post(API[this.editURL], {
        newInfo: JSON.stringify(this.form)
      })
      .then(res => {
        if (res.success) {
          this.router.back();
          Message.success("更新成功");
        }
      });
  }
}
function init(that, path) {
  let config = require(`./obj_${path}`); // 取值
  Object.assign(that, config.ADD_CONFIG); // 合并
}
