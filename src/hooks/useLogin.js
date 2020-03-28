import { useState, useEffect } from "react";
import { useAsync } from "rc-hooks";
import services from "~/services";
import { setLoginInfo, isLogin, logout } from "~/utils/login";
import { setAuthorized } from "~/utils/authorized";

function useLogin() {
  // eslint-disable-next-line
  const [count, setCount] = useState(0);

  const { run, cancel, loading } = useAsync(services.login, {
    autoRun: false,
    onSuccess: res => {
      setLoginInfo(res.data); // 缓存登录信息
      setAuthorized(res.data.currentAuthority); // 缓存权限
      setCount(num => num + 1); // 更新state，触发更新
    }
  });

  // TODO：
  // rc-hooks 需添加 useUnmount
  useEffect(() => {
    // 卸载当前组件时，如果在请求中，则取消请求
    return cancel;
  }, []);

  return {
    isLogin,
    loading,
    login: run,
    logout
  };
}

export default useLogin;
