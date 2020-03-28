import React, { useMemo } from "react";
import { Redirect, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { getRoutes, getPageTitle } from "./_utils";

export default function BlankLayout({ routes, ...restProps }) {
  const routeData = useMemo(() => getRoutes(routes, true), []);
  const pageTitle = getPageTitle({ routeData, ...restProps });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>
      <Switch>
        {routeData}
        <Redirect to="/user/login" />
      </Switch>
    </>
  );
}
