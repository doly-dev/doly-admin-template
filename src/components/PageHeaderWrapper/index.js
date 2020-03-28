import React from "react";
import { PageHeader } from "antd";

import styles from "./style.less";

export default function PageHeaderWrapper({ children, ...restProps }) {
  return (
    <>
      <PageHeader {...restProps} />
      <div className={styles.content}>{children}</div>
    </>
  );
}
