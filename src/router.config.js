import React from "react";
import { HomeOutlined, ToolOutlined, HeartOutlined } from "@ant-design/icons";

// pages
import Exception403 from "~/pages/exception/403";
import Exception404 from "~/pages/exception/404";
import Exception500 from "~/pages/exception/500";

import Home from "~/pages/home";
import Welcome from "~/pages/welcome";
import Login from "~/pages/user/login";

// 这里为什么不使用 Layout，因为会有循环引用问题。比如 BasicLayout 依赖 menu，menu 依赖 routes，routes 依赖 BasicLayout
//
// 图标请使用 @ant-design/icons 引入的组件（https://ant.design/components/icon-cn/），或 图片地址。

export default {
  // 以下页面需要登录、权限，使用 BasicLayout 布局
  basic: [
    {
      path: "home",
      name: "首页",
      icon: <HomeOutlined />,
      component: Home
    },
    {
      path: "https://www.npmjs.com/package/doly-cli",
      name: "doly-cli",
      target: "_blank",
      icon: <ToolOutlined />
    },
    {
      path: "https://doly-dev.github.io/util-helpers/index.html",
      name: "util-helpers",
      target: "_blank",
      icon: <ToolOutlined />
    },
    {
      path: "https://www.npmjs.com/package/rc-hooks",
      name: "rc-hooks",
      target: "_blank",
      icon: <ToolOutlined />
    },
    {
      path: "single",
      name: "单层级",
      routes: [
        {
          path: "one",
          name: "One",
          component: Welcome
        },
        {
          path: "two",
          name: "Two",
          authority: ["admin"],
          component: Welcome
        },
        {
          path: "three",
          name: "Three",
          icon: <HeartOutlined />,
          component: Welcome
        }
      ]
    },
    {
      path: "multiple",
      name: "多层级",
      routes: [
        {
          path: "one",
          name: "One",
          icon: <HeartOutlined />,
          routes: [
            {
              path: "one-1",
              name: "One-1",
              routes: [
                {
                  path: "one-1-1",
                  name: "One-1-1",
                  icon: <HeartOutlined />,
                  component: Welcome
                },
                {
                  path: "one-1-2",
                  name: "One-1-2",
                  component: Welcome
                }
              ]
            },
            {
              path: "one-2",
              name: "One-2",
              component: Welcome
            }
          ]
        },
        {
          path: "two",
          name: "Two",
          component: Welcome
        }
      ]
    },
    {
      path: "exception",
      hideInMenu: true,
      routes: [
        {
          path: "403",
          name: "403",
          component: Exception403
        },
        {
          path: "404",
          name: "404",
          component: Exception404
        },
        {
          path: "500",
          name: "500",
          component: Exception500
        }
      ]
    }
  ],
  // 以下页面无需权限，使用 BlankLayout 布局
  blank: [
    {
      path: "user",
      routes: [
        {
          path: "/user",
          redirect: "/user/login"
        },
        {
          path: "login",
          name: "登录",
          component: Login
        }
      ]
    }
  ]
};
