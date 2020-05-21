import "mobx-react-lite/batchingForReactDom";
import React from "react";
import ReactDom from "react-dom";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { syncHistory } from "router-store";
import { HelmetProvider } from "react-helmet-async";
import { observer } from "mobx-react-lite";
import BasicLayout from "~/layouts/BasicLayout";
import BlankLayout from "~/layouts/BlankLayout";
import routerConfig from "~/router.config";

import { user } from "~/models/user";

import piclogo from "~/assets/images/logo@2x.png";

// layout config
const layoutConfig = {
  logo: piclogo,
  title: "Doly Admin",
  theme: "light" // light or dark
};

// 同步history
const history = syncHistory();

const App = observer(() => {
  return (
    <HelmetProvider>
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
                user.isLogin ? (
                  <BasicLayout
                    routes={routerConfig.basic}
                    {...layoutConfig}
                    {...props}
                  />
                ) : (
                  <Redirect to="/user/login" />
                )
              }
            />
          </Switch>
        </Router>
      </ConfigProvider>
    </HelmetProvider>
  );
});

ReactDom.render(<App />, document.getElementById("root"));
