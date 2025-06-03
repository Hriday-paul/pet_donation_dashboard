import Image from 'next/image';
import React, { useState } from 'react';
import serviceImg from '@/assets/service/Service_image1.png'
import { Button, Popconfirm } from 'antd';
import { toast } from 'sonner';
import AddService from './AddService';
import Link from 'next/link';

const ServiceCard = () => {

    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        toast.success("Service deleted successfully.")
    }

    return (
        <div className='bg-white px-10 py-8 border border-stroke rounded-xl shadow-sm'>
            <Link href={"/admin/services/1"}>
                <div className='h-28 w-28 p-8 rounded-full border border-main-color mx-auto flex justify-center items-center'>
                    <Image src={serviceImg} alt='service icon' className='h-full w-full object-cover mx-auto' />
                </div>

                <h3 className='text-2xl text-text-color font-medium my-3'>Veterinary</h3>
            </Link>

            <section className='flex flex-row gap-3 items-center'>
                <Popconfirm
                    title="Delete the Service"
                    description="Are you sure to delete this service?"
                    onConfirm={handleDelete}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type='default'>Delete</Button>
                </Popconfirm>

                <Button type='primary' onClick={() => setOpen(true)}>Edit</Button>

            </section>

            <AddService open={open} setOpen={setOpen} isEdit={true} />

        </div>
    );
};

export default ServiceCard;