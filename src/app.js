import "~/utils/polyfill";

import React from "react";
import ReactDom from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { syncHistory } from "router-store";
import { isLogin } from "~/utils/login";
import BasicLayout from "~/layouts/BasicLayout";
import BlankLayout from "~/layouts/BlankLayout";
import routerConfig from "~/router.config";

import piclogo from "~/assets/images/logo@2x.png";

// // 用于示例演示
// window.sessionStorage.setItem('__login_info__', JSON.stringify({
//   username: "guest",
//   token: "guest12343",
//   currentAuthority: ["user"]
// }));

// layout config
const layoutConfig = {
  logo: piclogo,
  title: "Doly Admin"
};

// 同步history
const history = syncHistory();

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Router history={history}>
        <Switch>
          <Route
            path="/user"
            render={props => (
              <BlankLayout
                routes={routerConfig.blank}
                {...layoutConfig}
                {...props}
              />
            )}
          />
          <Route
            path="/"
            render={props =>
              // 这里如果和login页面同时使用 hook，可能存在函数闭包缓存问题。
              // 如果使用context也行，但用处不大。
              // 在登录页面完成登录和权限获取
              isLogin() ? (
                <BasicLayout
                  routes={routerConfig.basic}
                  {...layoutConfig}
                  {...props}
                />
              ) : (
                <Redirect to="/user" />
              )
            }
          />
        </Switch>
      </Router>
    </ConfigProvider>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
