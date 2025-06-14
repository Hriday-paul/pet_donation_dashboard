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
        label="Email"
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
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Password" prefix={<LockKeyhole size={16} />} />
      </Form.Item>

      <Flex justify="space-between" align="center" className="mb-4">
        <Link href={"/forget-password"} style={{ textDecoration: "" }}>
          <p className="font-medium">Forgot Password?</p>
        </Link>
      </Flex>

      <Button htmlType="submit" type="primary" size="large" block style={{ border: "none " }}>
        Sign In
      </Button>

      <Form.Item shouldUpdate>
        {({ getFieldValue }) => {
          const repeat = getFieldValue('role');

          return repeat === "SHELTER" && <div className="my-4 flex flex-row gap-x-2 items-center">
            <p className="text-base text-text-color">Don't have account ?</p>
            <Link className="text-base text-main-color" href={"/signup"}>
              <p className="font-medium">Create Account</p>
            </Link>
          </div>

        }}
      </Form.Item>

    </Form>
  );
};

export default LoginForm;
