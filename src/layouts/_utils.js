import React from "react";
import { Route, Redirect } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import { isUrl } from "util-helpers";
import AuthorizedRoute from "~/components/AuthorizedRoute";

// 格式化路由path
function formatPath(path, parentPath = "/") {
  let ret = path;
  if (!isUrl(path) && path.indexOf("/") !== 0) {
    ret = parentPath + path;
  }

  return ret;
}

// 格式化路由，处理path和breakcrumb
function formatter(data = [], parentPath = "/", breakcrumb = []) {
  let ret = [];

  data.forEach(item => {
    const pathFmt = formatPath(item.path, parentPath);
    const currentBreakcrumb = breakcrumb.slice();

    currentBreakcrumb.push({
      path: item.path,
      breadcrumbName: item.name || ""
    });

    if (item.routes) {
      ret = ret.concat(
        formatter(item.routes, `${pathFmt}/`, currentBreakcrumb)
      );
    } else {
      const result = {
        ...item,
        breakcrumb: currentBreakcrumb,
        path: pathFmt
      };

      if (item.redirect) {
        result.redirect = formatPath(item.redirect, parentPath);
      }

      ret.push(result);
    }
  });

  return ret;
}

// 获取路由数据
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
export function getCurrentRoute(routeData, pathname) {
  let currentRoute = null;

  routeData.some(item => {
    if (pathToRegexp(item.key).test(pathname)) {
      currentRoute = item.props;
    }
    return currentRoute;
  });

  return currentRoute;
}

// 获取页面标题
// 这里如果根据菜单获取标题会有问题，比如有些详情页的菜单是隐藏。
export function getPageTitle({ routeData, location }) {
  const { pathname } = location;
  let title = "";
  const currRoute = getCurrentRoute(routeData, pathname);
  if (currRoute && currRoute.name) {
    title = currRoute.name;
  }
  return title;
}

// 获取面包屑数据
export function getBreadcrumb(routeData, pathname) {
  const currRoute = getCurrentRoute(routeData, pathname);
  return currRoute.breakcrumb;
}
