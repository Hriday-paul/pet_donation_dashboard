"use client";
import type { FormProps } from "antd";
import { Button, Form, Input, Flex, Radio, InputNumber } from "antd";
import { IdCard, LockKeyhole, Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    const route = useRouter();

    const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
        console.log("Success:", values);
        route.push("/verify-email");
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

            <Button htmlType="submit" type="primary" size="large" block style={{ border: "none " }}>
                Sign Up
            </Button>



            <div  className="my-4 flex flex-row gap-x-2 items-center">
                <p className="text-base text-text-color">Already have an account?</p>
                <Link className="text-base text-main-color" href={"/login"}>
                    <p className="font-medium">Login</p>
                </Link>
            </div>


        </Form>
    );
};


export default SignUpForm;