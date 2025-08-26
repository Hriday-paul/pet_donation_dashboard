"use client"
import { useGetBannerQuery, useUpdateBannerMutation } from '@/redux/api/service.api';
import { Button, Form, FormProps, Input, Modal, Spin, Upload } from 'antd';
import { CirclePlus, CloudDownload } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ImSpinner3 } from 'react-icons/im';
import { toast } from 'sonner';
import type { UploadFile } from 'antd';
import { RiCloseLargeLine } from 'react-icons/ri';

type FieldType = {
    websiteLink: string,
    image: UploadFile[]
}

const EditBanner = ({ defaultData, open, setOpen }: { defaultData: { image: string, websiteLink: string, _id: string }, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [updateBanner, { isLoading }] = useUpdateBannerMutation();
    const [form] = Form.useForm();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                "bannerInfo": [
                    {
                        "websiteLink": values?.websiteLink
                    }
                ],
                "banner": "banner"
            }))

            if (values?.image?.length > 0 && values?.image?.[0]?.originFileObj) {
                formData.append("image", values?.image?.[0]?.originFileObj as File)
            }

            await updateBanner({ id: defaultData?._id, body: formData }).unwrap()
            toast.success("Banner updated successfully.")
            form.resetFields();
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    };

    useEffect(() => {
        if (defaultData) {
            form?.setFieldsValue({
                websiteLink: defaultData?.websiteLink,
                image: [{
                    uid: `1`,
                    name: `image.png`,
                    status: 'done',
                    url: defaultData?.image,
                    thumbUrl: defaultData?.image
                }]
            })
        }
    }, [defaultData])

    return (
        <>

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

                    <h4 className="text-center text-xl font-medium">{"Update Banner"}</h4>


                    <Form
                        name="basic"
                        style={{ width: '100%' }}
                        // initialValues={{}}
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

                        <Form.Item<FieldType> name="websiteLink" label={"Website Link"} rules={[{ required: true, message: "Website Link is required" }]}>
                            <Input size="large" placeholder="Enter Website Link" />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType="submit" type="primary" size="large" block disabled={isLoading} icon={isLoading ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                                Save
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </Modal>
        </>
    );
};

export default EditBanner;