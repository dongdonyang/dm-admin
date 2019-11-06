<template>
  <row type="flex" justify="space-between" style="width: 347px;">
    <Input
      style="width: 100%"
      placeholder="选择文件后获取"
      disabled
      v-model="value"
    ></Input>
    <Upload
      ref="upload"
      style="width: 100%; margin-top: 5px"
      :show-upload-list="showList"
      :before-upload="action"
      :accept="`.${fileType}`"
      :on-success="afterSuccess"
      action="https://up.my-best-home.cn:10443/upload"
    >
      <Button>选择文件</Button>
    </Upload>
  </row>
</template>

<script>
/**
 * 作者：杨东
 * 时间：2019/10/22/16:33
 */
export default {
  name: "BaseFiles",
  props: {
    file: "",
    fileType: {
      type: String,
      default: "pak"
    }
  },
  data() {
    return {
      baseFile: "",
      value: "",
      showList: true
    };
  },
  watch: {
    file: function(val) {
      if (val) {
        this.value = val;
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    action(event) {
      let arr = event.name.split(".");
      let type = arr.slice(-1);
      if (type[0] !== this.fileType) {
        this.$Message.error("文件格式不正确");
        return false;
      }
      this.showList = true;
      this.$refs.upload.clearFiles();
      // let data = new FormData();
      // data.append("file", event);
      // axios
      //   .post("upload", data, {
      //     // baseURL: "https://devup.my-best-home.cn:10443/" // todo 此处url需要跟着环境变化
      //     baseURL: "https://up.my-best-home.cn:10443/" // todo 此处url需要跟着环境变化
      //   })
      //   .then(res => {
      //     console.log("res", res);
      //     if (res.success) {
      //       this.value = `${res.data.domain}${res.data.path}`;
      //       this.$emit("change", this.value);
      //     }
      //   });
      //
      // // 取消默认上传
      // return false;
    },
    afterSuccess(res) {
      // if (this.baseFile) {
      //   this.deleteFile(this.baseFile);
      // }
      this.baseFile = res.data.path;
      this.showList = false;
      this.value = `${res.data.domain}${res.data.path}`;
      this.$emit("change", this.value);
    },
    //  删除文件
    deleteFile(file) {
      let path = `http://devup.my-best-home.cn:18080/deleteOneFile?fileName=${file}`;
      this.axios({
        url: path,
        method: "post"
      }).then(() => {});
    }
  }
};
</script>

<style scoped></style>
