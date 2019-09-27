module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  // 配置全局，只要是防止通过CDN方式引入的方式，显示未定义，非必须配置，能正常启动项目
  globals: {
    httpUrl: "readonly",
    _: "readonly",
    Base64: "readonly",
    Vue: "readonly",
    VueRouter: "readonly",
    Qiniu: "readonly",
    axios: "readonly",
    plupload: "readonly"
  }
};
