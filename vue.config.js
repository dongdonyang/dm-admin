// vue.config.js
// 设置别名
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  assetsDir: "static", // 静态文件放置位置
  chainWebpack: config => {
    //  todo 设置路径别名、建议不要使用，不然都不知道别名什么意思还要过来看
    config.resolve.alias.set("views", resolve("src/views"));

    // todo 这里是对环境的配置，不同环境对应不同的BASE_URL，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      const argv = process.argv;
      const mode = argv[argv.indexOf("--project-mode") + 1];
      args[0]["process.env"].MODE = `"${mode}"`;
      args[0]["process.env"].BASE_URL = JSON.stringify(process.env.BASE_URL);
      args[0]["process.env"].UPLOAD_URL = JSON.stringify(
        process.env.UPLOAD_URL
      );
      return args;
    });
  },

  // todo 打包忽略，使用CDN来提升访问速度
  configureWebpack: {
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios",
      element: "element"
    }
  },

  //  todo px转rem配置、主要为了兼容笔记本个平板端
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-pxtorem")({
            rootValue: 16, // 换算的基数
            selectorBlackList: [], // 忽略转换正则匹配项
            propList: ["*"]
          })
        ]
      }
    }
  }
};
