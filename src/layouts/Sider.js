import React from "react";
import { Layout } from "antd";
import styles from "./BasicLayout.less";

const { Sider } = Layout;

export default function DefineSider({
  collapsible = true,
  collapsed = false,
  children
}) {
  return (
    <Sider
      theme="light"
      width={250}
      collapsible={collapsible}
      collapsed={collapsed}
      trigger={null}
      className={styles.sider}
    >
      {children}
    </Sider>
  );
}
