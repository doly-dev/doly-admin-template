import React, { useCallback } from "react";
import { Dropdown, Menu, message } from "antd";
import { observer } from "mobx-react-lite";
// import NoticeIcon from "./NoticeIcon";
import styles from "./BasicLayout.less";

import { user } from "~/models/user";

function HeaderRightContent() {
  const handleLogout = useCallback(() => {
    user.logout();
    message.success("退出成功");
  }, []);

  const DropdownMenu = (
    <Menu theme="dark">
      <Menu.Item onClick={() => message.info("修改密码")}>修改密码</Menu.Item>
      <Menu.Item onClick={handleLogout}>退出</Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.headerRightContent}>
      {/* <NoticeIcon /> */}
      <Dropdown overlay={DropdownMenu}>
        <a>{`欢迎您，${user.username}`}</a>
      </Dropdown>
    </div>
  );
}

export default observer(HeaderRightContent);
