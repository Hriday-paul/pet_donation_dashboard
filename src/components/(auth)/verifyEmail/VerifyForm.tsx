"use client";
import { useVerifyOtpMutation } from "@/redux/api/auth.api";
import { config } from "@/utils/config";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

type FieldType = {
  otp: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const VerifyEmailForm = () => {
  const [postVerify, { isLoading }] = useVerifyOtpMutation();
  const route = useRouter();
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken', "token"]);

  //handle password change
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await postVerify(values).unwrap();


      setCookie('accessToken', res?.data?.accessToken, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      toast.success('Email Verified Successfully');

      route.push("/reset-password");

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
      <Form.Item<FieldType> name="otp" rules={[
        { required: true, message: "Please input your otp!" },
      ]}>
        <Input.OTP size="large" />
      </Form.Item>

      <Button disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end" type="primary" htmlType="submit" size="large" block>
        Verify Email
      </Button>

    </Form>
  );
};

export default VerifyEmailForm;
