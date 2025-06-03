import { Button, DatePicker, Divider, Form, FormProps, Input, InputNumber, Modal, Upload } from "antd";
import { CloudDownload } from "lucide-react";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    isEdit?: boolean
};

type FieldType = {
    name: string,
    icon: File
}

const AddService = ({ open, setOpen, isEdit }: TPropsType) => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
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
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
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
                        rules={[{ required: true, message: "Service icon is required" }]}
                    >
                        <Upload.Dragger
                            name="files"
                            maxCount={1}
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
                    </Form.Item>

                    <Form.Item<FieldType> name="name" label={"Service Name"} rules={[{ required: true, message: "Service name is required" }]}>
                        <Input size="large" placeholder="Service Name" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

export default AddService;