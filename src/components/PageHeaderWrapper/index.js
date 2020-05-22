import React, { useContext } from "react";
import { PageHeader } from "antd";
import { Link } from "react-router-dom";
import RouteContext from "~/layouts/RouteContext";
import { getBreadcrumb } from "~/layouts/_utils";

import styles from "./style.less";

// 渲染Breadcrumb 子节点
// Render the Breadcrumb child node
const itemRender = (route, params, routes) => {
  const last = routes.indexOf(route) === routes.length - 1;

  return last || !route.component ? (
    <span>{route.breadcrumbName}</span>
  ) : (
    <Link to={route.path}>{route.breadcrumbName}</Link>
  );
};

export default function PageHeaderWrapper({ children, ...restProps }) {
  const { location, flatMenuMap, title } = useContext(RouteContext);
  const routes = getBreadcrumb(flatMenuMap, location.pathname);

  const breadcrumb =
    routes.length > 1
      ? {
          routes,
          itemRender
        }
      : {};

  return (
    <div className={styles.wrapper}>
      <PageHeader
        ghost={false}
        title={title}
        breadcrumb={breadcrumb}
        {...restProps}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
