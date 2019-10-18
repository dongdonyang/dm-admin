<template>
  <div>
    <div>
      <img width="100" height="100" v-for="(item, index) in fileList" :key="index" :src="item" />
    </div>
    <Upload
      :before-upload="action"
      action="https://devup.my-best-home.cn:10443/upload"
    >
      <Button icon="ios-cloud-upload-outline">上传文件</Button>
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
  data() {
    return {
      fileList: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    action(event) {
      let data = new FormData();
      data.append("file", event);
      axios
        .post("upload", data, {
          baseURL: "https://devup.my-best-home.cn:10443/"
        })
        .then(res => {
          console.log("res", res);
          if (res.success) {
            this.fileList.push(`${res.data.domain}${res.data.path}`);
            this.$emit("change",this.fileList)
          }
        });

      // 取消默认上传
      return false;
    }
  }
};
</script>

<style scoped></style>
