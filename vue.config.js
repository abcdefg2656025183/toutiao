const path = require('path')

// 自定义主题的文件路径
const coverPath = path.join(__dirname, './src/cover.less')

module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 直接覆盖变量，注意：变量名之前不需要加 @ 符号
          // NavBar
          // "nav-bar-height": "46px",
          // "nav-bar-background-color": "#007bff",
          // "nav-bar-title-font-size": "14px",
          // "nav-bar-title-text-color": "white",
          hack: `true; @import "${coverPath}";`
        }
      }
    }
  }
}
