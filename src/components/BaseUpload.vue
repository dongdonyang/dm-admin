<template>
  <div class="base-upload">
    <!--    照片-->
    <div class="base-upload-pic">
      <div v-for="(item, index) in fileList" :key="index">
        <img width="100" height="100" :src="item" />
        <Icon @click="deletePic(index)" type="ios-trash" />
      </div>
    </div>

    <!--    上传-->
    <Upload
      v-show="fileList.length < maxSize"
      :before-upload="action"
      :multiple="multiple"
      accept=".jpg,.jpeg,.png"
      :format="['jpg', 'jpeg', 'png']"
      action="https://devup.my-best-home.cn:10443/upload"
    >
      <Button icon="ios-cloud-upload-outline">上传图片</Button>
    </Upload>
  </div>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/17/15:02
 */
export default {
  name: "BaseUpload",
  props: {
    list: Array,
    maxSize: {
      type: Number,
      default: 1
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    // 编辑
    list: function(value) {
      if (value[0]) {
        this.fileList = this.list;
      }
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    action(event) {
      let arr = event.name.split(".");
      let type = arr.slice(-1);
      let arrs = ["jpg", "jpeg", "png"];
      let a = arrs.indexOf(type[0]);
      if (a < 0) {
        this.$Message.error("文件格式不正确");
        return false;
      }
      let data = new FormData();
      data.append("file", event);
      axios
        .post("upload", data, {
          baseURL: "https://devup.my-best-home.cn:10443/" // todo 此处url需要跟着环境变化
          // baseURL: "https://up.my-best-home.cn:10443/" // todo 此处url需要跟着环境变化
        })
        .then(res => {
          console.log("res", res);
          if (res.success) {
            this.fileList.push(`${res.data.domain}${res.data.path}`);
            this.$emit("change", this.fileList);
          }
        });

      // 取消默认上传
      return false;
    },
    deletePic(index) {
      this.fileList.splice(index, 1);
      this.$emit("change", this.fileList);
    }
  }
};
</script>

<style scoped lang="scss">
.base-upload {
  &-pic {
    & > div {
      margin: 0 6px;
      position: relative;
      display: inline-block;
      i {
        font-size: 20px;
        position: absolute;
        top: 4px;
        right: 4px;
        color: #fff;
        display: none;
      }
      &:hover {
        i {
          display: block;
        }
      }
    }
  }
}
</style>
