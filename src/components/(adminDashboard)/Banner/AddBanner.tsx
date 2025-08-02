"use client"
import { useGetBannerQuery, useUpdateBannerMutation } from '@/redux/api/service.api';
import { Button, Form, FormProps, Input, Spin, Upload } from 'antd';
import { CloudDownload } from 'lucide-react';
import React, { useEffect } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';
import type { UploadFile } from 'antd';

type FieldType = {
    web_link: string,
    image: UploadFile[]
}

const AddBanner = () => {

    const { isLoading: currentLoading, data: currentBanner } = useGetBannerQuery();

    const [updateBanner, { isLoading }] = useUpdateBannerMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({ websiteLink: values?.web_link }))

            if (values?.image?.length > 0 && values?.image?.[0]?.originFileObj) {
                formData.append("image", values?.image?.[0]?.originFileObj as File)
            }

            await updateBanner(formData).unwrap()
            toast.success("Banner Submited successfully.")
            form.resetFields();
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    useEffect(() => {
        if (currentBanner) {
            form.setFieldsValue({
                web_link: currentBanner?.data?.websiteLink,
                image: [{
                    uid: `1`,
                    name: `image.png`,
                    status: 'done',
                    url: currentBanner?.data?.image,
                    thumbUrl: currentBanner?.data?.image
                }]
            })
        }
    }, [currentBanner])

    return (
        <Spin spinning={currentLoading} size="default">
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
                            listType="picture"
                        >
                            <p className="ant-upload-drag-icon mx-auto flex justify-center">
                                <CloudDownload size={40} />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">(335 X 174 pixel will be perfect)</p>
                        </Upload.Dragger>
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
        </Spin>
    );
};

export default AddBanner;