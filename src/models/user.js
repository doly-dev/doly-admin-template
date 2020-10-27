import { action, computed, observable } from "mobx";
import { routerHistory } from "router-store";
import Storage from "~/utils/Storage";
import { setAuthorized, removeAuthorized } from "~/utils/authorized";

const storageKey = "__login_info__";

const loginStorage = new Storage(storageKey, window.sessionStorage);

class User {
  @observable token = ""; // 登录标识

  @observable username = ""; // 用户信息

  constructor(userData) {
    this.update(userData);
  }

  @computed get logined() {
    return !!this.token;
  }

  @computed get loginToken() {
    return this.token;
  }

  // 登录后更新用户数据
  @action update(data = {}) {
    const { username, token, currentAuthority } = data || {};

    loginStorage.set(data); // 缓存本地缓存
    setAuthorized(currentAuthority); // 设置权限

    this.username = username;
    this.token = token;
  }

  // 退出登录销毁用户数据
  @action destory() {
    loginStorage.remove(); // 删除本地缓存
    removeAuthorized(); // 删除权限

    this.username = "";
    this.token = "";

    routerHistory.push("/user/login");
  }
}

// // 用于示例演示
// loginStorage.set({
//   username: "guest",
//   token: "guest12343",
//   currentAuthority: ["user"]
// });

export const user = new User(loginStorage.get());

export default User;
