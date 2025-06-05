"use client"
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'sonner';
import AddSurveyQues, { AddQuesForm } from './AddSurveyQues';

type quesType = {
    id: number,
    name: string,
    required: boolean
}

const questions: quesType[] = [
    {
        id: 1,
        name: "Personal phone number, email",
        required: true
    },
    {
        id: 2,
        name: "Link to social networks, if you use them",
        required: false
    },
    {
        id: 3,
        name: "Your contact information (First name, Last name, year of birth, city)",
        required: true
    },
    {
        id: 4,
        name: "Why did you want to become a foster?",
        required: true
    },
    {
        id: 5,
        name: "Are you looking for a pet for yourself? If not, who will it live with?",
        required: true
    },
    {
        id: 6,
        name: "What character traits are important to you in a pet?",
        required: true
    },
]

const SurveyQuesContainer = () => {

    return (
        <div>

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Survey Questions</h1>
                <AddSurveyQues />
            </div>

            {/* -------------------------------all services-------------------- */}
            <div className='bg-[#F9F9FA] p-5 lg:p-8 xl:p-10 border border-stroke rounded-xl space-y-3 shadow-sm mb-3'>
                {
                    questions?.map(item => {
                        return <QuesCard key={item?.id} item={item} />
                    })
                }
            </div>

        </div>
    );
};

export default SurveyQuesContainer;

const QuesCard = ({ item }: { item: quesType }) => {
    const [open, setOpen] = useState(false)
    const handleDelete = () => {
        toast.success("Question deleted successfully.")
    }

    return (
        <div className='px-6 py-4 bg-white rounded-md flex flex-row justify-between items-center'>
            <p className='text-lg text-text-color font-medium'>{item?.id}. {item?.name} {item?.required && "*"}</p>
            <div className='flex flex-row gap-x-3 items-center'>
                <Button onClick={() => setOpen(true)} type='primary' icon={<CiEdit />} iconPosition='start'>
                    Edit
                </Button>

                <Popconfirm
                    title="Delete Question"
                    description="Are you sure to delete this Question?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='default' icon={<AiTwotoneDelete className='text-red-500' />} iconPosition='start'>
                        Delete
                    </Button>
                </Popconfirm>
            </div>
            <AddQuesForm setOpen={setOpen} open={open} isEdit={true} />
        </div>
    )
}