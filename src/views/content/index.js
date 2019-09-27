/**
 * 常用方法有：1、查询 2、分页 3、查看 4、编辑 5、删除 6、新增 7、筛选
 * */
import axios from "../../http/http.js";
export default class Content {
  tableData = Array;
  currentPage = Number;
  totalPage = Number;

  constructor(roles = [], currentRouter = {}) {
    this.currentPage = 1;
    this.tableData = [];
    this.init(currentRouter);
  }

  // 区别不同的页面不同的数值
  init(router) {
    let config = {};
    // config = require(`./${router.name}`); // 取值
    import(`./${router.name}`)
      .then(module => {
        debugger;
        config = module.default;
      })
      .catch(e => {
        alert("未找到当前页面配置文件", e);
      });
    Object.assign(this, config.default); // 合并
    console.log("配置信息：", config.default);
  }

  // 获取table列表
  getList() {
    axios.get();
  }

  // 查看详情
  getDetail() {
    console.log("detail");
  }

  //  删除当前列
  delete() {}

  //  关键字查询
  searchByKey() {}

  //  当前也改变
  pageChange(val = 1) {
    this.currentPage = val;
    this.getList();
  }
}

//定义只能改类使用的方法
function demo() {}
