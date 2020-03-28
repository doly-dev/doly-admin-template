import React, { useMemo } from "react";
import { Redirect, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getRoutes, getPageTitle } from "./_utils";
import routerConfig from "~/router.config";
import { getMenuData } from "~/utils/menu";

export default function BlankLayout({ routes, ...restProps }) {
  const routeData = useMemo(() => getRoutes(routes, true), []);
  const menuData = useMemo(() => getMenuData(routerConfig.blank), []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{getPageTitle({ title: "", menuData, ...restProps })}</title>
        </Helmet>
      </HelmetProvider>
      <Switch>
        {routeData}
        <Redirect to="/user/login" />
      </Switch>
    </>
  );
}
