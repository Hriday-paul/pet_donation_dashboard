"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from 'antd';
import { useSurveyAnswerDetailsQuery, useSurveyQuesStausUpdateMutation } from '@/redux/api/survey.api';
import { Loader } from 'lucide-react';
import ErrorComponent from '@/utils/ErrorComponent';
import { placeHolderBlurImg } from '@/utils/config';
import { toast } from 'sonner';


const SurveyDetailscontainer = ({ id }: { id: string }) => {

    const { isLoading, isError, data, isSuccess } = useSurveyAnswerDetailsQuery({ id });

    const buttons: { status: "rejected" | "accepted", title: string }[] = [
        { title: 'Approve', status: "accepted" },
        { title: 'Reject', status: "rejected" }
    ]

    if (isLoading) return <div className='min-h-40 flex items-center justify-center'>
        <Loader size={30} className='text-main-color animate-spin' />
    </div>

    if (isError) return <ErrorComponent />

    if (isSuccess) return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

            <div className='col-span-1'>

                {/* -------------------user details-------------- */}
                <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md relative">

                    {/* Profile Section */}
                    <div className="text-center mb-5">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                            <Image placeholder='blur' src={data?.data?.adopter?.profile_image || "/empty-user.png"} alt="Robert Fox" className="w-full h-full object-cover rounded-full" height={1000} width={1000} blurDataURL={placeHolderBlurImg} />
                        </div>
                        <h1 className="text-xl font-medium text-gray-900">{data?.data?.adopter?.first_name + data?.data?.adopter?.last_name}</h1>
                    </div>

                    {/* Personal Details Section */}
                    <div className="border border-stroke rounded-xl p-5">
                        <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Details</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Name:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopter?.first_name + data?.data?.adopter?.last_name}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Email:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopter?.email}</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Phone Number:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopter?.contact_number}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ------------------pet detals---------------- */}
                <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md relative mt-5">

                    {/* Details Section */}
                    <div className="border border-stroke rounded-xl p-5">
                        <h2 className="text-xl font-medium text-gray-900 mb-6">Pet Details</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Name:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopted_pet?.full_name}</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Gendel:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopted_pet?.gender}</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Breed:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopted_pet?.breed}</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Age:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopted_pet?.age}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Weight:</span>
                                <span className="text-gray-900 font-medium">{data?.data?.adopted_pet?.weight}</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='col-span-2'>

                <h1 className="text-2xl text-text-color font-medium text-center mb-4">Question Answers</h1>


                {/* -------------------------------all services-------------------- */}
                <div className='space-y-4'>
                    {
                        data?.data?.answers?.map((item, indx) => {
                            return <div key={item?._id} className='px-6 py-4 bg-white rounded-md'>
                                <p className='text-lg text-black font-medium mb-1'>{indx + 1}. {item?.question} {"*"}</p>

                                <p className='text-base text-text-color'>Answer : {item?.answer}</p>

                            </div>
                        })
                    }
                </div>

                {data?.data?.status == "pending" ? <div className='flex flex-row gap-x-3 items-center mt-5'>

                    {/* <Button disabled={updateLoading} type='primary' onClick={() => handleUpdateStatus("accepted")} size='large' className='capitalize' block>{updateLoading ? <Loader size={25} className='text-main-color animate-spin' /> : "Approve"}</Button>

                    <Button disabled={updateLoading} type='primary' onClick={() => handleUpdateStatus("rejected")} size='large' className='capitalize' block>{updateLoading ? <Loader size={25} className='text-main-color animate-spin' /> : "Reject"}</Button> */}

                    {
                        buttons?.map(i => {
                            return <HandleStaus id={id} status={i?.status} title={i?.title} />
                        })

                    }

                </div> : <p className='text-xl mt-3 text-center'>{data?.data?.status == "accepted" ? <span className='text-green-500'>Accepter</span> : <span className='text-red-500'>Rejected</span>}</p>}

            </div>

        </div>
    );
};

export default SurveyDetailscontainer;

const HandleStaus = ({ title, status, id }: { title: string, status: "rejected" | "accepted", id: string }) => {

    const [UpdateStatusApi, { isLoading: updateLoading }] = useSurveyQuesStausUpdateMutation();

    const handleUpdateStatus = async (status: "accepted" | "rejected") => {
        try {
            await UpdateStatusApi({ id, status }).unwrap();
            toast.success("Survey question " + status + " successfully")
        } catch (err: any) {
            toast.error(err?.data?.message || "Something went wrong, try again")
        }
    }
    return (
        <Button disabled={updateLoading} type='primary' onClick={() => handleUpdateStatus(status)} size='large' className='capitalize' block>{updateLoading ? <Loader size={25} className='text-main-color animate-spin' /> : title}</Button>
    )
}