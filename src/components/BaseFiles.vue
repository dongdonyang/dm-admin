<template>
  <row type="flex" justify="space-between">
    <Input
      style="width: 72%"
      placeholder="选择文件后获取"
      disabled
      v-model="value"
    ></Input>
    <Upload
      :before-upload="action"
      accept=".pak"
      action="https://devup.my-best-home.cn:10443/upload"
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
    file: ""
  },
  data() {
    return {
      value: ""
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
      let data = new FormData();
      data.append("file", event);
      axios
        .post("upload", data, {
          // baseURL: "https://devup.my-best-home.cn:10443/" // todo 此处url需要跟着环境变化
          baseURL: "https://up.my-best-home.cn:10443/" // todo 此处url需要跟着环境变化
        })
        .then(res => {
          console.log("res", res);
          if (res.success) {
            this.value = `${res.data.domain}${res.data.path}`;
            this.$emit("change", this.value);
          }
        });

      // 取消默认上传
      return false;
    },
    handleFormatError (file) {
      debugger;
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      });
    },
  }
};
</script>

<style scoped></style>
