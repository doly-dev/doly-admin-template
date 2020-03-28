import { routerHistory } from "router-store";
import { removeAuthorized } from "~/utils/authorized";
import Storage from "./Storage";

const storageKey = "__login_info__";

const loginStorage = new Storage(storageKey, window.sessionStorage);

// 获取登录信息
export function getLoginInfo() {
  return loginStorage.get();
}

// 设置登录信息
export function setLoginInfo(loginData) {
  loginStorage.set(loginData);
}

// 删除登录信息
export function remoteLoginInfo() {
  loginStorage.remove();
}

// 获取登录token
export function getLoginToken() {
  const loginData = loginStorage.get() || {};
  return loginData.token;
}

// 是否登录
export function isLogin() {
  return !!getLoginToken();
}

// 退出登录
export function logout() {
  remoteLoginInfo(); // 删除缓存登录信息
  removeAuthorized(); // 删除缓存权限
  routerHistory.push("/user/login"); // 跳转登录页
}
