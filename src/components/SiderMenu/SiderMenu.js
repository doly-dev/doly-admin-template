import React, { PureComponent, Suspense } from "react";
import PageLoading from "../PageLoading";
import { getDefaultCollapsedSubMenus } from "./SiderMenuUtils";

const BaseMenu = React.lazy(() => import("./BaseMenu"));

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openKeys: getDefaultCollapsedSubMenus(props)
    };
  }

  static getDerivedStateFromProps(props, state) {
    const { pathname, flatMenuKeysLen } = state;
    if (
      props.location.pathname !== pathname ||
      props.flatMenuKeys.length !== flatMenuKeysLen
    ) {
      return {
        pathname: props.location.pathname,
        flatMenuKeysLen: props.flatMenuKeys.length,
        openKeys: getDefaultCollapsedSubMenus(props)
      };
    }
    return null;
  }

  isMainMenu = key => {
    const { menuData } = this.props;
    return menuData.some(item => {
      if (key) {
        return item.key === key || item.path === key;
      }
      return false;
    });
  };

  handleOpenChange = openKeys => {
    const moreThanOne =
      openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
    this.setState({
      openKeys: moreThanOne ? [openKeys.pop()] : [...openKeys]
    });
  };

  render() {
    const { openKeys } = this.state;
    const defaultProps = { openKeys };

    return (
      <Suspense fallback={<PageLoading />}>
        <BaseMenu
          {...this.props}
          mode="inline"
          handleOpenChange={this.handleOpenChange}
          onOpenChange={this.handleOpenChange}
          style={{ padding: "16px 0", width: "100%" }}
          {...defaultProps}
        />
      </Suspense>
    );
  }
}
