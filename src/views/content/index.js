/**
 * 常用方法有：1、查询 2、分页 3、查看 4、编辑 5、删除 6、新增 7、筛选
 * todo 待处理问题 1、权限判断怎么加、加在什么位置。2、所有的配置文件是写成对象还是class合适、配置文件之间的共同点和不同点、共同点多就写成class
 * */
import API from "../../http/api";
import { Message } from "iview";

export default class Content {
  tableData = Array;
  currentPage = Number;
  pageSize = Number;
  totalSize = Number;
  path = String;
  loding = false;

  constructor(roles = [], currentRouter = {}) {
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalSize = 0;
    this.tableData = [];
    this.loding = false;
    this.path = "";
    this.init(currentRouter);
  }
  /**
   * @fileOverview todo 查询当前页面的配置对象信息
   * @param router 当前页面的路由
   * @property {LIST_CONFIG} 当前页面的配置对象
   * */
  init(router) {
    // 根据路由名匹配配置文件路径 todo 为什么只能替换第一次出现的大写字母
    let path = router.name.replace(/[A-Z]/, function(val) {
      return `_${val.toLocaleLowerCase()}`;
    });
    console.log(path);
    // 若指定了配置对象，则读取指定路径、则不会读取当前路由名称
    if (router.meta.path) {
      this.meta = router.meta;
      path = router.meta.path;
    }
    this.path = path;
    try {
      let config = require(`./obj_${path}`); // 取值
      Object.assign(this, config.LIST_CONFIG); // 合并
      //用户管理处区分
      if (router.meta.path) {
        config.USER_CONFIG.call(this);
      }
    } catch (e) {
      alert("未找到当前页面配置文件", e);
    }
  }
  // todo 下列方法都可以在各自的对象中复写，重新定义同名方法即可覆盖
  // todo 建议优化一下命名规则，方便阅读，统一风格、便于区分
  /**
   * @fileOverview todo table列表的查询
   * @property {listURL} 查询的api地址，todo 建议改成【***API】
   * @property {searchKey} 查询参数的key
   * @property {searchInfo} 查询参数的值
   * @property {listKey} 查询完毕后需要给table赋值的key
   * */
  getList() {
    if (!this.listURL) return;
    let value = {
      pageNum: this.currentPage,
      pageSize: this.pageSize
    };
    value[this.searchKey] = JSON.stringify(this.searchInfo);
    this.loding = true;
    axios
      .post(API[this.listURL], value)
      .then(res => {
        this.loding = false;
        if (res.success) {
          this.totalSize = res.data.count;
          this.tableData = res.data[this.listKey];
        }
      })
      .catch(() => {
        this.loding = false;
      });
  }
  /**
   * @fileOverview todo 跳转到新增页面
   * @property {addRoute} 新增页面名称 todo 建议改成【***URL】
   * @property {path} 新增页面需要读取的配置文件地址，实例化对象 todo 改变一下传参方式，这种方式不安全
   * */
  addRow() {
    this.$router.push({
      name: this.addRoute,
      query: {
        path: this.path,
        meta: JSON.stringify(this.meta)
      }
    });
  }
  /**
   * @fileOverview todo 当前列详情
   * @param row 当前列对象
   * @property {detailRoute} 详情页面路由 todo 建议改成***URL方便阅读
   * @property {detailKey} 给详情页面传的参数 todo 名字建议改的语意化一点
   * */
  detailRow(row) {
    this.$router.push({
      name: this.detailRoute,
      query: {
        path: this.path,
        id: row[this.detailKey],
        status: this.searchInfo ? this.searchInfo.status : "" // todo 户型任务完成阶段时候需要展示额外数据
      }
    });
  }
  /**
   * @fileOverview todo 删除当前列
   * @param row 当前列对象
   * @property {deleteKey} 删除的key
   * @property {deleteValue} 删除的值
   * @property {deleteURL} 删除接口的URl // todo 建议改成【***API】方便阅读
   * */
  deleteRow(row) {
    let value = {};
    value[this.deleteKey] = row[this.deleteValue];
    axios.post(API[this.deleteURL], value).then(res => {
      if (res.success) {
        Message.success("删除成功");
        this.currentPage = 1;
        this.getList();
      }
    });
  }
  /**
   * @fileOverview todo 编辑当前行
   * @param row 当前行对象
   * @property {addRoute} 编辑路径，todo 因为和add是同一个，故名字上没有区分，建议把add和edit改成动态传参
   * @property {detailId} 查询需要的数值，有些是sn
   * */
  editRow(row) {
    this.$router.push({
      name: this.addRoute,
      query: {
        path: this.path,
        id: row[this.detailId] || row.id,
        status: this.searchInfo ? this.searchInfo.status : "" // todo 户型任务完成阶段时候需要展示额外数据
      }
    });
  }
  //  关键字查询
  searchByKey() {}
  /**
   * @fileOverview todo 分页查询
   * @param val 跳转到哪一页面
   * */
  pageChange(val = 1) {
    this.currentPage = val;
    this.getList();
  }
}
//定义只能改类使用的方法 ,私有方法
function demo() {}
