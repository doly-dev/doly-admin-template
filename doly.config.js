const path = require("path");

module.exports = {
  html: {
    title: "Doly Simple Template",
    template: "src/document.ejs",
    filename: "index.html"
  },

  // 别名
  alias: {
    "~": path.join(__dirname, "./src")
  },

  // 定义编译时变量替换
  define: {
    // api 地址
    API_URL: "",
    DEV: true
  },

  // 不同环境配置
  env: {
    // 生产环境
    production: {
      publicPath: "./",
      define: {
        API_URL: ""
      }
    }
  }
};
