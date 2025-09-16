"use client";
import { useResetPasswordMutation } from "@/redux/api/auth.api";
import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import { LockKeyhole } from "lucide-react";
import { useRouter } from "next/navigation";
import { ImSpinner3 } from "react-icons/im";
import { toast } from "sonner";

type FieldType = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const [postReset, { isLoading }] = useResetPasswordMutation()
  const route = useRouter();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      await postReset(values).unwrap();

      toast.success('Password Reset Successfully');

      route.push("/login");

    } catch (err: any) {
      toast.error(err?.data?.message || 'Something went wrong, try again');
    }
  };


  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      layout="vertical"
    >
      <Form.Item<FieldType>
        label="New password"
        name="newPassword"
        rules={[{
          required: true,
          pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          message:
            "Password must include uppercase, lowercase, number, special character, and be at least 8 characters long.",
        }]}
      >
        <Input.Password size="large" placeholder="Set New Password" prefix={<LockKeyhole size={16} />} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Confirm Password"
        name="confirmPassword"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password size="large" placeholder="Re-enter Password" prefix={<LockKeyhole size={16} />} />
      </Form.Item>

      <Button disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end" type="primary" htmlType="submit" size="large" block>
        Submit
      </Button>

    </Form>
  );
};

export default ResetPasswordForm;
