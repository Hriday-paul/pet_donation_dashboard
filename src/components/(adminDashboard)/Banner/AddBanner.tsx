"use client"
import { useUpdateBannerMutation } from '@/redux/api/service.api';
import { Button, Form, FormProps, Input, Upload } from 'antd';
import { CloudDownload } from 'lucide-react';
import React from 'react';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';
import type { UploadFile } from 'antd';

type FieldType = {
    title: string,
    description: number,
    web_link: string,
    image: UploadFile[]
}

const AddBanner = () => {

    const [updateBanner, { isLoading }] = useUpdateBannerMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({ title: values?.title, description: values?.description, websiteLink: values?.web_link }))
            formData.append("image", values?.image?.[0]?.originFileObj as File)
            await updateBanner(formData).unwrap()
            toast.success("Banner Submited successfully.")
            form.resetFields();
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    return (
        <div className='max-w-5xl mx-auto'>
            <Form
                name="basic"
                style={{ width: '100%' }}
                initialValues={{}}
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                form={form}
            >

                <Form.Item
                    name="image"
                    label="Banner Image"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => {
                        if (Array.isArray(e)) {
                            return e;
                        }
                        return e?.fileList;
                    }}
                    rules={[{ required: true, message: "Banner image is required" }]}
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
                        <p className="ant-upload-hint">(800w X 500h pixel will be perfect)</p>
                    </Upload.Dragger>
                </Form.Item>


                <Form.Item<FieldType> name="title" label={"Banner Title"} rules={[{ required: true, message: "Banner Title is required" }]}>
                    <Input size="large" placeholder="Enter Banner Title" />
                </Form.Item>

                <Form.Item<FieldType> name="description" label={"Banner Description"} rules={[{ required: true, message: "Banner Description is required" }]}>
                    <Input.TextArea rows={5} size="large" placeholder='Write Banner Description here...' />
                </Form.Item>

                <Form.Item<FieldType> name="web_link" label={"Website Link"} rules={[{ required: true, message: "Website Link is required" }]}>
                    <Input size="large" placeholder="Enter Website Link" />
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit" type="primary" size="large" block disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                        Save
                    </Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default AddBanner;