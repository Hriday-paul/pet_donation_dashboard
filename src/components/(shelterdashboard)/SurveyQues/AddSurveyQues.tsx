import { Button, Form, FormProps, Input, Modal, Radio, Select, Upload } from 'antd';
import React from 'react';
import { useState } from 'react';
import { CirclePlus } from 'lucide-react';
import { RiCloseLargeLine } from "react-icons/ri";
import { toast } from 'sonner';
import { ISurvey } from '@/redux/types';
import { useAddSurveyQuesMutation, useUpdateSurveyQuesMutation } from '@/redux/api/survey.api';
import { ImSpinner3 } from 'react-icons/im';

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
    isEdit?: boolean,
    defaultData?: ISurvey
};

type FieldType = {
    question: string,
    priority: boolean
}

export const AddQuesForm = ({ open, setOpen, isEdit, defaultData }: TPropsType) => {

    const [handleAddapi, { isLoading }] = useAddSurveyQuesMutation()
    const [handleUpdateapi, { isLoading: updateLoading }] = useUpdateSurveyQuesMutation()

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {

        try {
            if (isEdit && defaultData) {
                await handleUpdateapi({ formData: { priority: values?.priority, question: values?.question }, id: defaultData?._id }).unwrap();
                toast.success("Survey Question updated successfully")
            } else {
                await handleAddapi({ priority: values?.priority, question: values?.question }).unwrap();
                toast.success("Survey Question added successfully")
            }
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
                    initialValues={defaultData ? { priority: defaultData?.priority, question: defaultData?.question } : { priority: "required" }}
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
                                { value: "required", label: 'Required' },
                                { value: "optional", label: 'Optional' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" type="primary" size="large" block disabled={isLoading ||updateLoading} icon={(isLoading || updateLoading) ? <ImSpinner3 className="animate-spin size-5 text-main-color" /> : <></>} iconPosition="end">
                            Save
                        </Button>
                    </Form.Item>

                </Form>

            </div>
        </Modal>
    );
};

