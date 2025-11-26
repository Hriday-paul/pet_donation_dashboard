"use client";
import { useLoginUserMutation } from "@/redux/api/auth.api";
import baseApi from "@/redux/api/baseApi";
import { addUserDetails } from "@/redux/slices/userSlice";
import { config } from "@/utils/config";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, Flex, Radio } from "antd";
import { LockKeyhole, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ImSpinner3 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

type FieldType = {
  email: string;
  password: string;
  // remember?: string;
  role: "shelter" | "admin",
};

const LoginForm = () => {
  const [postLogin, { isLoading }] = useLoginUserMutation();
  const [_, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const route = useRouter();
  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await postLogin(values).unwrap();

      if (res?.data?.user?.role !== values?.role) {
        toast.error('Account not found');
        return;
      }

      setCookie('accessToken', res?.data?.accessToken, {
        httpOnly: false,
        maxAge: 14 * 24 * 60 * 60, // 14 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      setCookie('refreshToken', res?.data?.refreshToken, {
        httpOnly: false,
        maxAge: 30 * 24 * 60 * 60, // 30 days
        path: '/',
        sameSite: 'lax',
        secure: config.hasSSL,
      });

      dispatch(addUserDetails({ name: res?.data?.user?.first_name, role: res?.data?.user?.role, profilePicture: res?.data?.user?.profile_image || "/empty-user.png" , location : res?.data?.user?.location || null, coordinates : res?.data?.user?.address?.coordinates || []}));

      dispatch(baseApi.util.resetApiState());

      toast.success('Signin successfully');

      route.push(res?.data?.user?.role == 'admin' ? "/admin/dashboard" : "/shelter/dashboard");
      route.refresh();


    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  };


  return (
    <Form
      name="basic"
      initialValues={{ role: "shelter" }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
      style={{ width: "354px" }}>

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
            { value: "admin", label: 'Admin' },
            { value: "shelter", label: 'Shelter' },
          ]}
        />
      </Form.Item>

      <h1 className="text-2xl text-text-color font-semibold text-center mb-1">Log In</h1>
      <p className="text-sm text-text-color text-center mb-8">Access the control panel using your email and password.</p>

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

      <Button disabled={isLoading} type="primary" htmlType="submit" size="large" block icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
        Sign In
      </Button>

      <Form.Item shouldUpdate>
        {({ getFieldValue }) => {
          const repeat = getFieldValue('role');

          return repeat === "shelter" && <div className="my-4 flex flex-row gap-x-2 items-center">
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
