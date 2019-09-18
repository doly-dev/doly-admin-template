import React from "react";

export default function() {
  return (
    <div>
      <h2>Home Page</h2>
      <p>
        适用于开发简单web项目，构建工具使用
        <a href="https://github.com/doly-dev/doly-cli#readme">doly-cli</a>
      </p>
      <p>如果要制定自己的业务脚手架，可以基于它进行修改。</p>
      <h3>目录结构</h3>
      <pre>
        {`├── mocker                   # mock数据
├── public
│   ├── favicon.png          # Favicon
├── src
│   ├── assets               # 静态资源，如图片、样式、字体等
│   ├── components           # 组件
│   ├── pages                # 页面
│   ├── services             # 后台接口服务
│   ├── utils                # 工具
│   ├── app.js               # 入口 JS
│   ├── router.config.js     # 路由配置
│   ├── index.html           # html页面
├── doly.config.js           # doly 配置
├── package.json
├── README.md`}
      </pre>
      <h3>本地运行</h3>
      <pre>{`$ npm start`}</pre>
      <p>或不使用mock数据</p>
      <pre>{`$ npm run start:no-mock`}</pre>
      <h3>打包</h3>
      <pre>{`$ npm run build`}</pre>
    </div>
  );
}
