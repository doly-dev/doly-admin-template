import React, { useEffect, useCallback } from "react";
import { Card, Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import useLogin from "~/hooks/useLogin";
import styles from "./style.less";

const FormItem = Form.Item;

export default ({ history }) => {
  const { isLogin, loading, login } = useLogin();

  useEffect(() => {
    if (isLogin()) {
      history.push("/");
    }
  }, [loading]);

  const onFinish = useCallback(values => {
    login({
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
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
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
