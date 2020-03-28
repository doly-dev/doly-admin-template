import React, { useState, useMemo } from "react";
import { Layout } from "antd";
import { Redirect, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Header from "./Header";
import HeaderRightContent from "./HeaderRightContent";
import Footer from "./Footer";
import Sider from "./Sider";
import RouteContext from "./RouteContext";
import SiderMenu from "~/components/SiderMenu";
import { getRoutes, getPageTitle } from "./_utils";
import routerConfig from "~/router.config";
import { getMenuData } from "~/utils/menu";
import piclogo from "~/assets/images/logo@2x.png";

import styles from "./BasicLayout.less";

const { Content } = Layout;

export default function BasicLayout({
  title = "Doly Admin",
  logo = piclogo, // logo图片
  collapsible = false, // 是否可收起
  copyright = `Copyright&nbsp;&nbsp;Doly 2020`, // 底部版权信息，String | ReactNode
  routes = [],
  ...restProps
}) {
  const [collapsed, setCollapsed] = useState(false); // 侧边栏当前收起状态
  const menuData = useMemo(() => getMenuData(routerConfig.basic), []);
  const routeData = useMemo(() => getRoutes(routes, true), []);
  const pageTitle = getPageTitle({ routeData, ...restProps });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle ? `${pageTitle} - ${title}` : title}</title>
        </Helmet>
      </HelmetProvider>
      <RouteContext.Provider
        value={{
          ...restProps,
          menuData,
          routeData,
          title: pageTitle,
          collapsed
        }}
      >
        <Layout>
          <Header
            title={title}
            logo={logo}
            defaultCollapsed={collapsed}
            collapsible={collapsible}
            onTrigger={() => setCollapsed(c => !c)}
            renderRightContent={() => <HeaderRightContent />}
          />
          <Layout>
            <Sider collapsed={collapsed} collapsible={collapsible}>
              <SiderMenu menuData={menuData} {...restProps} />
            </Sider>
            <Layout
              className={styles.rightLayout}
              style={collapsed ? { marginLeft: 80 } : {}}
            >
              <Content className={styles.content}>
                <Switch>
                  {routeData}
                  <Redirect to="/exception/404" />
                </Switch>
              </Content>
              <Footer copyright={copyright} />
            </Layout>
          </Layout>
        </Layout>
      </RouteContext.Provider>
    </>
  );
}
