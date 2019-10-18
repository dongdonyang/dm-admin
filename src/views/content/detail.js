import API from "../../http/api";
export default class detail {
  constructor(path = "") {
    init(this, path);
  }
  getInfo(obj, id) {
    let value = {};
    value[obj.searchKey] = id;
    axios.post(API[obj.searchURL], value).then(res => {
      if (res.success) {
        this.form = res.data;
        console.log(this);
      }
    });
  }
}
function init(that, path) {
  let config = require(`./obj_${path}`); // 取值
  Object.assign(that, config.DETAIL_CONFIG); // 合并
}
