import React, { useContext } from "react";
import { PageHeader } from "antd";
import RouteContext from "~/layouts/RouteContext";
import { getBreadcrumb } from "~/layouts/_utils";

import styles from "./style.less";

// 自定义渲染，父级路由没有页面功能
function itemRender(route) {
  return <span>{route.breadcrumbName}</span>;
}

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
