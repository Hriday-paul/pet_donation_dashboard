"use client"
import React from 'react';
import WebCard from './WebCard';
import { useAllSubServicesQuery } from '@/redux/api/service.api';
import { Loader } from 'lucide-react';
import Image from 'next/image';

const WebCards = ({ serviceId, searchText }: { serviceId: string, searchText: string }) => {

    const { isLoading, data, isSuccess } = useAllSubServicesQuery({ id: serviceId, searchTerm: searchText });

    return (
        <div>
            {
                isLoading ? <div className='min-h-40 flex items-center justify-center min-w-40'>
                    <Loader size={30} className='text-main-color animate-spin' />
                </div>
                    :
                    isSuccess ? (data?.data?.length > 0 ? <div className='bg-[#F9F9FA] p-5 border border-stroke rounded-2xl space-y-5'>

                        {
                            data?.data?.map(item => {
                                return <WebCard key={item?._id} carddata={item} serviceId={serviceId} />
                            })
                        }

                    </div> : <div className='min-h-40 min-w-40 flex flex-col justify-center items-center'>
                        <Image src={"/empty-data.png"} className='h-24 w-24 mx-auto' height={1000} width={1000} alt='empty image' />
                        <p>Empty data</p>
                    </div>) : <></>
            }

        </div>
    );
};

export default WebCards;