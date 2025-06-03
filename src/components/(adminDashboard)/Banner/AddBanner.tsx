"use client"
import { Button, Form, FormProps, Input, Upload } from 'antd';
import { CloudDownload } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

type FieldType = {
    title: string,
    description: number,
    web_link: string,
    image : File
}

const AddBanner = () => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        toast.success("Banner Submited successfully.")
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
                        <p className="ant-upload-hint">Support for a single or bulk upload.</p>
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
                    <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                </Form.Item>

            </Form>
        </div>
    );
};

export default AddBanner;