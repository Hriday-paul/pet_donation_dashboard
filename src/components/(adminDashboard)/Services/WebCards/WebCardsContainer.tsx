"use client"
import { Button } from 'antd';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import WebCards from './WebCards';
import Image from 'next/image';
import serviceImg from '@/assets/service/Service_image1.png'
import AddwebDetails from './AddwebDetails';

const WebCardsContainer = () => {

    const [open, setOpen] = useState(false);

    return (
        <div>

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Veterinary Services</h1>
                <Button onClick={() => setOpen(true)} type='primary' size='large' icon={<CirclePlus />} iconPosition='start'>Add Website Details</Button>
            </div>

            <div className='flex flex-row flex-wrap gap-5 items-start'>
                <div className='bg-white px-10 py-8 border border-stroke rounded-xl shadow-sm'>
                    <div className='h-28 w-28 p-8 rounded-full border border-main-color mx-auto flex justify-center items-center'>
                        <Image src={serviceImg} alt='service icon' className='h-full w-full object-cover mx-auto' />
                    </div>

                    <h3 className='text-2xl text-text-color font-medium my-3'>Veterinary</h3>
                </div>

                <WebCards />
            </div>

            <AddwebDetails open={open} setOpen={setOpen} />

        </div>
    );
};

export default WebCardsContainer;