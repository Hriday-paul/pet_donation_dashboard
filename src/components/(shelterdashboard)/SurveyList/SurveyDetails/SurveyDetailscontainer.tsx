import React from 'react';
import surverUser from '@/assets/image/surveyUser.png'
import Image from 'next/image';
import { Button } from 'antd';

type quesType = {
    id: number,
    name: string,
    required: boolean,
    answer: string,
}

const questions: quesType[] = [
    {
        id: 1,
        name: "Personal phone number, email",
        required: true,
        answer: "(234) 555-1234, fox@gmail.com"
    },
    {
        id: 2,
        name: "Link to social networks, if you use them",
        required: false,
        answer: "www.facebook.com\robert"
    },
    {
        id: 3,
        name: "Your contact information (First name, Last name, year of birth, city)",
        required: true,
        answer: "Robert, Fox 1989, Vilnius"
    },
    {
        id: 4,
        name: "Why did you want to become a foster?",
        required: true,
        answer: "I love animals and want adore them."
    },
    {
        id: 5,
        name: "Are you looking for a pet for yourself? If not, who will it live with?",
        required: true,
        answer: "Yes, for myself."
    },
    {
        id: 6,
        name: "What character traits are important to you in a pet?",
        required: true,
        answer: "Friendly and calm."
    },
    {
        id: 7,
        name: "What is your living situation? (house / rented apartment / dormitory / other - specify)",
        required: true,
        answer: "Rented apartment."
    },
    {
        id: 8,
        name: "How many people live with you? (List the people living with you, and indicate their ages?)",
        required: true,
        answer: "3 people: Me (36), partner (38), child (5)."
    },
    {
        id: 9,
        name: "If you don't currently have one, but have had one, please tell us how old the pet was, what problems did you encounter? Did the previous pet die of illness or other reasons? (Name which ones)",
        required: true,
        answer: "3 people: Me (36), partner (38), child (5)."
    },
]

const SurveyDetailscontainer = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>

            <div className='col-span-1'>

                {/* -------------------user details-------------- */}
                <div className="bg-white rounded-2xl shadow p-8 w-full max-w-md relative">

                    {/* Profile Section */}
                    <div className="text-center mb-5">
                        <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden">
                            <Image placeholder='blur' src={surverUser} alt="Robert Fox" className="w-full h-full object-cover rounded-full" />
                        </div>
                        <h1 className="text-xl font-medium text-gray-900">Robert Fox</h1>
                    </div>

                    {/* Personal Details Section */}
                    <div className="border border-stroke rounded-xl p-5">
                        <h2 className="text-xl font-medium text-gray-900 mb-6">Personal Details</h2>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Name:</span>
                                <span className="text-gray-900 font-medium">Robert Fox</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Email:</span>
                                <span className="text-gray-900 font-medium">fox@gmail.com</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Phone Number:</span>
                                <span className="text-gray-900 font-medium">(234) 555-1234</span>
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
                                <span className="text-gray-900 font-medium">Mini</span>
                            </div>

                            <div className="flex justify-between items-center py-2 border-b border-gray-200">
                                <span className="text-gray-500">Gendel:</span>
                                <span className="text-gray-900 font-medium">Male</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Breed:</span>
                                <span className="text-gray-900 font-medium">Maine Coon</span>
                            </div>

                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Age:</span>
                                <span className="text-gray-900 font-medium">2 years 5 months</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-gray-500">Weight:</span>
                                <span className="text-gray-900 font-medium">3.0 Kg</span>
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
                        questions?.map(item => {
                            return <div key={item?.id} className='px-6 py-4 bg-white rounded-md'>
                                <p className='text-lg text-black font-medium mb-1'>{item?.id}. {item?.name} {item?.required && "*"}</p>

                                <p className='text-base text-text-color'>Answer : {item?.answer}</p>

                            </div>
                        })
                    }
                </div>

                <div className='flex flex-row gap-x-3 items-center mt-5'>
                    <Button type='primary' size='large' className='capitalize' block>Approve</Button>
                    <Button type='default' size='large' className='capitalize' block>Reject</Button>
                </div>

            </div>

        </div>
    );
};

export default SurveyDetailscontainer;