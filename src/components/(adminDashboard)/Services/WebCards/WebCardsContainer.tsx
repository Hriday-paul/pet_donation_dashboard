"use client"
import { Button, Input } from 'antd';
import { CirclePlus, Search } from 'lucide-react';
import React from 'react';
import { useState } from 'react';
import WebCards from './WebCards';
import AddwebDetails from './AddwebDetails';
import ServiceDetails from './ServiceDetails';

const WebCardsContainer = ({ serviceId }: { serviceId: string }) => {

    const [searchText, setSearchText] = useState("");

    const [open, setOpen] = useState(false);

    return (
        <div>

            <div className='flex flex-col md:flex-row justify-between items-center my-5 gap-3'>
                <h1 className="text-2xl text-text-color font-medium">Website Details</h1>

                <Input
                    className="!w-[250px] lg:!w-[350px] !py-2 !bg-white  placeholder:text-white"
                    placeholder="Search..."
                    prefix={<Search size={20} color="#000" />}
                    onChange={(e) => setSearchText(e?.target?.value)}
                ></Input>

                <Button onClick={() => setOpen(true)} type='primary' size='large' icon={<CirclePlus />} iconPosition='start'>Add Website Details</Button>
            </div>

            <div className='flex flex-row flex-wrap gap-5 items-start'>
                <ServiceDetails serviceId={serviceId} />

                <WebCards serviceId={serviceId} searchText={searchText}/>
            </div>

            <AddwebDetails open={open} setOpen={setOpen} serviceId={serviceId} />

        </div>
    );
};

export default WebCardsContainer;