# doly-admin-template

基于 [doly-cli](https://github.com/doly-dev/doly-cli#readme) 开发的管理平台脚手架。

## 目录结构

```
├── mocker                   # mock数据
├── public
│   ├── favicon.png          # Favicon
├── src
│   ├── assets               # 静态资源，如图片、样式、字体等
│   ├── components           # 组件
│   ├── layouts              # 布局
│   ├── models               # 数据模型
│   ├── pages                # 页面
│   ├── services             # 后台接口服务
│   ├── utils                # 工具
│   ├── app.js               # 入口 JS
│   ├── router.config.js     # 路由配置
│   ├── document.ejs         # html页面
├── doly.config.js           # doly 配置
├── package.json
├── README.md

```

## 本地开发

> 本地环境需安装 [node](http://nodejs.org/) 和 [git](https://git-scm.com/)

`git clone` 项目，进入项目文件

### 安装依赖

```shell
npm install 
```

> 如果网络状况不佳，可以使用 [cnpm](https://cnpmjs.org/) 进行加速。

### 运行

```shell
npm start
```

or 

```shell
# 不使用mock数据
npm run start:no-mock
```

> 启动完成后会自动打开浏览器访问 [http://localhost:9000](http://localhost:9000)

### 打包

```shell
npm run build
```

如果需要自定义，比如指定 `dist` 或 静态资源输出文件路径等，可以通过 `doly.config.js` 进行配置，可参照：[doly 配置](https://github.com/doly-dev/doly-cli#%E9%85%8D%E7%BD%AE)。


## 路由、菜单、权限

主要涉及以下几个模块/功能：

- `路由管理` 通过约定的语法根据在 `router.config.js` 中配置路由。
- `菜单生成` 根据路由配置来生成菜单。菜单项名称，嵌套路径与路由高度耦合。
- `面包屑` 组件 `PageHeaderWrapper` 中内置的面包屑，也可通过 `RouteContext` 提供的信息自定义生成。
- `权限` 在用户登录后，将权限更新到 `utils/authorited` 模块，会自动应用到路由和菜单。

### 路由配置

路由外层有两种布局嵌套，分别为：`BasicLayout` 和 `BlankLayout` 。

- `BasicLayout` 包含头部、侧边菜单、面包屑，一般用于登录后的内容页面展示。
- `BlankLayout` 一般用于登录、忘记密码、首次登录修改密码等无需菜单、面包屑的页面。

目前脚手架中所有的路由都通过 `router.config.js` 配置，其中一些参数，如 `name` `icon` `hideInMenu` `authority` `routes`，是用来辅助生成菜单。其中：

- `name` 和 `icon` 分别代表生成菜单项的文本和图标。
- `hideInMenu` 在菜单中不展示这个路由/子路由。
- `authority` 用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示。

## 动态主题

### 明暗风格

支持 `明/暗` 两种风格，可通过 `aap.js` 中的变量 `dolyLayout.theme` 进行配置。

### antd 主题切换

支持在 `doly` 的配置文件 `doly.config.js` 中的设置 `theme`，支持对象或文件路径：

```javascript
theme: {
  "primary-color": "red" // 设置主色调
}
```

或者一个 `js` 文件：

```
theme: "./theme.js"
```

可参照 [antd定制主题](https://ant.design/docs/react/customize-theme-cn#%E5%9C%A8-Umi-%E9%87%8C%E9%85%8D%E7%BD%AE%E4%B8%BB%E9%A2%98)

## 环境变量

在 `doly` 配置文件 `doly.config.js` 中 `define` 。

通过 `webpack` 的 `DefinePlugin` 传递给代码，值会自动做 `JSON.stringify` 处理。例如，

开发环境下：

```javascript
define: {
  DEV: true,
  APPURL: ""
}
```

生产环境下：

```javascript
env: {
  define: {
    DEV: false,
    APPURL: "https://example.com/api"
  }
}
```

关于 `doly` 不同环境配置，请参照：[doly配置](https://github.com/doly-dev/doly-cli#%E4%B8%8D%E5%90%8C%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE)


