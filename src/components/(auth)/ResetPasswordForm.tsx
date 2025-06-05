"use client";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";

type FieldType = {
  setPassword?: string;
  reSetPassword?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ResetPasswordForm = () => {
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    route.push("/login");
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        name="setPassword"
        rules={[{ required: true, message: "Please your set password!" }]}
      >
        <Input.Password size="large" placeholder="Set New Password" prefix={<LockKeyhole size={16} />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="reSetPassword"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Re-enter Password" prefix={<LockKeyhole size={16} />} />
      </Form.Item>

      <Button htmlType="submit" type="primary" size="large" block style={{ border: "none" }}>
        Reset Password
      </Button>

    </Form>
  );
};

export default ResetPasswordForm;
