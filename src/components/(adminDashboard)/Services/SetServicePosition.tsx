import { useAddServiceMutation, useAddServicePositionMutation } from "@/redux/api/service.api";
import { Button, Form, FormProps, InputNumber, Modal } from "antd";
import { ImSpinner3 } from "react-icons/im";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";
import { TService } from "@/redux/types";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    isEdit?: boolean,
    defaultdata: TService
};

type FieldType = {
    position: number,
}

const SetServicePosition = ({ open, setOpen, defaultdata }: TPropsType) => {

    const [handleUpdateApi, { isLoading }] = useAddServicePositionMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const res = await handleUpdateApi({ body: { position: values?.position }, id: defaultdata?._id }).unwrap();
            toast.success("Service position updated successfully");

        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong, try again")
        }
    };

    return (

        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}>

            <div className="">

                <div className="flex justify-end items-center">
                    <div
                        className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine size={18} color="#fff" className="" />
                    </div>
                </div>

                <h4 className="text-center text-xl font-medium">{"Update Position"}</h4>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{ position: defaultdata?.position }}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                >

                    <Form.Item<FieldType> name="position" label={"Position"}
                    // rules={[{ required: true, message: "Position is required" }]}
                    >
                        <InputNumber size="large" className="!w-full" placeholder="write position number" />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" block disabled={isLoading} icon={(isLoading) ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                            Save
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

export default SetServicePosition