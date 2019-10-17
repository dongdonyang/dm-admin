import API from "../../http/api";
export default class detail {
  constructor(path = "") {
    init(this, path);
  }
  getInfo(id) {
    axios
      .post(API.BUILDING_DETAIL, {
        buildingId: id
      })
      .then(res => {
        if (res.success) {
          this.form = res.data;
          console.log(this.form);
        }
      });
  }
}
function init(that, path) {
  let config = require(`./obj_${path}`); // 取值
  Object.assign(that, config.detailConfig); // 合并
}
