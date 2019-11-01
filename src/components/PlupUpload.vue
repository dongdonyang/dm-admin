<template>
  <div class="custom-upload-content">
    <Button
      :disabled="disabled"
      :id="`CustomUpload${idIndex}`"
      class="custom-btn-upload"
      :class="className"
      :type="btnType"
      ref="uploadBtn"
      >{{ showBtnText }}</Button
    >
    <p v-if="showProgress && isProgress" class="info">
      总大小：{{ totalSize + "mb" }}，进度：{{ progress + "%" }}
    </p>
  </div>
</template>
<script>
export default {
  name: "PlupUpload",
  data() {
    return {
      uploader: "", // 上传的实例
      idIndex: "", // 根据时间戳加随机数生成

      disabled: false,

      totalSize: 0,
      progress: 0,

      isProgress: false
    };
  },

  props: {
    className: {
      type: String,
      default: ""
    },
    limitSize: {
      type: Number,
      default: 10
    },
    format: {
      type: String,
      default: "jpg,gif,png"
    },
    showProgress: {
      type: Boolean,
      default: true
    },
    showCancel: {
      type: Boolean,
      default: false
    },
    showPause: {
      type: Boolean,
      default: false
    },
    btnText: {
      type: String,
      default: "选择文件"
    },
    multi: {
      type: Boolean,
      default: false
    },
    chunk: {
      type: Boolean,
      default: false
    },
    duplicate: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showBtnText: function() {
      return this.btnText;
    }
  },
  methods: {
    /**
     * [uploadInit 实例化上传组件]
     * @Author   lizhiming
     * @DateTime 2018-12-19
     * @return   {[type]}   [description]
     */
    uploadInit() {
      let that = this;
      this.uploader = new plupload.Uploader({
        // headers: {
        //   'Content-Type': 'application/json; charset=utf-8'
        // },
        runtimes: "html5,flash,html4", // 文件上传方式的优先级，一次递减
        browse_button: `CustomUpload${that.idIndex}`,
        multi_selection: that.multi,
        url: that.$uploadfileUrl + "/upload",
        // url: 'https://devup.my-best-home.cn:18080/upload',
        flash_swf_url: "../../../static/js/upload/Moxie.swf",
        chunk_size: `${!this.chunk ? 0 : "3mb"}`,
        max_retries: 3, // 遇到错误重新尝试上传的次数
        unique_names: true,
        filters: {
          max_file_size: `${that.limitSize}mb`,
          mime_types: [{ title: "Format files", extensions: that.format }],
          prevent_duplicates: that.duplicate // 是否允许选取重复文件
        },
        init: {
          PostInit: function() {
            console.log(`upload init for id is CustomUpload${that.idIndex}`);
          },
          // 错误事件
          Error: function(up, args) {
            that.uploader.disableBrowse(false);
            that.disabled = false;
            switch (args.code) {
              case -600: // 文件大小超出限制
                that.$emit(
                  "on-error",
                  {
                    type: "limitSizeError",
                    msg: "文件大小超出限制",
                    data: `${that.limitSize}mb`
                  },
                  that
                );
                break;
              case -601: // 文件格式超出限制
                that.$emit(
                  "on-error",
                  {
                    type: "limitFormatError",
                    msg: "文件格式错误",
                    data: that.format
                  },
                  that
                );
                break;
              case -602: // 不允许有重复文件时选取了重复的文件
                that.$emit(
                  "on-error",
                  {
                    type: "duplicateFileError",
                    msg: "不允许选择重复文件"
                  },
                  that
                );
                break;
              default:
                // statements_def
                break;
            }
          },

          BeforeUpload: function(up, file) {
            that.totalSize = (file.size / 1024 / 1024).toFixed(2);
          },
          FilesAdded: function(up, files) {
            that.uploader.disableBrowse(true);
            that.disabled = true;
            that.uploader.start();
          },
          UploadProgress: function(up, file) {
            that.progress = file.percent;
            that.isProgress = true;
          },

          UploadComplete: function(up, files) {
            that.uploader.disableBrowse(false);
            that.disabled = false;
            that.isProgress = false;
            that.totalSize = 0;
            that.progress = 0;
          },

          FileUploaded: function(up, file, info) {
            that.uploader.removeFile(file);
            let res = JSON.parse(info.response);
            that.$emit("on-complete", res);
          }
        }
      });

      this.uploader.init();

      if (this.uploader == "") {
        this.uploadInit(); // 如果没有正确实例化，则重新实例化
      }
    }
  },
  watch: {},
  created() {
    this.idIndex = new Date().getTime() + Math.floor(1000 * Math.random());
    this.$nextTick(function() {
      this.uploadInit();
    });
  }
};
</script>
<style lang="less" scoped>
.custom-upload-content {
  position: relative;
}

.custom-btn-upload {
  border-radius: 0;
  border-color: #20b8e2;
  color: #20b8e2;
  background-color: transparent;

  &:hover {
    background-color: #20b8e2;
    color: #fff;
  }

  &[disabled] {
    &:hover {
      color: #20b8e2;
      background-color: transparent;
    }
  }
}

.info {
  position: absolute;
  white-space: nowrap;
}

.pause-btn {
  background: url(data:image/png;base64,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)
    no-repeat;
  background-size: cover;
  overflow: hidden;

  .goon-btn {
  }
}
</style>
