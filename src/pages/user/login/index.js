import React, { useEffect, useCallback } from "react";
import { Card, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAsync } from "rc-hooks";
import services from "~/services";
import { setLoginInfo, isLogin } from "~/utils/login";
import { setAuthorized } from "~/utils/authorized";

import styles from "./style.less";

const FormItem = Form.Item;

export default ({ history }) => {
  const { run, loading } = useAsync(services.login, {
    autoRun: false,
    onSuccess: res => {
      setLoginInfo(res.data); // 缓存登录信息
      setAuthorized(res.data.currentAuthority); // 缓存权限
      history.push("/");
    }
  });

  useEffect(() => {
    if (isLogin()) {
      history.push("/");
    }
  }, []);

  const onFinish = useCallback(values => {
    run({
      data: values
    });
  }, []);

  return isLogin() ? null : (
    <div className={styles.container}>
      <div className={styles.loginbox}>
        <Card
          title="登录"
          style={{
            padding: 10
          }}
          headStyle={{
            fontSize: 24,
            border: "none"
          }}
          bodyStyle={{
            paddingTop: 10
          }}
        >
          <Form onFinish={onFinish}>
            <FormItem
              name="username"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入用户名"
                }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                placeholder="用户名"
                size="large"
                autoComplete="off"
              />
            </FormItem>
            <FormItem
              name="password"
              validateFirst
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: "请输入密码"
                }
              ]}
            >
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="password"
                placeholder="密码"
                size="large"
                autoComplete="off"
              />
            </FormItem>
            <FormItem style={{ margin: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                block
                loading={loading}
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
      <div className={styles.bg} />
    </div>
  );
};
