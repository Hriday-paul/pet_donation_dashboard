"use client"
import Image from 'next/image'
import React from 'react'
import serviceImg from '@/assets/service/Service_image1.png'
import { useServiceDetailsQuery } from '@/redux/api/service.api'
import { Loader } from 'lucide-react'

export default function ServiceDetails({ serviceId }: { serviceId: string }) {

    const { isLoading, data, isSuccess } = useServiceDetailsQuery({ id: serviceId });

    return (
        <>
            {
                isLoading ? <div className='min-h-40 flex items-center justify-center min-w-20'>
                    <Loader size={30} className='text-main-color animate-spin' />
                </div>
                    :
                    (isSuccess && data) ?
                        <div className='bg-white px-10 py-8 border border-stroke rounded-xl shadow-sm'>
                            <div className='h-28 w-28 p-8 rounded-full border border-main-color mx-auto flex justify-center items-center'>
                                <Image src={data?.data?.icon} alt='service icon' height={1000} width={1000} className='h-full w-full object-cover mx-auto' />
                            </div>

                            <h3 className='text-2xl text-text-color font-medium my-3'>{data?.data?.name}</h3>
                        </div>
                        : <></>
            }
        </>
    )
}
