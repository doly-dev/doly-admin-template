import React from "react";
import { Route, Redirect } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import AuthorizedRoute from "~/components/AuthorizedRoute";
import { isUrl } from "~/utils/utils";

function formatter(data = [], parentPath = "/") {
  let ret = [];

  data.forEach(item => {
    let { path } = item;
    if (!isUrl(path) && path.indexOf("/") !== 0) {
      path = parentPath + path;
    }

    if (item.routes) {
      ret = ret.concat(formatter(item.routes, `${path}/`));
    } else {
      const result = {
        ...item,
        path
      };

      if (
        item.redirect &&
        !isUrl(item.redirect) &&
        item.redirect.indexOf("/") !== 0
      ) {
        result.redirect = parentPath + item.redirect;
      }

      ret.push(result);
    }
  });

  return ret;
}

export function getRoutes(routeData, needAuthorized) {
  const ret = [];
  const routes = formatter(routeData);

  routes.forEach(page => {
    const { path, component: Component, redirect, render, ...restProps } = page;

    if (redirect) {
      ret.push(
        <Redirect key={path} from={path} to={redirect} exact {...restProps} />
      );
    } else {
      const routeComp = needAuthorized ? (
        <AuthorizedRoute
          key={path}
          path={path}
          render={props =>
            Component ? <Component {...props} /> : render({ ...props })
          }
          {...restProps}
        />
      ) : (
        <Route
          key={path}
          path={path}
          render={props =>
            Component ? <Component {...props} /> : render({ ...props })
          }
          {...restProps}
        />
      );
      ret.push(routeComp);
    }
  });

  return ret;
}

// 获取当前route信息
function getCurrentRoute(menuData, pathname) {
  let currentRoute = null;

  menuData.some(item => {
    if (item.children) {
      currentRoute = getCurrentRoute(item.children, pathname);
    } else if (pathToRegexp(item.path).test(pathname)) {
      currentRoute = item;
    }
    return currentRoute;
  });

  return currentRoute;
}

// 获取页面标题
export function getPageTitle({ title, menuData, location }) {
  const { pathname } = location;
  let pageTitle = title;
  const currRoute = getCurrentRoute(menuData, pathname);
  if (currRoute && currRoute.name) {
    pageTitle = `${currRoute.name} - ${title}`;
  }
  return pageTitle;
}
