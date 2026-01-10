import { useAddServiceMutation, useUpdateServiceMutation } from "@/redux/api/service.api";
import { Button, DatePicker, Divider, Form, FormProps, Input, InputNumber, Modal, Select, Upload } from "antd";
import { CloudDownload, Trash2 } from "lucide-react";
import type { UploadFile } from 'antd';
import { ImSpinner3 } from "react-icons/im";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";
import { TService } from "@/redux/types";
import Image from "next/image";
import { useState } from "react";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    isEdit?: boolean,
    defaultdata?: TService
};

type FieldType = {
    name: string,
    icon: UploadFile[]
}

const AddService = ({ open, setOpen, isEdit, defaultdata }: TPropsType) => {

    const [handleApi, { isLoading }] = useAddServiceMutation();
    const [handleUpdateApi, { isLoading: UpdateLoading }] = useUpdateServiceMutation();
    const [form] = Form.useForm();
    const [hideDefaultImage, setHideDefaultImage] = useState(false);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            if (isEdit && defaultdata) {
                const formdata = new FormData();
                formdata.append("data", JSON.stringify({ name: values?.name,}))
                if (values?.icon) {
                    formdata.append("icon", values?.icon?.[0]?.originFileObj as File)
                }
                const res = await handleUpdateApi({ body: formdata, id: defaultdata?._id }).unwrap();
                toast.success("Service updated successfully");
            } else {
                const formdata = new FormData();
                formdata.append("data", JSON.stringify({ name: values?.name }))
                formdata.append("icon", values?.icon?.[0]?.originFileObj as File)
                const res = await handleApi(formdata).unwrap();
                toast.success("New service added successfully");
                form.resetFields();
            }
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

            <div className="pb-5">

                <div className="flex justify-end items-center">
                    <div
                        className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine size={18} color="#fff" className="" />
                    </div>
                </div>

                <h4 className="text-center text-xl font-medium">{isEdit ? "Edit Services" : "Add New Services"}</h4>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={isEdit ? { name: defaultdata?.name } : {}}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                    layout="vertical"
                >

                    <Form.Item
                        name="icon"
                        label="Service Icon"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                        rules={[{ required: isEdit ? false : true, message: "Service icon is required" }]}
                    >
                        <Upload.Dragger
                            name="files"
                            maxCount={1}
                            className="relative"
                            beforeUpload={() => false} // prevents automatic upload
                            accept="image/*"
                            listType="text"
                        >
                            <p className="ant-upload-drag-icon mx-auto flex justify-center">
                                <CloudDownload size={40} />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">(162 X 162 will be perfect)</p>
                        </Upload.Dragger>

                        {(isEdit && defaultdata && !hideDefaultImage) && <div className="absolute top-0 left-0 h-full w-full mx-auto bg-white">
                            <Image src={defaultdata?.icon} alt="Servic eImage" height={1000} width={1000} className="h-full w-full object-contain" />

                            <button onClick={() => setHideDefaultImage(true)} className='bg-red-500/10 p-3  absolute top-0 right-5 rounded-full duration-200'>
                                <Trash2 size={20} color='red' />
                            </button>
                        </div>}

                    </Form.Item>

                    <Form.Item<FieldType> name="name" label={"Service Name"} rules={[{ required: true, message: "Service name is required" }]}>
                        <Input size="large" placeholder="Service Name" />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" block disabled={isLoading || UpdateLoading} icon={(isLoading || UpdateLoading) ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                            Save
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

export default AddService;