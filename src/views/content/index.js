/**
 * 常用方法有：1、查询 2、分页 3、查看 4、编辑 5、删除 6、新增 7、筛选
 * */
// import axios from "../../http/http.js";

export default class Content {
  tableData = Array;
  currentPage = Number;
  totalPage = Number;

  constructor(roles = [], currentRouter = {}) {
    this.currentPage = 1;
    this.totalPage = 0;
    this.tableData = [{}];
    this.init(currentRouter);
  }

  // 区别不同的页面不同的数值
  init(router) {
    // 根据路由名匹配配置文件路径 todo 为什么只能替换第一次出现的大写字母
    let path = router.name.replace(/[A-Z]/, function(val) {
      return `_${val.toLocaleLowerCase()}`;
    });
    console.log(path);
    try {
      let config = require(`./obj_${path}`); // 取值
      Object.assign(this, config.default); // 合并
    } catch (e) {
      alert("未找到当前页面配置文件", e);
    }
  }

  //下列方法都可以在各自的对象中复写
  // 获取table列表
  getList() {
    axios.get();
  }

  //新增
  addRow(){

  }

  // 查看详情
  getDetail() {
    console.log("detail", this);
  }

  //  删除当前列
  deleteRow() {}

  // 编辑当前行
  editRow(){}

  //  关键字查询
  searchByKey() {}

  //  当前也改变
  pageChange(val = 1) {
    this.currentPage = val;
    this.getList();
  }
}

//定义只能改类使用的方法 ,私有方法
function demo() {}
