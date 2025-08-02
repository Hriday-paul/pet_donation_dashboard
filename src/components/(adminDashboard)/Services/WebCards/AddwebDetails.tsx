import { useAddSubServiceMutation, useEditSubServiceMutation } from "@/redux/api/service.api";
import { Button, Form, FormProps, Input, Modal, Select, Upload } from "antd";
import { CloudDownload } from "lucide-react";
import type { UploadFile } from 'antd';
import { ImSpinner3 } from "react-icons/im";
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from "sonner";
import { TSubService } from "@/redux/types";

type TPropsType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isEdit?: boolean,
    serviceId: string,
    defaultdata?: TSubService
};

type FieldType = {
    name: string,
    pet_type: string,
    description: string,
    image: UploadFile[],
    location: string,
    web_link: string,

}

const AddwebDetails = ({ open, setOpen, isEdit, serviceId, defaultdata }: TPropsType) => {

    const [handleSubServicePostApi, { isLoading }] = useAddSubServiceMutation();
    const [handleSubServiceEditApi, { isLoading: editloading }] = useEditSubServiceMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {

            if (isEdit && defaultdata) {

                const formdata = new FormData();

                if (values?.image?.length > 0 && values?.image?.[0]?.originFileObj) {
                    formdata.append("web_img", values?.image?.[0]?.originFileObj as File);
                }

                formdata.append("data", JSON.stringify({
                    "web_name": values?.name,
                    "web_link": values?.web_link,
                    "pet_type": values?.pet_type,
                    "description": values?.description,
                    "location": values?.location,
                    "service": serviceId
                }))

                await handleSubServiceEditApi({ formData: formdata, service: serviceId, subServiceId: defaultdata?._id }).unwrap();

            } else {

                const formdata = new FormData();

                formdata.append("data", JSON.stringify({
                    "web_name": values?.name,
                    "web_link": values?.web_link,
                    "pet_type": values?.pet_type,
                    "description": values?.description,
                    "location": values?.location,
                    "service": serviceId
                }))

                formdata.append("web_img", values?.image?.[0]?.originFileObj as File);
                await handleSubServicePostApi({ formData: formdata, service: serviceId }).unwrap();

                form.resetFields();
            }

            toast.success(isEdit ? "Website details updated successfully" : "Website details submitted successfully")

        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    return (

        <Modal
            open={open}
            footer={null}
            centered={true}
            onCancel={() => setOpen(false)}
            closeIcon={false}>

            <div>

                <div className="flex justify-end items-center">
                    <div
                        className="w-10 h-10 bg-main-color  rounded-full flex justify-center items-center cursor-pointer"
                        onClick={() => setOpen(false)}
                    >
                        <RiCloseLargeLine size={18} color="#fff" className="" />
                    </div>
                </div>

                <h4 className="text-center text-xl font-medium">{isEdit ? "Edit Website Details" : "Add Website Details"}</h4>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={(isEdit && defaultdata) ? {
                        ...defaultdata,
                        name: defaultdata?.web_name,
                        image: [{
                            uid: `1`,
                            name: `image.png`,
                            status: 'done',
                            url: defaultdata?.web_img,
                            thumbUrl: defaultdata?.web_img
                        }]
                    } : {}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
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
                                { value: 'cat', label: 'Cat' },
                                { value: 'dog', label: 'Dog' },
                                { value: 'both', label: 'Both' },
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
                        name="image"
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
                            listType="picture"
                        >
                            <p className="ant-upload-drag-icon mx-auto flex justify-center">
                                <CloudDownload size={40} />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">(162 X 162 will be perfect)</p>
                        </Upload.Dragger>
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" block disabled={isLoading || editloading} icon={(isLoading || editloading) ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                            Save
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

export default AddwebDetails;