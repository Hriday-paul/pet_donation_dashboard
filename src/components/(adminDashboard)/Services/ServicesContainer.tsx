"use client"
import { Button, Pagination } from 'antd';
import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { CirclePlus, Loader } from 'lucide-react';
import AddService from './AddService';
import { useAllServicesQuery } from '@/redux/api/service.api';

const ServicesContainer = () => {
    const { isLoading, data, isSuccess } = useAllServicesQuery({});

    const [open, setOpen] = useState(false);

    return (
        <div>
            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Services</h1>
                <Button onClick={() => setOpen(true)} type='primary' size='large' icon={<CirclePlus />} iconPosition='start'>Add new Service</Button>
            </div>

            {/* -------------------------------all services-------------------- */}
            {isLoading ? <div className='min-h-40 flex items-center justify-center'>
                <Loader size={30} className='text-main-color animate-spin' />
            </div> : <div>
                <div className='bg-[#F9F9FA] p-5 lg:p-8 xl:p-10 border border-stroke rounded-xl flex flex-row flex-wrap gap-5 items-center shadow-sm mb-3'>
                    {data?.data?.map(item=>{
                        return <ServiceCard key={item?._id} service={item} />
                    })}
                </div>

                {/* <Pagination current={1} total={50} /> */}
                {/* <Pagination defaultCurrent={1} total={50} pageSize={10} hideOnSinglePage align="end" showSizeChanger={false} /> */}
            </div>}

            <AddService open={open} setOpen={setOpen} />

        </div>
    );
};

export default ServicesContainer;