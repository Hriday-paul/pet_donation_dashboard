"use client";
import { useCreateAccountMutation } from "@/redux/api/auth.api";
import { config } from "@/utils/config";
import type { FormProps } from "antd";
import { Button, Form, Input, Flex, Radio, InputNumber } from "antd";
import { IdCard, LockKeyhole, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

type FieldType = {
    name: string
    email: string;
    contact: string,
    location: string,
    password: string;
    confirm_password: string
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const SignUpForm = () => {
    const [submitApi, { isLoading }] = useCreateAccountMutation();
    const [_, setCookie] = useCookies(['accessToken', 'refreshToken', "token"]);
    const route = useRouter();

    const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
        try {
            const res = await submitApi({ first_name: values?.name, email: values?.email, password: values?.password, role: "shelter" }).unwrap();
            setCookie('token', res?.data?.otpToken?.token, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60, // 14 days
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });
            toast.success("Signup successfully")
            route.push("/verify-email");
        } catch (err: any) {
            toast.error(err?.data?.message || 'Something went wrong, try again');
        }
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

            <h1 className="text-2xl text-text-color font-semibold text-center mb-1 mt-8">Sign up</h1>
            <p className="text-sm text-text-color text-center mb-8">Create an account to continue!</p>

            <Form.Item<FieldType>
                label="Shelter Name"
                name="name"
                rules={[
                    { required: true, message: "Please input your name!" },
                ]}
            >
                <Input size="large" type="text" placeholder="Shelter Name" prefix={<IdCard size={16} />} />
            </Form.Item>

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
                label="Contact"
                name="contact"
                rules={[
                    { required: true, message: "Please input your contact!" },
                ]}
            >
                <InputNumber size="large" placeholder="Contact number" className="!w-full" prefix={<PhoneCall size={16} />} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: "Please input your password!" }]}
            >
                <Input.Password size="large" placeholder="Password" prefix={<LockKeyhole size={16} />} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Confirm Password"
                name="confirm_password"
                rules={[{ required: true, message: "Please input your confirm password!" }]}
            >
                <Input.Password size="large" placeholder="Password" prefix={<LockKeyhole size={16} />} />
            </Form.Item>

            <Button htmlType="submit" type="primary" size="large" block disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> :<></>} iconPosition="end">
                Sign Up
            </Button>



            <div className="my-4 flex flex-row gap-x-2 items-center">
                <p className="text-base text-text-color">Already have an account?</p>
                <Link className="text-base text-main-color" href={"/login"}>
                    <p className="font-medium">Login</p>
                </Link>
            </div>


        </Form>
    );
};


export default SignUpForm;