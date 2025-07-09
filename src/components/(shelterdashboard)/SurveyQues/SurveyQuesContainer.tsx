"use client"
import { Button, Popconfirm } from 'antd';
import React from 'react';
import { useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { CiEdit } from 'react-icons/ci';
import { toast } from 'sonner';
import AddSurveyQues, { AddQuesForm } from './AddSurveyQues';
import { useDeleteSurveyQuesMutation, useSurveyListQuery } from '@/redux/api/survey.api';
import { Loader } from 'lucide-react';
import ErrorComponent from '@/utils/ErrorComponent';
import Image from 'next/image';
import { ISurvey } from '@/redux/types';

type quesType = {
    id: number,
    name: string,
    required: boolean
}

const SurveyQuesContainer = () => {

    const { isLoading, isSuccess, data, isError } = useSurveyListQuery({});

    if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
        <Loader size={30} className='text-main-color animate-spin' />
    </div>

    if (isError) return <ErrorComponent />

    return (
        <div>

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Survey Questions</h1>
                <AddSurveyQues />
            </div>

            {/* -------------------------------all services-------------------- */}


            {isSuccess && <>
                <div className='bg-[#F9F9FA] p-5 lg:p-8 xl:p-10 border border-stroke rounded-xl space-y-3 shadow-sm mb-3'>
                    {
                        data?.data?.data?.map((item, indx) => {
                            return <QuesCard key={item?._id} item={item} indx={indx} />
                        })
                    }
                </div>

                {
                    data?.data?.data?.length <= 0 && <div className='min-h-40 min-w-40 flex flex-col justify-center items-center'>
                        <Image src={"/empty-data.png"} className='h-24 w-24 mx-auto' height={1000} width={1000} alt='empty image' />
                        <p>Empty data</p>
                    </div>
                }
            </>}

        </div>
    );
};

export default SurveyQuesContainer;

const QuesCard = ({ item, indx }: { item: ISurvey, indx: number }) => {

    const [handleDeleteApi] = useDeleteSurveyQuesMutation()

    const [open, setOpen] = useState(false)

    const handleDelete = async (id: string) => {
        try {
            await handleDeleteApi(id).unwrap();
            toast.success("Survey Question deleted successfully");
        } catch (err: any) {
            toast.error(err?.data?.message || "Question deleted failed, try again")
        }
    }

    return (
        <div className='px-6 py-4 bg-white rounded-md flex flex-row justify-between items-center'>
            <p className='text-lg text-text-color font-medium'>{indx + 1}. {item?.question} {item?.priority === "required" && "*"}</p>
            <div className='flex flex-row gap-x-3 items-center'>
                <Button onClick={() => setOpen(true)} type='primary' icon={<CiEdit />} iconPosition='start'>
                    Edit
                </Button>

                <Popconfirm
                    title="Delete Question"
                    description="Are you sure to delete this Question?"
                    onConfirm={()=>handleDelete(item?._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='default' icon={<AiTwotoneDelete className='text-red-500' />} iconPosition='start'>
                        Delete
                    </Button>
                </Popconfirm>
            </div>
            <AddQuesForm setOpen={setOpen} open={open} isEdit={true} defaultData={item} />
        </div>
    )
}