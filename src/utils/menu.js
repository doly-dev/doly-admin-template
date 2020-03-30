import { isUrl } from "util-helpers";
import { checkAuthorized } from "./authorized";

function formatter(data = [], parentPath = "/") {
  return data
    .map(item => {
      // eslint-disable-next-line
      let { path, routes, ...rest } = item;

      if (!isUrl(path) && path.indexOf("/") !== 0) {
        path = parentPath + path;
      }

      // 没有name 或 没有权限的不显示在菜单上
      const result =
        item.name && checkAuthorized(item.authority)
          ? {
              ...rest,
              path
            }
          : null;

      if (result && routes) {
        result.children = formatter(routes, `${parentPath}${item.path}/`);
      }
      return result;
    })
    .filter(item => !!item);
}

export function getMenuData(routes) {
  return formatter(routes);
}
