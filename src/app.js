import "~/utils/polyfill";

import React from "react";
import ReactDom from "react-dom";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { syncHistory } from "router-store";
import useLogin from "~/hooks/useLogin";
import BasicLayout from "~/layouts/BasicLayout";
import BlankLayout from "~/layouts/BlankLayout";
import routerConfig from "~/router.config";

const history = syncHistory();

function App() {
  const { isLogin } = useLogin();
  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/user"
          render={props => (
            <BlankLayout routes={routerConfig.blank} {...props} />
          )}
        />
        <Route
          path="/"
          render={props =>
            isLogin() ? (
              <BasicLayout routes={routerConfig.basic} {...props} />
            ) : (
              <Redirect to="/user/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
}

ReactDom.render(<App />, document.getElementById("root"));
