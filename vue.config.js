// vue.config.js
// 设置别名
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
let Version = new Date().getTime();
module.exports = {
  assetsDir: "static",
  // output: {
  //   path: config.build.assetsRoot,
  //   filename: utils.assetsPath("js/[name].[chunkhash]." + Version + ".js"),
  //   chunkFilename: utils.assetsPath("js/[id].[chunkhash]." + Version + ".js")
  // },
  chainWebpack: config => {
    //  todo 设置路径别名
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

  configureWebpack: {
    // todo 添加版本号、防止缓存
    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      // assetsRoot: path.resolve(__dirname, "../dist"),
      // assetsSubDirectory: "static",
      // assetsPublicPath: "/",
      // path: "./dist/js",
      filename: `[name]${Version}.js`,
      chunkFilename: `[name]${Version}.js`
    },
    // todo 打包忽略，使用CDN来提升访问速度
    externals: {
      vue: "Vue",
      "vue-router": "VueRouter",
      axios: "axios",
      element: "element"
    }
  },

  //  todo px转rem配置
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
