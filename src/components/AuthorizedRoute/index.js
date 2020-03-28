import React from "react";
import { Route } from "react-router-dom";
import Exception from "../Exception";
import { checkAuthorized } from "~/utils/authorized";

// 不能访问的页面显示403
const Exception403 = () => (
  <Exception type="403" style={{ minHeight: 500, height: "80%" }} />
);

export default function AuthorizedRoute({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) {
  if (!checkAuthorized(authority)) {
    return <Route {...rest} component={Exception403} />;
  }

  return (
    <Route
      {...rest}
      render={props => (Component ? <Component {...props} /> : render(props))}
    />
  );
}
