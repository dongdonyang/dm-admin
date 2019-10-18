/**
 * 常用方法有：1、查询 2、分页 3、查看 4、编辑 5、删除 6、新增 7、筛选
 * */
// import _axios from "../../http/http.js";
import API from "../../http/api";
import { Message } from "iview";

export default class Content {
  tableData = Array;
  currentPage = Number;
  pageSize = Number;
  totalSize = Number;
  path = String;

  constructor(roles = [], currentRouter = {}) {
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalSize = 0;
    this.tableData = [];
    this.path = "";
    this.init(currentRouter);
  }

  // 区别不同的页面不同的数值
  init(router) {
    // 根据路由名匹配配置文件路径 todo 为什么只能替换第一次出现的大写字母
    let path = router.name.replace(/[A-Z]/, function(val) {
      return `_${val.toLocaleLowerCase()}`;
    });
    console.log(path);
    this.path = path;
    try {
      let config = require(`./obj_${path}`); // 取值
      Object.assign(this, config.LIST_CONFIG); // 合并
    } catch (e) {
      alert("未找到当前页面配置文件", e);
    }
  }

  // todo 下列方法都可以在各自的对象中复写
  // 获取table列表
  getList() {
    let value = {
      pageNum: this.currentPage,
      pageSize: this.pageSize
    };
    value[this.searchKey] = JSON.stringify(this.searchInfo);
    axios.post(API[this.listURL], value).then(res => {
      if (res.success) {
        this.totalSize = res.data.count;
        this.tableData = res.data.buildings;
      }
    });
  }

  //新增
  addRow() {
    this.$router.push({
      name: this.addRoute,
      query: {
        path: this.path
      }
    });
  }

  // 查看详情
  detailRow(id) {
    this.$router.push({
      name: this.detailRoute,
      query: {
        path: this.path,
        id: id
      }
    });
  }

  //  删除当前列
  deleteRow(id) {
    axios
      .post(API.BUILDING_DELETE, {
        removeBuildingId: id
      })
      .then(res => {
        if (res.success) {
          Message.success("删除成功");
          this.getList();
        }
      });
  }

  // 编辑当前行
  editRow(id) {
    this.$router.push({
      name: this.addRoute,
      query: {
        path: this.path,
        id: id
      }
    });
  }

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
