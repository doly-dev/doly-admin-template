import React from "react";
import { Dropdown, Menu, message } from "antd";
import NoticeIcon from "./NoticeIcon";
import styles from "./BasicLayout.less";

import { getLoginInfo, logout } from "~/utils/login";

export default function HeaderRightContent() {
  const { username } = getLoginInfo() || {};

  const DropdownMenu = (
    <Menu theme="dark">
      <Menu.Item onClick={() => message.info("修改密码")}>修改密码</Menu.Item>
      <Menu.Item
        onClick={() => {
          logout();
          message.success("退出成功");
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.headerRightContent}>
      <NoticeIcon />
      <Dropdown overlay={DropdownMenu}>
        <a>{`欢迎您，${username}`}</a>
      </Dropdown>
    </div>
  );
}
