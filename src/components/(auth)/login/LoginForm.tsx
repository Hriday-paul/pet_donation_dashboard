"use client";
import { addUserDetails } from "@/redux/slices/userSlice";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex, Radio } from "antd";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

type FieldType = {
  email?: string;
  password?: string;
  // remember?: string;
  role: "SHELTER" | "ADMIN",
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const LoginForm = () => {
  const route = useRouter();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    dispatch(addUserDetails({ name: 'Hriday Paul', role: values?.role }))
    route.push(values?.role == 'ADMIN' ? "/admin/dashboard" : "/shelter/dashboard");
  };

  return (
    <Form
      name="basic"
      initialValues={{ role: "SHELTER" }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      style={{ width: "354px" }}
    >

      <Form.Item<FieldType>
        name="role"
        rules={[
          { required: true, message: "Please choose role" },
        ]}
        className="mx-auto flex justify-center mt-8"
      >
        <Radio.Group
          // defaultValue={1}
          options={[
            { value: "ADMIN", label: 'Admin' },
            { value: "SHELTER", label: 'Shelter' },
          ]}
        />
      </Form.Item>

      <h1 className="text-2xl text-text-color font-semibold text-center mb-1">Log In</h1>
      <p className="text-sm text-text-color text-center mb-8">Access the Taste Point using your email and password.</p>

      <Form.Item<FieldType>
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          {
            type: "email",
            message: "Please enter a valid email address!",
          },
        ]}
      >
        <Input size="large" type="email" placeholder="User Email" prefix={<Mail size={16} />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Password" prefix={<LockKeyhole size={16} />} />
      </Form.Item>

      {/* <Form.Item<FieldType> name="remember" valuePropName="checked"> */}
      <Flex justify="space-between" align="center" className="mb-4">
        {/* <Checkbox>
            <p className=" font-semibold">Remember me</p>
          </Checkbox> */}
        <Link href={"/forget-password"} style={{ textDecoration: "" }}>
          <p className="font-medium">Forgot Password?</p>
        </Link>
      </Flex>
      {/* </Form.Item> */}

      <Button htmlType="submit" type="primary" size="large" block style={{ border: "none " }}>
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
