import axios from "axios";
import { message } from "antd";
import user from "~/models/user";

const RESPONSE_ERRMSG_FIELD = "errMsg"; // 响应信息字段名
const RESPONSE_CODE_FIELD = "errCode"; // 响应码字段名
const EXPIRED_CODE = "-1"; // 登录态过期响应码
const SUCCESS_CODE = "0000"; // 响应成功响应码

/**
 * 可在该模块编写部分业务逻辑，如请求头token，请求失败/登录过期/服务错误等处理
 * axios 文档：https://github.com/axios/axios#request-config
 */
export default function request(options) {
  return axios({
    // eslint-disable-next-line
    baseURL: API_URL, // 在 doly.config.js 中配置
    ...options
  })
    .then(res => res.data)
    .then(res => {
      // 请求成功
      if (res[RESPONSE_CODE_FIELD] === SUCCESS_CODE) {
        return res;
      }

      // 登录过期
      if (res[RESPONSE_CODE_FIELD] === EXPIRED_CODE) {
        user.destory();
        return Promise.reject({
          [RESPONSE_CODE_FIELD]: "登录超时，请重新登录"
        });
      }

      // 其他错误异常
      return Promise.reject(res);
    })
    .catch(err => {
      // 请求失败处理，一般是全局错误提示
      // eslint-disable-next-line
      err &&
        err[RESPONSE_ERRMSG_FIELD] &&
        message.error(err[RESPONSE_ERRMSG_FIELD]);

      return Promise.reject(err);
    });
}
