"use client"
import { Button } from 'antd';
import { CirclePlus } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import WebCards from './WebCards';
import AddwebDetails from './AddwebDetails';
import ServiceDetails from './ServiceDetails';

const WebCardsContainer = ({serviceId}:{serviceId : string}) => {

    const [open, setOpen] = useState(false);

    return (
        <div>

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Website Details</h1>
                <Button onClick={() => setOpen(true)} type='primary' size='large' icon={<CirclePlus />} iconPosition='start'>Add Website Details</Button>
            </div>

            <div className='flex flex-row flex-wrap gap-5 items-start'>
                <ServiceDetails serviceId={serviceId}/>

                <WebCards serviceId={serviceId}/>
            </div>

            <AddwebDetails open={open} setOpen={setOpen} serviceId={serviceId} />

        </div>
    );
};

export default WebCardsContainer;