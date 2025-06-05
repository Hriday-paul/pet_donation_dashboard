import { Button, Form, FormProps, Input, Modal, Radio, Select, Upload } from 'antd';
import React from 'react';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from 'sonner';

const AddSurveyQues = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <Button onClick={() => setOpen(true)} type='primary' size='large' icon={<CirclePlus />} iconPosition='start'>Add new Questions</Button>

            <AddQuesForm setOpen={setOpen} open={open} />
        </div>
    );
};

export default AddSurveyQues;

type TPropsType = {
    open: boolean;
    setOpen: (collapsed: boolean) => void;
    isEdit?: boolean
};

type FieldType = {
    question: string,
    priority: boolean
}

export const AddQuesForm = ({ open, setOpen, isEdit }: TPropsType) => {

    const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
        console.log('Success:', values);
        toast.success("Survey Question added")
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

                <h4 className="text-center text-xl font-medium">{isEdit ? "Edit Survey Questions" : "Add Survey Questions"}</h4>

                <Form
                    name="basic"
                    style={{ width: '100%' }}
                    initialValues={{priority : true}}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                >

                    <Form.Item<FieldType> name="question" label={"Question"} rules={[{ required: true, message: "Question is required" }]}>
                        <Input.TextArea rows={4} size="large" placeholder="Write Question" />
                    </Form.Item>

                    <Form.Item<FieldType> name="priority" label={"Priority"} rules={[{ required: true, message: "Priority is required" }]}>
                        <Radio.Group
                            options={[
                                { value: true, label: 'Required' },
                                { value: false, label: 'Optional' },
                            ]}
                        />
                    </Form.Item>



                    <Form.Item>
                        <Button type="primary" size='large' htmlType="submit" block>Save</Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

