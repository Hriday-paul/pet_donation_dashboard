import { Button, ConfigProvider, Form, FormProps, Input, Modal } from "antd";
import { RiCloseLargeLine } from "react-icons/ri";
import ForgetPasswordModal from "./ForgetPasswordModal";
import { useState } from "react";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/redux/api/auth.api";
import { ImSpinner3 } from "react-icons/im";

type TPropsType = {
  open: boolean;
  setOpen: (collapsed: boolean) => void;
};

type FieldType = {
  current_password: string,
  confirm_password: string,
  new_password: string,
}

const ChangePasswordModal = ({ open, setOpen }: TPropsType) => {

  const [postChangePass, { isLoading }] = useChangePasswordMutation();

  const [form] = Form.useForm();


  const handleSubmit: FormProps<FieldType>['onFinish'] = async (data) => {
    if (data?.new_password !== data?.confirm_password) {
      toast.error("Password not match");
      return;
    }
    try {
      await postChangePass(data).unwrap();
      toast.success("Password Update Successfully")
      form.resetFields();
    } catch (error) {
      toast.error("Password update failed, try again")
    }
  };

  return (
    <>
      <Modal
        open={open}
        footer={null}
        centered={true}
        onCancel={() => setOpen(false)}
        closeIcon={false}
        style={{
          minWidth: "max-content",
        }}
      >
        <div className="py-14">
          <div
            className="w-12 h-12 bg-main-color  absolute top-2 right-2 rounded-full cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <RiCloseLargeLine
              size={18}
              color="#fff"
              className="absolute top-1/3 left-1/3"
            />
          </div>

          {/* header */}
          <div>
            <h4 className=" text-2xl font-medium text-center">
              Change Password
            </h4>
            <p className="mt-1 text-center">
              Your password must be 8-10 character long.
            </p>
          </div>

          {/* form */}
          <ConfigProvider
            theme={{
              // components: {
              //   Input: {
              //     colorBgContainer: "var(--color-primary-gray)",
              //     colorText: "#fff",
              //     colorTextPlaceholder: "#fff",
              //   },
              //   Form: {
              //     labelColor: "#fff",
              //   },
              // },
            }}
          >
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{
                maxWidth: 500,
                marginTop: "25px",
              }}
            >
              {/*  input old password */}
              <Form.Item<FieldType>
                label="Old Password"
                name="current_password"
                rules={[
                  { required: true, message: "Please Enter Old Password" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter old password "
                />
              </Form.Item>

              {/*  input  new Password*/}
              <Form.Item<FieldType>
                label="New password"
                name="new_password"
                rules={[
                  { required: true, message: "Please Enter New  Password" },
                ]}
              >
                <Input.Password size="large" placeholder="Set new password" />
              </Form.Item>

              {/* input  confirm number  */}
              <Form.Item<FieldType>
                label="Re-enter new password"
                name="confirm_password"
                rules={[
                  { required: true, message: "Please Re-enter new password" },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Re-enter new password"
                />
              </Form.Item>

              {/* <p
                onClick={() => {
                  setOpen(false);
                  setOpenModal(true);
                }}
                className="mb-5 font-medium cursor-pointer text-gray-200"
              >
                Forget password?
              </p> */}

              <Button
                htmlType="submit"
                size="large"
                type="primary"
                block
                disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                Update Password
              </Button>
            </Form>
          </ConfigProvider>
        </div>
      </Modal>
      
    </>
  );
};

export default ChangePasswordModal;
