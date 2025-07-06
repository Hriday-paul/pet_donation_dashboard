"use client";
import { useForgotPasswordMutation } from "@/redux/api/auth.api";
import { config } from "@/utils/config";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

type FieldType = {
  email: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const ForgetPassForm = () => {
  const [postApi, { isLoading }] = useForgotPasswordMutation();
  const route = useRouter();
   const [_, setCookie] = useCookies(['token']);

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await postApi(values).unwrap();

      setCookie('token', res?.data?.token, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      toast.success('Otp send to your email');

      route.push("/verify-email");

    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
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

      <Button disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end" type="primary" htmlType="submit" size="large" block>
        Send OTP
      </Button>

    </Form>
  );
};

export default ForgetPassForm;
