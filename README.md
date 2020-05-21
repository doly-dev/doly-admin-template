# doly-admin-template

基于 [doly-cli](https://github.com/doly-dev/doly-cli#readme) 开发的管理平台脚手架。

文档补充中，敬请期待！

## 目录结构

```
├── mocker                   # mock数据
├── public
│   ├── favicon.png          # Favicon
├── src
│   ├── assets               # 静态资源，如图片、样式、字体等
│   ├── components           # 组件
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



