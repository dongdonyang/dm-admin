<template>
  <div>
    <div class="page">
      <p class="title">材质分类管理</p>
    </div>
    <div style="width:500px">
      <!-- 分类树 -->
      <Tree :data="dataList" :render="renderContent"></Tree>
    </div>
    <Modal
      v-model="model1"
      :title="
        `新增分类 > 当前父级分类： ${
          selectData.name ? selectData.name : '材质分类'
        }`
      "
      @on-ok="addClassify"
    >
      <Form :model="formData" :ref="formData" :label-width="80">
        <FormItem label="分类名称:">
          <Input placeholder="请输入分类名称" v-model="classifyName"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal
      v-model="model2"
      :title="
        `修改分类 > 当前父级分类： ${
          selectData.name ? selectData.name : '成品分类'
        }`
      "
      @on-ok="updataClassify"
    >
      <Form :model="formData" :ref="formData" :label-width="80">
        <FormItem label="分类名称:">
          <Input placeholder="请输入分类名称" v-model="classifyName"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/17/17:11
 */
export default {
  name: "Classify",
  data() {
    return {
      classifyName: "",
      selectData: {},
      formData: {
        name: "",
        preCode: "",
        classify: "type1",
        iconUrl: ""
      },
      // classifyType: true,
      model2: false,
      model1: false,
      dataList: [
        {
          title: "材质分类",
          code: "000000",
          level: 0,
          expand: true,
          render: (h, { root, node, data }) => {
            return h(
              "span",
              {
                style: {
                  display: "inline-block",
                  width: "100%"
                }
              },
              [
                h("span", [h("span", data.title)]),
                h(
                  "span",
                  {
                    style: {
                      display: "inline-block",
                      float: "right",
                      marginRight: "32px"
                    }
                  },
                  [
                    h("Button", {
                      props: Object.assign({}, this.buttonProps, {
                        icon: "md-add",
                        type: "primary"
                      }),
                      attrs: {
                        title: "新增"
                      },
                      style: {
                        width: "74px"
                      },
                      on: {
                        click: () => {
                          this.append(data);
                        }
                      }
                    })
                  ]
                )
              ]
            );
          },
          children: []
        }
      ],
      buttonProps: {
        type: "default",
        size: "small"
      },
      levelLimit: 3
    };
  },
  methods: {
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "100%"
          }
        },
        [
          h("span", [
            // h('Icon', {
            //     props: {
            //         type: 'ios-paper-outline'
            //     },
            //     style: {
            //         marginRight: '8px'
            //     }
            // }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                float: "right",
                marginRight: "32px"
              }
            },
            [
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "md-add",
                  disabled: data.level >= this.levelLimit
                }),
                style: {
                  marginRight: "8px"
                },
                attrs: {
                  title: "新增"
                },
                on: {
                  click: () => {
                    this.append(data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "md-remove"
                }),
                attrs: {
                  title: "删除"
                },
                style: {
                  marginRight: "8px"
                },
                on: {
                  click: () => {
                    this.remove(root, node, data);
                  }
                }
              }),
              h("Button", {
                props: Object.assign({}, this.buttonProps, {
                  icon: "md-reorder"
                }),
                attrs: {
                  title: "编辑"
                },
                on: {
                  click: () => {
                    this.updata(data);
                    // this.editFn(root, node, data);
                    // this.remove(root, node, data)
                  }
                }
              })
            ]
          )
        ]
      );
    },
    updata(data) {
      this.selectData = data;
      this.model2 = true;
      // this.classifyType = false;
    },

    append(data) {
      this.selectData = data;
      this.model1 = true;
      // this.classifyType = true;
      // const children = data.children || [];
      // children.push({
      //     title: 'appended node',
      //     expand: true
      // });
      // this.$set(data, 'children', children);
    },

    //删除数据
    remove(root, node, data) {
      var delData = {
        classify: data.classify,
        code: data.code,
        force: false
      };
      this.$Modal.confirm({
        title: "确认？",
        content:
          "<p>" +
          `确认删除 [ ${data.name} ] 分类及下属所有子分类，且无法恢复？` +
          "</p>",
        onOk: () => {
          this.axios({
            method: "post",
            url: "/catalog//classify/delete",
            data: delData
          }).then(res => {
            if (res.code === 1001) {
              this.$Message.success(res.msg);
              // const parentKey = root.find(el => el === node).parent;
              // const parent = root.find(el => el.nodeKey === parentKey).node;
              // const index = parent.children.indexOf(data);
              // // console.log(parent.children)
              // parent.children.splice(index, 1);
              this.getList();
            } else if (res.data.code === 1002) {
              var data = res.data.data;
              data.force = true;
              this.axios({
                method: "post",
                url: "/catalog//classify/delete",
                data
              }).then(res => {
                this.$Message.success(res.msg);
                // const parentKey = root.find(el => el === node).parent;
                // const parent = root.find(el => el.nodeKey === parentKey).node;
                // const index = parent.children.indexOf(data);
                // // console.log(parent.children)
                // parent.children.splice(index, 1);
                this.getList();
              });
            }
          });
        }
      });
    },

    addClassify() {
      var data = {
        classify:
          this.selectData.classify || this.selectData.children[0].classify,
        parentCode: this.selectData.code,
        name: this.classifyName
      };
      this.classifyName = "";
      this.axios({
        method: "post",
        url: "/catalog/classify/add/",
        data
      }).then(res => {
        console.log(res);
        if (res.code === 1001) {
          this.$Message.success(res.msg);
          this.getList();
        }
      });
    },
    updataClassify() {
      var data = {
        classify: this.selectData.classify,
        newName: this.classifyName,
        code: this.selectData.code
      };
      this.classifyName = "";
      this.axios({
        method: "post",
        url: "/catalog//classify/update",
        data
      }).then(res => {
        if (res.code === 1001) {
          this.$Message.success(res.msg);
          this.getList();
        }
      });
    },
    //获取全部列表
    getList() {
      var data = {
        classify: 5
      };
      this.axios({
        url: "/catalog/classify/all_level",
        method: "post",
        data
      }).then(res => {
        var resdata = res.data.list;
        var result = this.handleDataList(resdata);
        this.dataList[0].children = result;
      });
    },
    handleDataList(data, level = 1) {
      if (data.length == 0) {
        return;
      }
      // for(var i=0;i<data.length;i++){
      //     data[i].title = data[i].name;
      //     data[i].level = data[i].level;
      //     console.log(data[i].subs.length)
      //     data[i].subs.length!=0?this.handleDataList(data[i].subs,level+1):""
      // }
      data.forEach((item, index) => {
        item.title = item.name;
        item.level = level;
        if (item.subs != null) {
          if (item.subs.length != 0) {
            item.children = this.handleDataList(item.subs, level + 1);
          }
        }
      });
      return data;
    }
  },
  created() {
    this.getList();
  },
  mounted() {}
};
</script>
<style lang="scss">
.ivu-tree ul {
  li {
    span {
      margin-left: 5px;
    }
  }
}
.ivu-form-item-content {
  display: flex;
}
// .ivu-form .ivu-form-item-label:before {
//     content: '*';
//     display: inline-block;
//     margin-right: 4px;
//     line-height: 1;
//     font-family: SimSun;
//     font-size: 12px;
//     color: #ed4014;
// }
</style>
<style lang="scss" scoped>
p {
  margin: 0;
}
.page {
  margin: 30px;

  .title {
    height: 56px;
  }
}
</style>
