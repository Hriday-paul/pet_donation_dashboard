import { Button, DatePicker, Divider, Form, FormProps, Input, InputNumber, Modal, Select, Upload } from "antd";
import { CloudDownload } from "lucide-react";
import Image from "next/image";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";

type TPropsType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean
};

type FieldType = {
    name: string,
    pet_type: string,
    description: string,
    image: File,
    location: string,
    web_link: string
}

const AddwebDetails = ({ open, setOpen, isEdit }: TPropsType) => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        toast.success("Website details submitted successfully")
    };

    return (

        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}>

            <div >

                <div className="flex justify-end items-center">
                    <div
                        className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine size={18} color="#fff" className="" />
                    </div>
                </div>

                <h4 className="text-center text-xl font-medium">{isEdit ? "Edit Services" : "Add Website Details"}</h4>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >

                    <Form.Item<FieldType> name="name" label={"Website Name"} rules={[{ required: true, message: "Website name is required" }]}>
                        <Input size="large" placeholder="Website Name" />
                    </Form.Item>
                    <Form.Item<FieldType> name="pet_type" label={"Pet Type"} rules={[{ required: true, message: "Pet type is required" }]}>
                        <Select
                            // defaultValue="lucy"
                            // style={{ width: 120 }}
                            // onChange={handleChange}
                            size="large"
                            placeholder="Select a Pet Type"
                            options={[
                                { value: 'Cat', label: 'Cat' },
                                { value: 'dog', label: 'Dog' },
                                { value: 'Both', label: 'Both' },
                            ]}
                            className="!w-full"
                        />
                    </Form.Item>

                    <Form.Item<FieldType> name="description" label={"Website Description"} rules={[{ required: true, message: "Website description is required" }]}>
                        <Input.TextArea rows={3} placeholder="Write some description" />
                    </Form.Item>

                    <Form.Item<FieldType> name="location" label={"Location"} rules={[{ required: true, message: "Location is required" }]}>
                        <Input size={"large"} placeholder="Enter Locaton" />
                    </Form.Item>

                    <Form.Item<FieldType> name="web_link" label={"Website Link"} rules={[{ required: true, message: "Website Link is required" }]}>
                        <Input size={"large"} placeholder="Enter Website Link" />
                    </Form.Item>

                    <Form.Item
                        name="icon"
                        label="Website Image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e?.fileList;
                        }}
                        rules={[{ required: true, message: "Website Image is required" }]}
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

                    <Form.Item>
                        <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

export default AddwebDetails;