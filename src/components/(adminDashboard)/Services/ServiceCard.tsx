import Image from 'next/image';
import React, { useState } from 'react';
import { Button, Popconfirm } from 'antd';
import { toast } from 'sonner';
import AddService from './AddService';
import Link from 'next/link';
import { TService } from '@/redux/types';
import { placeHolderBlurImg } from '@/utils/config';
import { useDeleteServiceMutation } from '@/redux/api/service.api';
import SetServicePosition from './SetServicePosition';

const ServiceCard = ({ service }: { service: TService }) => {
    const [addPositionOpen, setAddPositionOpen] = useState(false);
    const [handleDeleteApi, { }] = useDeleteServiceMutation();

    const [open, setOpen] = useState(false);
    

    const handleDelete = async (id: string) => {
        try {
            await handleDeleteApi(id).unwrap();
            toast.success("Service deleted successfully.")
        } catch (err: any) {
            toast.error(err?.data?.message || "something went wrong, try again")
        }
    }

    return (
        <div className='bg-white px-10 py-8 border border-stroke rounded-xl shadow-sm'>
            <Link href={`/admin/services/${service?._id}`}>
                <div className='h-28 w-28 p-8 rounded-full border border-main-color mx-auto flex justify-center items-center'>
                    <Image src={service?.icon} placeholder='blur' blurDataURL={placeHolderBlurImg} height={1000} width={1000} alt='service icon' className='h-full w-full object-cover mx-auto' />
                </div>

                <h3 className='text-2xl text-text-color font-medium my-3'>{service?.name}</h3>
            </Link>

            <section className='flex flex-row gap-3 items-center'>
                <Popconfirm
                    title="Delete the Service"
                    description="Are you sure to delete this service?"
                    onConfirm={()=>handleDelete(service?._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='default'>Delete</Button>
                </Popconfirm>

                <Button type='primary' onClick={() => setOpen(true)}>Edit</Button>
                <Button type='primary' onClick={() => setAddPositionOpen(true)}>Position</Button>

            </section>

            <AddService open={open} setOpen={setOpen} isEdit={true} defaultdata={service} />
            <SetServicePosition open={addPositionOpen} setOpen={setAddPositionOpen} defaultdata={service}/>

        </div>
    );
};

export default ServiceCard;